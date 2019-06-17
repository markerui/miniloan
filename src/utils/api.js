import wepy from 'wepy';

const HOST_URI = 'http://t1.qsfruit.com';
const API_URL = HOST_URI + '/api/';
var tokenId = '';

function Request(options) {
  try {
    tokenId = wx.getStorageSync("tokenId");
  } catch (e) {}
  wepy.request({
    url: API_URL + options.url,
    data: options.data,
    method: options.method ? options.method : 'POST',
    header: {
      'tokenId': tokenId,
    },
    success: res => {
      var data = res.data;
      options.success(data);
      return data;
    },
    fail: res => {
      if (options.fail) {
        options.fail(res)
      }
    },
    complete: options.complete ? options.complete : null
  });
}

function Post(options) {
  Request(options);
}

function Get(options) {
  options.method = 'GET';
  Request(options);
}

function PostData(url, options, fn) {
  Post({
    url: url,
    data: options,
    success: res => {
      fn(res);
    },
    fail: res => {
      return 0;
    },
  });
}

function GetData(url, options, fn) {
  Get({
    url: url,
    data: options,
    success: res => {
      fn(res);
    },
    fail: res => {
      return 0;
    },
  });
}


//登录
function Login(data, cb) {
  PostData('auth/Login', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//微信code登录
function wxLogin(cb) {
  wx.login({
    success(res) {
      if (res.code) {
        var Data = {
          code: res.code
        };
        Login(Data, function (res) {
          wx.setStorageSync('tokenId', res.resultData.tokenId);
          if (cb) {
            cb(res)
          }
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '登录失败,请重试!',
          showCancel: false
        });
      }
    }
  });
}

//登录授权
function getUserInfo(data, cb) {
  PostData('auth/GetUserInfo', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取员工个人信息接口
function StaffGetUserInfo(data, cb) {
  GetData('Staff/GetUserInfo', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}
//获取货主个人信息接口
function OwnerGetUserInfo(data, cb) {
  GetData('Owner/GetUserInfo', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}


module.exports = {
  HOST_URI: HOST_URI,
  API_URL: API_URL,
  Login: Login,
  getUserInfo: getUserInfo,
  StaffGetUserInfo: StaffGetUserInfo,
  OwnerGetUserInfo: OwnerGetUserInfo
};
