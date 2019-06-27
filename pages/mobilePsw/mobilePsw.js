// pages/mobilePsw/mobilePsw.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '忘记密码',
    send: true,
    time: 120,
    phoneNull: false,
    phoneMatter: false,
    vertifyNull: false,
    errorVertify: false,
    vertifyCodeNum: '',
    phoneNum: ''
  },
  cancelRed: function() {
    this.setData({
      phoneMatter: false,
      phoneNull: false,
    })
  },
  cancelRed1: function() {
    this.setData({
      vertifyNull: false,
      errorVertify: false,
      vertifyed:false
    })
  },
  getPhone: function(e) {
    this.setData({
      phoneMatter: false,
      phoneNull: false,
      vertifyNull: false,
      errorVertify: false,
      phoneNum: e.detail.value
    })
  },
  vertifyPhone: function(e) {
    var that = this;
    var phoneValue = e.detail.value;
    console.log(phoneValue);
    if (phoneValue.length == 0) {
      that.setData({
        phoneNull: true,
        phoneMatter: false,
        vertifyNull: false,
        errorVertify: false
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phoneValue)) {
      that.setData({
        phoneNull: false,
        phoneMatter: true,
        vertifyNull: false,
        errorVertify: false
      })
      return false;
    }
  },
  vertifyCode: function(e) {
    this.setData({
      vertifyCodeNum: e.detail.value
    })
  },
  toNext: function() {
    console.log()
    var that = this;
    var vertifynum = this.data.vertifyCodeNum;
    if (vertifynum.length == 0) {
      that.setData({
        vertifyNull: true,
      })
      return false;
    }
    that.setData({
      allOver:true
    })

    wx.request({
      url: test + 'service/login/get_pwd',
      method: 'POST',
      data: {
        mobile: that.data.mobileTrue,
        code: vertifynum
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res)
        var dataType = typeof res.data
        console.log(dataType)
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
        console.log(res.data)
        if (res.data.status == 1) {
          wx.navigateTo({
            url: '../editPsw1/editPsw1?mobile=' + that.data.mobileTrue + '&&code=' + vertifynum,
          })
        } else if(res.data.msg=="验证码错误"){
          that.setData({
            errorVertify:true,
            allOver: false
          })
       
         
        } else if (res.data.msg == "验证码已过期") {
          that.setData({
            vertifyed: true,
            allOver: false
          })

        }else{
          that.setData({
            allOver: false
          })
          wx.showModal({
            title: '操作超时',
            content: '',
          })
        }
      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      fail(res) {
        var ss = res.data.status
        that.setData({
          dataa: ss
        })
      }
    })

  },
  interval: function() {
    var that = this
    that.timer = setInterval(function() {
      if (that.data.time == 0) {
        clearInterval(that.timer);
        that.setData({
          send: true,
          time: 120
        })

      }
      var a = that.data.time;
      a--;
      that.setData({
        time: a
      })
    }, 1000)

  },
  getCode: function(e) {

    console.log(e.detail.value.mobile)
    if (e.detail.value.mobile == '') {
      this.setData({
        phoneNull: true,
      })
      return;
    }
    if (this.data.errorVertify == true) {

      return;
    }
    this.setData({
      phoneNull: false,
      errorVertify: false,
    })
    var that = this
    that.interval();
    this.setData({
      send: false
    })
    this.setData({
      mobileTrue: e.detail.value.mobile
    })
    wx.request({
      url: test + 'service/login/for_pwd',
      method: 'POST',
      data: {
        mobile: e.detail.value.mobile
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res)
        var dataType = typeof res.data
        console.log(dataType)
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
        console.log(res.data)
        if (res.data.status == 1) {



        } else {
          wx.showModal({
            title: '操作超时',
            content: '',
          })
        }
      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      fail(res) {
        var ss = res.data.status
        that.setData({
          dataa: ss
        })
      }
    })

  },
  validatemobile: function(mobile) {
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    return true;
  },
  backPage:function(){
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }

  },
  timedes: function() {

  }
})