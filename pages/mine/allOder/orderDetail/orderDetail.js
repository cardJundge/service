// pages/mine/allOder/orderDetail/orderDetail.js
var test = getApp().globalData.hostName;
var test1 = getApp().globalData.hostName1;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '订单详情',
    steps: [],
    allImg: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        app.globalData.mobileType = res.model
      }
    })

    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
    this.data.orderId = options.order_id

    if (options.formId == 1) { //从通知进来做登录处理
      that.setData({
        formId: true
      })
      app.getAuthKey(this).then(function () {
        console.log(that.data.loginRes)
        wx.setStorageSync('userid', that.data.loginRes.data.service.id);
        wx.setStorageSync('module', that.data.loginRes.data.module_id);
        wx.setStorageSync('PHPSESSID', that.data.loginRes.data.session_id);
        that.data.sessionId = that.data.loginRes.data.session_id
        that.data.userId = that.data.loginRes.data.service.id
        var wxSession = that.data.loginRes.data.session_id;
        wx.setStorageSync('type', that.data.loginRes.data.service.type);
        that.setData({
          steps: []
        })
        getDetail(that)

      })
    } else {
      that.data.sessionId = wx.getStorageSync('PHPSESSID')
      that.data.userId = wx.getStorageSync('userid')
    }


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.openImg) {
      this.data.openImg = false
      return
    }
    this.setData({
      steps: [],
      allImg: []
    })
    getDetail(this)
  },
  link: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.num //仅为示例，并非真实的电话号码
    })
  },
  openImg: function(e) {
    var that = this
    this.data.openImg = true
    console.log('lve',that.data.allImg)
    wx.previewImage({
      current: e.target.id, // 当前显示图片的http链接
      urls: that.data.allImg // 需要预览的图片http链接列表
    })
  },

  toIndex: function() {
    wx.switchTab({
      url: '../../../index/index',
    })
  },
  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  
  // 完成订单
  toComplete: function () {
    var that = this
    wx.request({
      url: test + '/service/order/finish',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: that.data.orderId,
      },
      success: function (res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '订单完成',
          })
          getDetail(that)
          // that.data.detailData.server.work_status == 4
          // that.setData({
          //   detailData: that.data.detailData
          // })
        }
      }
    })
  },
  toAllot: function (e) {
    wx.navigateTo({
      url: '../../../index/allot/allot?module=' + this.data.orderId + '&&moduleis=100',
    })
  },
  accept: function(e) {
    var that = this
    console.log(e.currentTarget.id)
    wx.request({
      url: test + 'service/order/receive',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: that.data.orderId,
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
          var pages = getCurrentPages(); //页面指针数组 
          var prepage = pages[pages.length - 2]; //上一页面指针 
          console.log(prepage.data.orderList)
          for (var i in prepage.data.orderList){
            if (prepage.data.orderList[i].id == that.data.orderId){
              prepage.data.orderList[i].work_status=1
              break

            }
          }
          prepage.setData({
            orderList: prepage.data.orderList
          })
          that.onShow()
          that.data.detailData.server.work_status == 1
          that.setData({
            detailData: that.data.detailData
          })

        } else {

        }

      }
    })
  },
  addProgress: function() {
    wx.navigateTo({
      url: '../../../index/addProgress/addProgress?detailId=' + this.data.orderId + '&&moduleis=100',
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
        order_id: that.data.orderId,
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
          that.data.detailData.server.work_status == 6
          that.setData({
            detailData: that.data.detailData
          })

        } else {

        }

      }
    })
  },

  copyTBL: function(e) {
    console.log(e.currentTarget.id)
    wx.setClipboardData({
      data: e.currentTarget.id,
      success: function(res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          title: '复制成功',
        })
      }
    });
  }
})

function getDetail(that) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: test1 + 'service/order/orderInfo',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: that.data.orderId,
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
          that.setData({
            detailData: res.data.data
          })
          var aa = []
          var toTrace;
          console.log(res.data.data)
          for (var n in res.data.data.schedule) {
            var last = 'grey';
            if (n == res.data.data.schedule.length - 1) {
              last = 'blue'
            }
            var first = 'has'
            if (n == 0) {
              first = 'nohas'
            }
            var year = res.data.data.schedule[n].date;
            var month = year.slice(5, 10);
            var time = year.slice(11)
            var picStr = '';
            if (res.data.data.schedule[n].picture) {
              picStr = res.data.data.schedule[n].picture;
              var tempPic = res.data.data.schedule[n].picture.split(',')
              for (var t in tempPic) {
                that.data.allImg.push(test + 'uploads/work/' + tempPic[t])
              }
            }
            aa.unshift({
              trace: toTrace,
              first: first,
              color: last,
              current: true,
              month: month,
              time: time,
              done: true,
              pic: picStr.split(","),
              text: res.data.data.schedule[n].title,
              desc: res.data.data.schedule[n].date
            })
          }
          that.setData({
            steps: aa
          })
          console.log(that.data.steps)
          that.setData({
            loaded: true
          })
        } else {

        }

        //that.data.serviceDetail = res
        resolve(that)

      }
    })
  })
}