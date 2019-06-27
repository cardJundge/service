// pages/index/mine/myOrder/myOrder.js
var test = getApp().globalData.hostName;
var test1 = getApp().globalData.hostName1;
var common = require('../../../pages/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:'64px',
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '所有订单',
    orderList: [],
    page: 1,
    decoration: 1,
    work_status: '',
    status: ''
  },
  submitFormId: function(e) {
    console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  changeType: function(e) {
    var that = this
    that.setData({
      noAllData: false,
      noData: false
    })
    console.log(e)
    that.data.page = 1
    this.setData({
      decoration: e.currentTarget.dataset.id,
      orderList: [],
      loaded: false
    })
    if (e.currentTarget.dataset.id == 1) {
      that.data.work_status = ''
      that.data.status = ''
    } else if (e.currentTarget.dataset.id == 2) {
      that.data.work_status = 4
      that.data.status = ''
    } else {
      that.data.work_status = ''
      that.data.status = 3
    }
    getOrderList(this).then(function() {
      that.setData({
        loaded: true
      })
    })
  },
  topay: function() {
    wx.navigateTo({
      url: './Payment/Payment',
    })
  },
  toOrderDetail: function() {
    wx.navigateTo({
      url: './orderDetail/orderDetail',
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
  onLoad: function(options) {
    this.setData({
      hostName1: test1
    })
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
        top: '90px',
      })
    }
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    getOrderList(this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (wx.getStorageSync('orderId')) {
      var tempId = wx.getStorageSync('orderId')
      var tempName = wx.getStorageSync('taskName')
      for (var i in this.data.orderList) {
        if (this.data.orderList[i].id == tempId) {
          var temp1 = 'orderList[' + i + '].work_status'
          var temp2 = 'orderList[' + i + '].work'
          this.setData({
            [temp1]: 2,
            [temp2]: tempName
          })
          wx.removeStorageSync('orderId')
          wx.removeStorageSync('taskName')
          break
        }
      }
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  toAllot: function(e) {
    wx.navigateTo({
      url: '../../index/allot/allot?module=' + e.currentTarget.id + '&&moduleis=100',
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

  },
  addProgress: function(e) {
    wx.navigateTo({
      url: '../../index/addProgress/addProgress?detailId=' + e.currentTarget.id + '&&moduleis=100',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    this.data.page++
      this.setData({
        loaded: false
      })
    console.log(this.data.page)
    getOrderList(that)

  },
  accept: function(e) {
    var that = this
    wx.showLoading({
      title: '接单中...',
    })
    console.log(e.currentTarget.id)
    wx.request({
      url: test + 'service/order/receive',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: e.currentTarget.id,
      },
      success: function(res) {
        var dataType = typeof res.data
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

        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '接单成功',
          })
          for (let i in that.data.orderList) {
            if (that.data.orderList[i].id == e.currentTarget.id) {
              var temp = 'orderList[' + i + '].work_status'
              that.setData({
                [temp]: 1
              })
              break
            }
          }

        } else {
          wx.showModal({
            title: '接单失败',
            content: '',
          })
        }

      }
    })
  },
  cancelOrder: function(e) {
    var that = this
    console.log(e.currentTarget.id)
    wx.request({
      url: test + 'service/order/cancelOrder',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: e.currentTarget.id,
      },
      success: function(res) {
        var dataType = typeof res.data
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

        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '取消成功',
          })
          for (let i in that.data.orderList) {
            if (that.data.orderList[i].id == e.currentTarget.id) {
              var temp = 'orderList[' + i + '].work_status'
              that.setData({
                [temp]: 6

              })
              break
            }
          }

        } else {

        }

      }
    })
  },
  toDetail: function(e) {
    wx.navigateTo({
      url: './orderDetail/orderDetail?order_id=' + e.currentTarget.id,
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function getOrderList(that) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: test + 'service/order/index',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        service_id: that.data.userId,
        page: that.data.page,
        status: that.data.status,
        work_status: that.data.work_status
      },
      success: function(res) {
        var dataType = typeof res.data
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

        console.log(res)

        if (res.data.status == 1) {
          for (var i in res.data.data) {
            that.data.orderList.push(res.data.data[i])
          }
          that.setData({
            loaded: true,
            orderList: that.data.orderList
          })
        } else {
          if (res.data.data == '暂无订单') {
            if (that.data.orderList.length == 0) {
              that.setData({
                noAllData: true
              })
            } else {
              that.setData({
                noData: true
              })
              setTimeout(function() {
                that.setData({
                  noData: false
                })
              }, 1000)
            }
          }
        }
        that.setData({
          loaded: true,
          loaded1: true
        })
        //that.data.serviceDetail = res


        resolve(that)
      }
    })
  })
}