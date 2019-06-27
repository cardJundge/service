// pages/index/showTrace/showTrace.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    location: [],
    polyline: [{
      points: [
      ],
      color: "#00FF00DD",
      width: 10,
      borderColor: '#000000',
      arrowLine: true,
      borderWidth: 2
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.data.locationArr = JSON.parse(options.trace)
    console.log(this.data.locationArr)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    for (var i in this.data.locationArr) {
      var temp = this.data.locationArr[i].split(',')
      this.data.location.push(temp)
    }
    var length = this.data.locationArr.length - 1
    that.setData({
      latitude: this.data.location[0][0],
      longitude: this.data.location[0][1],
    })
    that.data.markers.push({
      id: 1,
      latitude: this.data.location[0][0],
      longitude: this.data.location[0][1],
      iconPath: '../../img/startPos.png',
      width: 30,
      height: 30,
    });
    that.data.markers.push({
      id: 1,
      latitude: this.data.location[length][0],
      longitude: this.data.location[length][1],
      iconPath: '../../img/endPos.png',
      width: 30,
      height: 30,
    });
    console.log(this.data.markers)
    that.setData({
      markers: that.data.markers
    })
    for (var j in this.data.location) {
      that.data.polyline[0].points.push({ latitude: this.data.location[j][0], longitude: this.data.location[j][1] })
    }
    var pointsTemp = 'polyline[' + 0 + '].points'
    that.setData({
      [pointsTemp]: that.data.polyline[0].points
    })
    console.log(that.data.polyline[0].points)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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