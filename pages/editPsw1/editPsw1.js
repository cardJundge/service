// pages/editPsw1/editPsw1.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '修改密码',

  },
  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.mobile = options.mobile
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      that.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
        nav_cell: "nav_cellX",
      })
    }

  },
  cancelRed: function() {
    var that = this
    this.setData({
      nuArc: false,
      nuArcLength: false,
      primaryDiffer: false
    })
  },
  jumpToMyPage: function(e) {
    var that = this
    console.log(e.detail.value.psw1)
    console.log(e.detail.value.psw2)
    if (e.detail.value.psw1 == '') {
      this.setData({
        nuArc: true
      })
      return
    }
    if (e.detail.value.length < 6) {
      this.setData({
        nuArcLength: true
      })
      return
    }
    if (e.detail.value.psw1 != e.detail.value.psw2) {
      this.setData({
        primaryDiffer: true
      })
      return
    }
    this.setData({
      allOver: true
    })
    wx.showLoading({
      title: '修改中...',
    })
    wx.request({
      url: test + 'service/login/set_pwd',
      method: 'POST',
      data: {
        mobile: that.data.mobile,
        password: e.detail.value.psw1,
        passwords: e.detail.value.psw2,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
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
        console.log(res.data)
        if (res.data.status == 1) {
          wx.navigateBack({
            delta: 2
          })
          wx.hideLoading()
          wx.showToast({
            title: '修改成功',
          })
        } else {
          that.setData({
            allOver: false
          })
          wx.showModal({
            title: '操作超时',
            content: '',
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})