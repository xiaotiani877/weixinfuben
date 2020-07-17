const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

const baseURL = 'http://ttapi.research.itcast.cn/app';

const headers = {
  'Content-Type': 'application/json',
};

const token = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + 　wx.getStorageSync('token')
};

function request(method, url, data, header) {
  // console.log(header)
  return new Promise(function(resolve, reject) {
    wx.request({
      url: baseURL + url,
      method: method,
      data: method === POST ? JSON.stringify(data) : data,
      header: header,
      success(res) {
        //请求成功
        resolve(res);
      },
      fail(err) {
        //请求失败
        reject(err)
      }
    })
  })
}

const API = {
  getArticles: (channelId, timestamp) => request(GET, `/v1_1/articles?channel_id=${channelId}&timestamp=${timestamp}&with_top=1`, {}, token),

  getVer: (mobile) => request(GET, `/v1_0/sms/codes/${mobile}`),

  enter: (mobile, code) => {
    var promise = new Promise((resolve, reject) => {
      wx.request({
        url: baseURL + '/v1_0/authorizations',
        method: POST,
        data: JSON.stringify({
          mobile,
          code
        }),
        success(res) {
          //请求成功
          // console.log(res)
          wx.setStorageSync('token', res.data.data.token)
          resolve(res)
        },
        fail(err) {
          //请求失败
          console.log(err)
        }
      })
    })
    return promise
  },
  // 详情
  details: (art_id) => request('GET', `/v1_0/articles/${art_id}`),

  // 获取评论
  getComment: (type, source, limit) => request('GET', `/v1_0/comments/type=${type}&source=${source}&limit=${limit}`),

  // 添加评论
  addComment: (target, content) => request('POST', `/v1_0/comments/target=${target}&content=${content}`,token)
};
module.exports = {
  API: API
}