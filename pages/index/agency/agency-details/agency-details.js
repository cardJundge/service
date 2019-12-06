// 年审代办
var app = getApp()
Page({
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '年审代办详情',
    agencyDetails: {},
    showBottomOperation: false,
  },
  onLoad: function (options) {
    console.log(options)

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
    this.data.listId = options.listId
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.setData({
      hostName: app.globalData.hostName
    })
    this.getAgencyDetails()
  },

  onShow: function(options) {
    this.getAgencyDetails()
  },

  // 获取年审代办详情
  getAgencyDetails() {
    wx.request({
      url: this.data.hostName + 'service/project/yearInfo',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      },
      data: {
        id: this.data.listId
      },
      success: res=> {
        if(res.data.status == 1) {
          let imgLicenseArr = []
          imgLicenseArr = res.data.data.vehicle_license.split(",")
          this.setData({
            agencyDetails: res.data.data,
            imgLicenseArr: imgLicenseArr
          })
          res.data.schedule.forEach((item, index) => {
            if (item.picture) {
              item.imgProgressArr = item.picture.split(",")
            }
          })
          this.setData({
            schedule: res.data.schedule
          })
        } else {
          wx.showToast({
            title: res.data.msg ? res.data.msg : '操作超时',
            icon: 'none'
          })
        }
      }
    })
  },

  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  // 接单
  toReceipt() {
    wx.request({
      url: this.data.hostName + 'service/project/take',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      },
      data: {
        id: this.data.listId
      },
      success: res=> {
       if(res.data.status == 1) {
         this.getAgencyDetails()
       } else {
         wx.showToast({
           title: res.data.msg ? res.data.msg : '操作超时',
           icon: 'none'
         })
       }
      }
    })
  },

  // 去分配作业员
  toDistribution() {
    wx.navigateTo({
      url: '../assigment/assigment?listId=' + this.data.listId
    })
  },

  // 去添加进度
  toAddPrograss() {
    if (this.data.agencyDetails.status >= 3) {
      wx.navigateTo({
        url: '../../addProgress/addProgress?detailId=' + this.data.listId + '&modueis=' + 101,
      })
    } else {
      wx.navigateTo({
        url: '../../addProgress/addProgress?detailId=' + this.data.listId + '&modueis=' + 101 + '&goon=' + true,
      })
    }
    
  },

  // 去结案
  toFinish() {
    wx.request({
      url: this.data.hostName + 'service/project/complete',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      },
      data: {
        id: this.data.listId
      },
      success: res=> {
        if(res.data.status == 1) {
          this.getAgencyDetails()
        } else if (res.data.status == -1){
          wx.showModal({
            title: '提示',
            content: '进度没有添加图片,无法点击完成!',
          })
        } else {
          wx.showToast({
            title: res.data.msg ? res.data.msg : '操作超时',
            icon: 'none'
          })
        }
      }
    })
  },

  operation() {
    this.setData({
      showBottomOperation: true
    })
  },

  // 关闭底部模态框
  closeModal() {
    this.setData({
      showBottomOperation: false
    })
  }
})