// pages/index/userInfor/userInfor.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand:[],
    service:[],
    userId:'',
    userInfor:{},
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userType: wx.getStorageSync('type')
    })
    this.data.userId=wx.getStorageSync('userid')
  },
  toUpdate:function(){
    wx.navigateTo({
      url: '../updateData/updateData',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var that = this;
   
    var session_id = this.data.sessionId 
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: test + 'service/index/info/id/' + this.data.userId,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
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
      
        that.setData({
          userInfor:res.data.service,
        })
        console.log(res.data.service.store)
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  }, 


  /**
   * 生命周期函数--监听页面显示
   */
 

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
