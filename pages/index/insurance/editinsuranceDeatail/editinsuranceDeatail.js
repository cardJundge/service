// pages/index/editClaims/editClaims.js
var edit = require('../../getData/edit.js')
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
    var ifCar = false;
    edit.editSubmit(e, that, this.data.listId, this.data.sessionId, 'sale', ifCar, 8)
  },
  cancelRed: function (e) {
    var that = this;
    edit.cancelRed(e, that)

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

    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    edit.editShow(that, this.data.sessionId, 'sale', 8)

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
    wx.showNavigationBarLoading() //在标题栏中显示加载
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