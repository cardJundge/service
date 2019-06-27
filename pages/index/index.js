//index.js
//获取应用实例
var app = getApp()
var common = require('../../pages/common.js')
var test = getApp().globalData.hostName;
Page({
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop:'商户端',
    count:0,
    sessionId: '',
    userId: '',
    logOut: false,
    indexTag: true,
    adminPeople: false,
    mine: false,
    modal: false,
    ownModule: {}
  },
  toOrder:function(){
    wx.navigateTo({
      url: '../mine/allOder/allOder',
    })
  },
  onLoad:function(){
    var that=this
    var iphoneReg = /iPhone X/
    console.log(app.globalData.mobileType)
    if (app.globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
        nav_cell: "nav_cellX",
      })
    }

    this.data.serviceId = wx.getStorageSync('userid')
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.setData({
      serviceType: wx.getStorageSync('type')
    })
    var moduleTemp = wx.getStorageSync('module')
    that.setData({
      moduleTemp: moduleTemp
    })
    var moduArrTemp={}
    for(let i of moduleTemp){
     if(i==1){
       moduArrTemp.checkLoss=true
     }else if(i==2){
       moduArrTemp.fixCar=true
     }else if(i==3){
       moduArrTemp.trailer = true
     }else if(i==4){
       moduArrTemp.rescue = true
     }
    }
    that.setData({
      ownModule: moduArrTemp
    })
    // console.log(that.data.ownModule)
    
  },
  submitFormId: function (e) {
    // console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  tofix:function(){
    wx.navigateTo({
      url: './fixCar/fixCar',
    })
  },
  tofix1: function () {
    wx.navigateTo({
      url: './fixCar1/fixCar',
    })
  },
  logoutModal: function () {
    this.setData({
      logOut: true
    })
  },
  cancelModal: function () {
    this.setData({
      logOut: false
    })
  },
  toTrail: function () {
    wx.navigateTo({
      url: './trailer/trailer',
    })
  },
  toRescue: function () {
    wx.navigateTo({
      url: './rescue/rescue',
    })
  },
  toCheckLoss: function () {
    wx.navigateTo({
      url: './checkLoss/checkLoss',
    })
  },
  updateButton: function () {
    var that = this;
    var test = getApp().globalData.hostName;
    wx.request({
      url: test + 'service/index/hasinfo',
      method: 'POST',
      data: {
        id: that.data.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res)
        var dataType = typeof res.data
        // console.log(dataType)
        if (dataType == 'string') {
          var jsonStr = res.data;
          jsonStr = jsonStr.replace(" ", "");
          var temp
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
            temp = JSON.parse(jsonStr);
            res.data = temp;
          }
        }
        // console.log(res)
        if (res.data.status == 0) {
          that.setData({
            modal: true
          })
        }
      }
    })
  },
  tempw: function () {
    wx.navigateTo({
      url: '../mine/updateData/updateData',
    })
  },
  //事件处理函数
  onReady: function () {
    var that=this
   
    wx.showLoading({
      title: '载入中...',
    })
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    this.data.module = wx.getStorageSync('module');
    // console.log(this.data.module)
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId

    var that = this;
    that.setData({
      userType: wx.getStorageSync('type'),
    })
    wx.request({
      url: test + 'service/index/info',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
      },// 默认值
      data:{
        id: that.data.userId
      },
      success: function (res) {
        // console.log(res)
        var dataType = typeof res.data
        // console.log(dataType)
        if (dataType == 'string') {
          var jsonStr = res.data;
          jsonStr = jsonStr.replace(" ", "");
          var temp
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
            temp = JSON.parse(jsonStr);
            res.data = temp;
          }
        }
        // console.log(res.data)
       
        that.setData({
          loaded:true,
        })  
      }
    })
    wx.request({
      url: test + 'service/index/hasinfo',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
      },// 默认值
      success: function (res) {
        // console.log(res)
        var dataType = typeof res.data
        // console.log(dataType)
        if (dataType == 'string') {
          var jsonStr = res.data;
          jsonStr = jsonStr.replace(" ", "");
          var temp
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
            temp = JSON.parse(jsonStr);
            res.data = temp;
          }
        }
        // console.log(res.data)
        if (res.data.status == 0) {
          that.setData({
            modal: true
          })
        }
      }
    })
    wx.hideLoading()
  },
  onShow: function () {
 
    var that = this;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    var session_id = this.data.sessionId
    unhandle(that)
  },
  toAgency: function () {
    wx.navigateTo({
      url: './adminAgency/adminAgency',
    })
  },
  toAdminPeople: function () {
    wx.navigateTo({
      url: './adminPeople/adminPeople',
    })
  },
  getUserInfo: function (e) {
  },
  toUpdate: function () {
    wx.navigateTo({
      url: '../mine/updateData/updateData',
    })
    this.setData({
      modal: false
    })
  },
  cancelTo:function() {
    this.setData({
      modal: false
    })
  },

  onPullDownRefresh: function () {
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },
 
})
function unhandle(that){
  wx.request({
    url: test + 'service/order/untreated',
    method: 'GET',
    data: {
      service_id: that.data.serviceId
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'PHPSESSID=' + that.data.sessionId
    },
    success: function (res) {
      // console.log(res)
      var dataType = typeof res.data
      // console.log(dataType)
      if (dataType == 'string') {
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        var temp
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
          temp = JSON.parse(jsonStr);
          res.data = temp;
        }
      }
      // console.log(res)
      if (res.data.status == 1) {
        that.setData({
          count: res.data.count
        })
       
      }
    }
  })
}
