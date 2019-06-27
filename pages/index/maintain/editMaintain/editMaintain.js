// pages/index/editClaims/editClaims.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listId: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.listId = options.module
    console.log(this.data.listId)

  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.trueName == '') {
      that.setData({
        nameErr: true
      })
      return
    }
    var reg = /^1[345789]\d{9}$/;
    if (reg.test(e.detail.value.trueMobile)) {
      console.log('ok')
    } else {
      that.setData({
        mobileErr: true
      })
      return
    }

    var reCar = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/
    if (reCar.test(e.detail.value.trueCar)) {
      console.log('ok')
    } else {
      that.setData({
        carNoErr: true
      })
      return
    }
    that.setData({
      allOver: true
    })

    var test = getApp().globalData.hostName;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    console.log(e.detail.value);
    wx.request({
      url: test + 'service/maintain/edit',
      method: 'POST',
      data: {
        id: this.data.listId,
        owner_name: e.detail.value.trueName,
        mobile: e.detail.value.trueMobile,
        car_no: e.detail.value.trueCar,
        remark: e.detail.value.secondinfor,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
      },
      success: function (res) {
        console.log(res)
        var dataType = typeof res.data
        console.log(dataType)
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
        if(res.data.status==1){
          wx.showToast({
            title: '修改成功',
            duration:500
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },500)
        }
        

      }
    })
  },
  cancelRed: function (e) {
    var that = this;
    if (e.currentTarget.id == 'trueName') {
      that.setData({
        nameErr: false
      })
    } else if (e.currentTarget.id == 'trueMobile') {
      that.setData({
        mobileErr: false
      })
    } else if (e.currentTarget.id == 'trueCar') {
      that.setData({
        carNoErr: false
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var test = getApp().globalData.hostName;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    wx.request({
      url: test + 'service/maintain/info/id/' + that.data.listId,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
      },// 默认值
      success: function (res) {
        console.log(res)
        var dataType = typeof res.data
        console.log(dataType)
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
        that.setData({
          carHost: res.data.maintain
        })
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})