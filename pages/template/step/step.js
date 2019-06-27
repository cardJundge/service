// pages/template/step/step.js
var test = getApp().globalData.hostName;
Page({
  data: {
    imgId:0,
  },
  onLoad: function (options) {
    this.setData({
      hostName:test
    })
  }
})