// pages/editPsw/editPsw.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '修改密码',
    sessionId: wx.getStorageSync('PHPSESSID')  
  },
  backPage:function(){
    wx.navigateBack({
      delta:1
    })
  },
  toEdit:function(e){
    var that = this
    that.setData({
      sessionId: wx.getStorageSync('PHPSESSID')
    })
    if (e.detail.value.new.length<6){
      // that.setData({
      //   nuArc: true
      // })
      wx.showToast({
        title: '新密码需6位以上！',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.new != e.detail.value.renew){
      // that.setData({
      //   differArc:true
      // })
      wx.showToast({
        title: '两次密码不一致!',
        icon: 'none'
      })
      return
    }
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: test + 'service/index/setPassword',
      method: 'POST',
      data:{
        oldPassword: e.detail.value.older,
        newPassword: e.detail.value.new,
        repPassword: e.detail.value.renew,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      },// 默认值
      success: function (res) {
        console.log(res)
        if (res.data.status == 0){
          // that.setData({
          //   primaryDiffer:true
          // })
          wx.showToast({
            title: '原密码不正确！',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '修改成功',
            duration: 1000,
            success: function() {
              that.logOut()
              // setTimeout(function () {
                // wx.navigateBack({
                //   delta: 2
                // })
                
              // }, 1000)
            }
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
  logOut: function (e) {
    wx.request({
      url: test + 'service/index/loginOut',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.redirectTo({
            url: '../login/login',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  }
})