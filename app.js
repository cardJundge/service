//app.js
App({
  data: {

  },
  onLaunch: function() {
    var that = this

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    

    // 登录
    wx.login({
      success: res => {
        that.globalData.js_code = res.code
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getAuthKey: function(that) {
    return new Promise(function(resolve, reject) {
      wx.login({
        success: function(res) {
          console.log(res)
          if (res.code) {
            wx.request({
              url: getApp().globalData.hostName1 + 'service/login/index',
              method: 'POST',
              data: {
                js_code: res.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function(res) {
                console.log(res)
                var dataType = typeof res.data
                console.log(dataType)
                if (dataType == 'string') {
                  var jsonStr = res.data;
                  jsonStr = jsonStr.replace(" ", "");
                  var temp
                  if (typeof jsonStr != 'object') {
                    jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
                    temp = JSON.parse(jsonStr);
                    res.data = temp;
                  }
                }
                if(res.data.status==1){
                  that.data.loginRes = res
                  resolve(that)
                }else{
                } 
                
              },
              complete: function() {}
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg);
            var res = {
              status: 300,
              data: '错误'
            }
            reject('error');
          }
        }
      })
    });
  },
  globalData: {
    userInfo: null,
    hostName: "https://www.chedou123.cn/",
    hostName1: "https://www.chedou123.cn/",
    // hostName:"https://dev.feecgo.com/",
    // hostName1: "https://dev.feecgo.com/",
    // hostName: 'http://192.168.1.108:8080/',
    // hostName1: 'http://192.168.1.108:8080/',
  }
})