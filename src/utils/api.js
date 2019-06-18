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
function StaffGetUserInfo(cb) {
  GetData('Staff/GetUserInfo', '', function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取客户列表
function StaffGetCustomerList(data, cb) {
  GetData('Staff/GetCustomerList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取商品列表
function StaffGetProductList(data, cb) {
  GetData('Staff/GetProductList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//创建订单
function StaffCreateOrder(cb) {
  PostData('Staff/CreateOrder', '', function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取销售记录
function StaffGetOrderList(data, cb) {
  GetData('Staff/GetOrderList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取销售详情
function StaffGetOrderInfo(data, cb) {
  GetData('Staff/GetOrderInfo', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//修改订单状态
function StaffSetOrderStatus(data, cb) {
  PostData('Staff/SetOrderStatus', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//修改密码
function StaffChangePwd(data,cb){
  PostData('Staff/ChangePwd', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

// 货主——————————————————————————————————————————————————

//获取货主个人信息接口
function OwnerGetUserInfo(cb) {
  GetData('Owner/GetUserInfo', '', function (res) {
    if (cb) {
      cb(res)
    }
  });
}


//我的销售
function OwnerGetSaleList(data, cb) {
  GetData('Owner/GetSaleList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//我的销售详情
function OwnerGetSaleInfo(data, cb){
  GetData('Owner/GetSaleInfo', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//我的支出
function OwnerGetExpenseList(data, cb) {
  GetData('Owner/GetExpenseList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//货主结算记录
function OwnerGetSettlementList(data,cb){
  GetData('Owner/GetSettlementList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//修改货主密码
function OwnerChangePwd(data,cb){
  PostData('Owner/ChangePwd', data, function (res) {
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
  StaffGetCustomerList: StaffGetCustomerList,
  StaffGetProductList: StaffGetProductList,
  StaffCreateOrder: StaffCreateOrder,
  StaffGetOrderList: StaffGetOrderList,
  StaffGetOrderInfo: StaffGetOrderInfo,
  StaffSetOrderStatus: StaffSetOrderStatus,
  StaffChangePwd: StaffChangePwd,
  OwnerGetUserInfo: OwnerGetUserInfo,
  OwnerGetSaleList: OwnerGetSaleList,
  OwnerGetSaleInfo: OwnerGetSaleInfo,
  OwnerGetExpenseList: OwnerGetExpenseList,
  OwnerGetSettlementList: OwnerGetSettlementList,
  OwnerChangePwd: OwnerChangePwd
};
