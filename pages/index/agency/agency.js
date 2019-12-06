// 年审代办
var app = getApp()
Page({

  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '年审代办',
    hasNoData: false,
    limit: 20,
    page: 1,
    hasNoData: false,
    agencyList: []
  },
  onLoad: function (options) {
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        titTop: '90px',
        container: 'containerX',
        nav_cell: "nav_cellX",
      })
    }
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
  },

  onShow: function() {
    this.data.agencyList = []
    this.data.page = 1
    this.getAgencyList()
  },

  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 获取年审代办列表
  getAgencyList() {
    wx.request({
      url: app.globalData.hostName + 'service/project/yearCare',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      },
      data: {
        limit: this.data.limit,
        page: this.data.page
      },
      success: res=> {
        if(res.data.status == 1) {
          let agencyList = this.data.agencyList
          let agencyInfo = res.data.data.data
          if (this.data.page == 1 && agencyInfo.length == 0) {
            return this.setData({
              hasNoData: true
            })
          }
          this.setData({
            hasNoData: false
          })
          if(agencyInfo.length < this.data.limit) {
            this.setData({
              agencyList: agencyList.concat(agencyInfo),
              hasMoreData: false
            })
          } else {
            this.setData({
              agencyList: agencyList.concat(agencyInfo),
              hasMoreData: true
            })
          }
        } else {
          this.setData({
            hasNoData: true
          })
        }
      }
    })
  },

  getMoreData() {
    this.setData({
      page: this.data.page + 1
    })
    this.getAgencyList()
  },

  toAgencyDetails(e) {
    console.log(e)
    let listId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './agency-details/agency-details?listId=' + listId,
    })
  }
})