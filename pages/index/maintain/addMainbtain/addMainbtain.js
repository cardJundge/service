// pages/index/addTask/addTask.js
var addData = require('../../getData/addData.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carData: {},
    trueName: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  formSubmit: function (e) {
    var that = this;
    var userIdArc = this.data.userId;
    var noCar = false;
    that.data.sessionId = wx.getStorageSync('PHPSESSID')
    var session_id = this.data.sessionId;
    console.log(session_id)
    addData.addSubmit(that, e, userIdArc, session_id, 'maintain', noCar);
  },

  cancelRed: function (e) {
    addData.cancelRed(this, e)

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