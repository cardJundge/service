// 明细
var globalList = getApp().globalData;
Page({
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '账户明细',
    sessionId: wx.getStorageSync('PHPSESSID'),
    hasMoreData: false,
    hasRecord: false,
    page: 1,
    pageSize: 20,
    beanList: []
  },
  onLoad: function (options) {
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
        nav_cell: "nav_cellX",
      })
    }
   var that = this
    that.setData({
      sessionId: wx.getStorageSync('PHPSESSID')
    })
    wx.request({
      url: globalList.hostName + 'service/index/beanLogs',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        bean_type: 1,
        page: that.data.page
      },
      success: function (res) {
        if(res.data.status == 1) {
          var beanList = that.data.beanList
          var beanInfo = res.data.data
          if (beanInfo.length == 0) {
            that.setData({
              hasRecord: false
            })
          } else {
            that.setData({
              hasRecord: true
            })
            if (beanInfo.length < that.data.pageSize) {
              that.setData({
                beanList: beanList.concat(beanInfo),
                hasMoreData: false
              })
            } else {
              that.setData({
                beanList: beanList.concat(beanInfo),
                pageSize: that.data.pageSize + 1,
                hasMoreData: false
              })
            }
          }
         
        }
        console.log("明细列表",res.data)
      }
    })
  },
  // 返回上一级
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onReachBottom: function () {
    var that = this
    if (that.data.hasMoreData) {
      that.onLoad()
    } else {
    }
  }
})