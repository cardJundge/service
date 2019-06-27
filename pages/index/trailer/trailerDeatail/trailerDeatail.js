// pages/index/claimsDetail/claimsDetail.js
var test = getApp().globalData.hostName;
var detail = require('../../getData/detail.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '拖车详情',
    detailId: '',
    listId: '',
    ss: '',
    reason: false,
    steps: [

    ],
    oprationModal: false,
    modal: [false, false, false, false]
  },
  reasonOpen: function () {
    var temp = 'detail.reason'
    this.setData({
      [temp]: true
    })

  },
  showGetCar: function (e) {
    var that = this
    var typeTrace;
    if (e.currentTarget.id == 'jieche') {

      for (var i in that.data.scheduleAll) {
        if (that.data.scheduleAll[i].title == '接车') {
          wx.navigateTo({
            url: '../../showTrace/showTrace?trace=' + that.data.scheduleAll[i].pick_path,
          })
        }
      }

    } else {
      typeTrace = '送车'
      for (var i in that.data.scheduleAll) {
        if (that.data.scheduleAll[i].title == '送车') {
          wx.navigateTo({
            url: '../../showTrace/showTrace?trace=' + that.data.scheduleAll[i].give_path,
          })
        }
      }
    }
  },
  unpassReason: function (e) {
    detail.unpassReason(e, this, this.data.listId, this.data.sessionId, 'trailer')
  },
  cancelClaim: function () {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.cancelModal'
    this.setData({
      [temp1]: true,
      [temp]: false
    })

  },
  openImg: function (e) {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.id] // 需要预览的图片http链接列表
    })
  },
  confirmCancel: function () {
    detail.confirmCancel(this, this.data.listId, this.data.sessionId, 'trailer')

  },
  noCancel: function () {
    var temp = 'detail.cancelModal'
    this.setData({
      [temp]: false
    })
  },
  toDelete: function () {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.deleteMODAL';
    this.setData({
      [temp1]: true,
      [temp]: false
    })
  },
  confirmDelete: function () {
    detail.confirmDelete(this, this.data.listId, this.data.sessionId, 'trailer')

  },
  cancelDeleteModal: function () {
    var temp = 'detail.deleteMODAL'
    this.setData({
      [temp]: false,
    })
  },
  toEdit: function () {
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: false
    })
    wx.navigateTo({
      url: '../editTrailer/editTrailer?module=' + this.data.detailId,
    })
  },
  link: function (e) {
    var phonenumber = e.currentTarget.dataset.num;
    wx.makePhoneCall({
      phoneNumber: phonenumber //仅为示例，并非真实的电话号码
    })
  },
  toSelectPeople: function () {
    var pageModule = 0
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: false
    })
    wx.navigateTo({
      url: '../../allot/allot?module=' + this.data.detailId + '&moduleis=3',
    })
  },
  closeOprationModal: function (e) {
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: false
    })
  },

  stopBubble: function () {
  },
  openModal: function () {
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: true
    })
  },
  closeModal: function () {
    var temp1 = 'detail.check';
    this.setData({
      [temp1]: false
    })
  },
  checkModal: function () {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.check';
    this.setData({
      [temp]: false,
      [temp1]: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    var bean = options.listId;
    this.setData({
      listId: bean
    })
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        titTop: '90px',
        container: 'containerX',
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.data.sessionId = wx.getStorageSync('PHPSESSID')
    that.data.userId = wx.getStorageSync('userid');
    wx.showNavigationBarLoading() //在标题栏中显示加载
    detail.getDetail(that, that.data.sessionId, that.data.listId, 'trailer', 4)
  },
  checkPass: function () {
    var that = this

    detail.checkPass(that, that.data.listId, this.data.sessionId, 'trailer')

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onShow()
  }
})