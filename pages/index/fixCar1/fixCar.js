// pages/index/adminAgency/adminAgency.js
var list = require('../getData/getData.js');
var test = getApp().globalData.hostName;

var common = require('../../../pages/common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '维修',
    paddingTop: '114px',
    allData: {
      listAtrr: []
    },
    keywords: '',
    page: 1
  },
  submitFormId: function(e) {
    console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  cancelSearch: function() {
    var temp = 'allData.listAtrr'
    this.setData({
      keywords: '',
      page: 1,
      task_id: '',
      [temp]: [],
      cancelSearchIcon: false,
    })
    this.onShow()

  },
  toChoose: function(e) {
    var temp = 'allData.listAtrr'
    this.setData({
      cancelSearchIcon: true,
      [temp]: [],
      keywords: e.detail.value
    })
    this.onShow()
    console.log('yyyyyyyayayaya', e.detail.value)
  },
  toAddAgency: function() {
    wx.navigateTo({
      url: 'addFixCar/addFixCar',
    })
  },
  toDetail: function(e) {
    console.log(e)
    var listId = e.currentTarget.id
    console.log(listId)
    wx.navigateTo({
      url: 'fixCarDeatail/fixCarDeatail?listId=' + listId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        paddingTop: '140px',
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        titTop: '90px',
        container: 'containerX',
        nav_cell: "nav_cellX",
      })
    }
  },
  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var temp = 'allData.gif'
    this.setData({
      [temp]: true,
    })
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    //获取列表
    var promiseTemp = new Promise(function(resolve, reject) {
      console.log('start new Promise...');
      resolve();
    });
    list.getList(that, 'push', session_id, that.data.page, that.data.keywords, 11)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var temp = 'allData.listAtrr'
    this.setData({
      [temp]: [],
      keywords: '',
      page: 1
    })
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

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.data.page++;
    this.setData({
      gif: true
    })
    console.log(this.data.page)
    this.onShow();
    console.log('上啦啦')
    console.log(this.data.page)
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})