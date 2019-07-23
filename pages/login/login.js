// pages/login/login.js
var app = getApp()
var test = getApp().globalData.hostName;
var test1 = getApp().globalData.hostName1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop:'登录',
    userName: '',
    eyes: true,
    text: 'password',
    userPwd: "",
    modal: true,
    dataa: ''
  },
  formSubmit: function(e) {
    var that = this

    // console.log(e)
    if (e.detail.value.name == '') {
      this.setData({
        userNull: true
      })
      return
    }
    if (e.detail.value.pass == '') {
      this.setData({
        pswNull: true
      })
      return
    }
    this.setData({
      logining: true
    })
    wx.request({
      url: test + 'service/login/index',
      method: 'POST',
      data: {
        account: e.detail.value.name,
        password: e.detail.value.pass
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
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
        console.log('系统登录返回信息',res.data)
        if (res.data.status == 1) {
          app.globalData.userInfo = res.data
          wx.setStorageSync('userid', res.data.service.id);
          wx.setStorageSync('saveName', e.detail.value.name);
          wx.setStorageSync('savePsw', e.detail.value.pass);
          var userId = wx.getStorageSync('userid');
          var wxSession = res.data.session_id;
          wx.setStorageSync('module', res.data.module_id);
          wx.setStorageSync('PHPSESSID', res.data.session_id);
          //updateOpneid(that, wxSession)
          wx.setStorageSync('type', res.data.service.type);
          that.setData({
            userNull: false,
            pswNull: false,
            error: false,
          })
          wx.hideNavigationBarLoading() //完成停止加载
          wx.switchTab({
            url: '../index/index'
          })
          setTimeout(function() {
            that.setData({
              logining: false
            })
          }, 1000)

          wx.request({
            url: getApp().globalData.hostName + 'service/index/visit_count', 
            method: 'POST',
            header: {
              'content-type': 'application/json', // 默认值
              'Cookie': 'PHPSESSID=' + res.data.session_id
            },
            data: {
              user_id: res.data.service.id,
              type: '3'
            },
            success: function (visitres) {
              if (visitres.data.status == 1) {
                console.log('访问成功');
              } else {
                console.log('访问失败');
              }
            },
            fail: function (visitres) {
              console.log('fail', visitres);
            }
          })


        } else {
          setTimeout(function() {
            that.setData({
              logining: false
            })
          }, 1000)
          that.setData({
            userNull: false,
            pswNull: false,
            error: true,
          })
        }
      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      fail(res) {
        var ss = res.data.status
        that.setData({
          dataa: ss
        })
      }
    })


  },
  watchName: function() {
    this.setData({
      userNull: false
    })
  },
  watchPass: function() {
    this.setData({
      pswNull: false
    })
  },

  //获取用户输入的用户名
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  toeditPsw: function() {
    wx.navigateTo({
      url: '../mobilePsw/mobilePsw',
    })
  },
  openEyes: function(e) {
    console.log(e.currentTarget.dataset.num)
    this.setData({
      eyes: !this.data.eyes
    })
    if (e.currentTarget.dataset.num == 'open') {
      this.setData({
        text: 'text'
      })
    } else {
      this.setData({
        text: 'password'
      })
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    // var scene = 5
    // if (scene) {
    if (options.scene){
      var scene = decodeURIComponent(options.scene)
      app.globalData.coupon = ''
      app.globalData.coupon = scene
    }
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        app.globalData.mobileType = res.model
      }
    })
    var screenHeight = wx.getSystemInfoSync().screenHeight
    var iphoneReg =/iPhone X/
    if (app.globalData.mobileType.match(iphoneReg)) {
      that.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
        nav_cell: "nav_cellX",
      })
    } 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      userName: wx.getStorageSync('saveName'),
      userPwd: wx.getStorageSync('savePsw')
    })

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },
})

function updateOpneid(that, session) {
  wx.request({
    url: test + 'service/index/bind',
    method: 'POST',
    data: {
      js_code: app.globalData.js_code
    },
    dataType: String,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'PHPSESSID=' + session
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

    },
    complete: function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    fail(res) {
      var ss = res.data.status
      that.setData({
        dataa: ss
      })
    }
  })
}