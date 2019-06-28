// pages/mine/mine.js
var test = getApp().globalData.hostName;
// var test1 = getApp().globalData.hostName1;
var common = require('../../pages/common.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '我的',
    imgUrls: [],
    userInfo: app.globalData.userInfo

  },
  toDataOrder:function(){
    wx.navigateTo({
      url: './allDataOrder/allDataOrder',
    })
  },
  toServerItem:function(){
    wx.navigateTo({
      url: './serverItemList/serverItemList',
    })
  },
  submitFormId: function (e) {
    console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  toOrder: function() {
    wx.navigateTo({
      url: './allOder/allOder',
    })
  },
  updateAvatar: function() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // console.log(res.tempFilePaths[0])
        wx.showLoading({
          title: '上传中...',
        })
        wx.uploadFile({
          url: test + 'service/index/up_head',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.data.sessionId
          },
          filePath: res.tempFilePaths[0],
          name: 'face',
          formData: {
            face: ''
          },
          success: res => {

            var jsonStr = res.data;
            jsonStr = jsonStr.replace(" ", "");
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
              var jj = JSON.parse(jsonStr);
              res.data = jj
            }
            if (res.data.status == 1) {
              wx.showToast({
                title: '修改成功',
              })
              that.onReady()

            }
          }
        })
      }
    })
  },
  toAccount: function() {
    var that = this
    var openId = that.data.userInfo.openId_chedou
    if (openId !== '' && openId !== null && openId !== false) {
      wx.navigateTo({
        url: './updateData/Account/Account',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '微信绑定后才能执行此操作，是否进行微信绑定？',
        success(res) {
          if (res.confirm) {
            that.bindWX()

          } else if (res.cancel) {
          }
        }
      })
    }
    
  },
  toBrand: function() {
    wx.navigateTo({
      url: './updateData/brand/brand',
    })
  },

  toModifyPwd: function() {
    wx.navigateTo({
      url: '/pages/editPsw/editPsw',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
        nav_cell: "nav_cellX",
      })
    }
    // this.data.sessionId = wx.getStorageSync('PHPSESSID');
    // this.data.userId = wx.getStorageSync('userid')
    this.setData({
      hostName: test,
      // hostName1: test1,
      serviceType: wx.getStorageSync('type'),
      sessionId: wx.getStorageSync('PHPSESSID'),
      userId: wx.getStorageSync('userid')
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      that.setData({
        hasUserInfo: false
      })
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          hasUserInfo: true,
          myBean: 0,
          userInfo: res.userInfo,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理  
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    getUser(this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var temp = wx.getStorageSync('imgChange')
    if (temp) {
      getUser(this)
      wx.removeStorageSync('imgChange')
    }

  },

  updateAvatar1: function() {
    this.setData({
      binging: true
    })
  },
  unbindWX:function(){
    var that = this
    wx.showLoading({
      title: '解绑中...',
    })
    wx.login({
      success: res1 => {
        wx.request({
          url: test + 'service/index/unbind',
          method: 'GET',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.data.sessionId
          },
          data: {
            type: 'chedou'
          },
          success: function (res) {
            var dataType = typeof res.data
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
            if (res.data.status == 1) {
              wx.showToast({
                title: '解绑成功',
              })
              // var temp ='userInfor.openid'
              // console.log(that.data.userInfor)
              // that.setData({
              //   [temp]:false
              // })
              getUser(that)
            } else {
              wx.showModal({
                title: '请求超时',
                content: '',
              })
            }
            wx.hideLoading()
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  bindWX: function(e) {
    var that = this
    wx.showLoading({
      title: '绑定中...',
    })
    wx.login({
      success: res1 => {
        wx.request({
          url: test + 'service/index/bind',
          method: 'POST',
          data: {
            js_code: res1.code,
            type: 'chedou'
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.data.sessionId
          },
          success: function (res) {
            var dataType = typeof res.data
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
            if (res.data.status == 1) {
              wx.showToast({
                title: '绑定成功',
                success: res => {
                  setTimeout(function () {
                    wx.navigateTo({
                      url: './updateData/Account/Account'
                    })
                    that.onLoad()
                  }, 500)
                }
              })
              getUser(that)
              // var temp = 'userInfor./openid'
              // console.log(that.data.userInfo)
              // that.setData({
              //   [temp]: true
              // })
            } else if(res.data.status==-2){
              wx.showToast({
                title: '该微信已被绑定到其他帐号',
                icon: 'none'
              })
            }else {
              wx.showToast({
                title: '请求超时',
                icon: 'none'
              })
            }
            wx.hideLoading()
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
 
  toAdminPeople: function() {
    wx.navigateTo({
      url: './adminPeople/adminPeople',
    })
  },
  toService: function() {
    wx.navigateTo({
      url: './updateData/service/service',
    })
  },
  updateIfor: function() {
    wx.navigateTo({
      url: './updateData/updateData',
    })
  },
  toData: function() {
    wx.navigateTo({
      url: './allData/allData',
    })
  },
  logoutModal: function() {
    this.setData({
      logOut: true
    })

  },
  cancelModal: function() {
    this.setData({
      logOut: false,
      binging: false
    })
  },
  logOut: function(e) {
    var sessionId = wx.getStorageSync('PHPSESSID')
    var aa = wx.getStorageSync('userid')
    var that = this;
    var test = getApp().globalData.hostName;
    console.log(test + 'service/index/loginOut')
    wx.request({
      url: test + 'service/index/loginOut',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + sessionId
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
        console.log(res)
        if (res.data.status == true) {
          try {
            wx.removeStorageSync('userid')
          } catch (e) {
            // Do something when catch error
          }
          wx.redirectTo({
            url: '../login/login',
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function getUser(that) {
  wx.request({
    url: test + 'service/index/info',
    method: 'GET',
    data: {
      id: that.data.userId
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'PHPSESSID=' + that.data.sessionId
    },
    success: function(res) {
      var dataType = typeof res.data
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
      if (res.data.status == 1) {
        if (res.data.service.stores != '') {
          that.data.OriginLogo = res.data.service.stores
          that.setData({
            imgUrls: res.data.service.stores.split(','),
          })
        } 
        that.setData({
          userInfo: res.data.service
        })
        getApp().globalData.userInfo = res.data.service
      } else {
       wx.showToast({
         title: '请求超时，请重试...',
         icon: 'none'
       })
      }
      wx.hideLoading()


    }
  })

}