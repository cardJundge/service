// pages/index/addTask/addTask.js
var addData = require('../../getData/addData.js');
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '添加拖车',
    carData: {},
    trueName: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tosecondPagere: function () {
    this.setData({
      pageTwo: true
    })
  },
  tofirstPage: function () {
    this.setData({
      pageTwo: false
    })
  },
  analyze: function (e) {
    var that = this
    that.setData({
      shortMessage: e.detail.value.infor.replace('-', '')
    })
    var typeReg = /吊装|搭电|换胎/
    if (that.data.shortMessage.match(typeReg)) {
      if (that.data.shortMessage.match(typeReg)[0] == '搭电') {
        that.data.rescueType = 1
      } else if (that.data.shortMessage.match(typeReg)[0] == '换胎') {
        that.data.rescueType = 2
      }
      that.setData({
        rescueType: that.data.rescueType
      })
    } else {

    }
    var nameReg = /车主姓名/
    if (that.data.shortMessage.match(nameReg)) {
      var nameTemp = that.data.shortMessage.slice(that.data.shortMessage.match(nameReg).index + 6, that.data.shortMessage.match(nameReg).index + 10)
      console.log(nameTemp.length)
      var chineseReg = /[\u4e00-\u9fa5]+/
      if (nameTemp.match(chineseReg)) {
        that.setData({
          userName: nameTemp.match(chineseReg)[0]
        })
      }
    } else {
      console.log('名字不行')
    }
    var phoneReg = /1[3456789]\d{9}/
    if (that.data.shortMessage.match(phoneReg)) {
      console.log(that.data.shortMessage.match(phoneReg))
      that.setData({
        userPhone: that.data.shortMessage.match(phoneReg)[0]
      })
    }
    var reCar = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}/
    if (that.data.shortMessage.match(reCar)) {
      console.log(that.data.shortMessage.match(reCar))
      that.setData({
        userCar: that.data.shortMessage.match(reCar)[0]
      })
    }
    var addressReg = /故障地点/
    if (that.data.shortMessage.match(addressReg)) {
      var addressTemp = that.data.shortMessage.slice(that.data.shortMessage.match(addressReg).index + 6, that.data.shortMessage.match(addressReg).index + 50)
      var tempReg = /拖车目的地址/
      if (addressTemp.match(tempReg)) {
        that.setData({
          address: addressTemp.slice(0, addressTemp.match(tempReg).index)
        })
      } else {
        that.setData({
          address: addressTemp
        })
      }
    }
    var deaddressReg = /拖车目的地址/
    if (that.data.shortMessage.match(deaddressReg)) {
      var addressTemp = that.data.shortMessage.slice(that.data.shortMessage.match(deaddressReg).index + 7, that.data.shortMessage.match(deaddressReg).index + 60)
      var tempReg = /被保险人/
      if (addressTemp.match(tempReg)) {
        that.setData({
          deaddress: addressTemp.slice(0, addressTemp.match(tempReg).index)
        })
      } else {
        that.setData({
          deaddress: addressTemp
        })
      }
    }
    that.setData({
      pageTwo: true
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.trueName == '') {
      that.setData({
        nameErr: true
      })
      return
    }
    var reg = /^1[3456789]\d{9}$/;
    if (reg.test(e.detail.value.trueMobile)) {
    } else {
      that.setData({
        mobileErr: true
      })
      return
    }
    var reCar = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/
    if (reCar.test(e.detail.value.trueCar)) {
      console.log('ok')
    } else {
      that.setData({
        carNoErr: true
      })
      return
    }
    if (e.detail.value.address == '') {
      that.setData({
        addressErr: true
      })
      return
    }
    if (e.detail.value.deaddress == '') {
      that.setData({
        deaddressErr: true
      })
      return
    }
    wx.showLoading({
      title: '添加中...',
    })
    that.setData({
      allOver: true
    })
    that.data.sessionId = wx.getStorageSync('PHPSESSID')
    wx.request({
      url: test + 'service/trailer/add',
      method: 'POST',
      data: {
        owner_name: e.detail.value.trueName,
        mobile: e.detail.value.trueMobile,
        car_no: e.detail.value.trueCar,
        accident_address: e.detail.value.accident_address,
        destination_address: e.detail.value.deaddress,
        remark: e.detail.value.infor ? e.detail.value.infor:''
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
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
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '添加成功',
            duration: 500
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../../allot/allot?module=' + res.data.id + '&&moduleis=3',
            })
          }, 500)
        } else {
          wx.showModal({
            title: '操作超时',
            content: '',
          })
          wx.hideLoading()
          that.setData({
            allOver: false
          })
        }


      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
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