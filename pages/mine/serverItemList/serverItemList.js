// pages/mine/serverItemList/serverItemList.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: '64px',
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '服务项目列表',
    serverList: []
  },
  backPage:function(){
    wx.navigateBack({
      delta:1
    })
  },
  toEdit: function(e) {
    var dataTemp;
    for (let i in this.data.serverList) {
      if (this.data.serverList[i].id == e.currentTarget.id) {
        dataTemp = this.data.serverList[i]
        break
      }
    }
    wx.navigateTo({
      url: './editServerItem/editServerItem?allData=' + JSON.stringify(dataTemp),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.serviceId = wx.getStorageSync('userid')
    this.setData({
      hostName: test
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
  },

  addItem: function() {
    wx.navigateTo({
      url: './addServerItem/addServerItem',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    getServerList(that).then(function() {
      if (that.data.serverList.length != 0) {
        for (let i in that.data.serverList) {
          for (let j in that.data.classfyArr) {
            if (that.data.serverList[i].classify_id == that.data.classfyArr[j].id) {
              that.data.serverList[i].classify_name = that.data.classfyArr[j].name
              break
            }
          }
        }
        that.setData({
          serverList: that.data.serverList
        })
      }
      that.setData({
        loaded: true
      })
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      serverList: this.data.serverList
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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
  deleteServer: function(e) {
    var that = this
    wx.showLoading({
      title: '删除中...',
    })
    wx.request({
      url: test + 'service/project/delete',
      method: 'GET',
      data: {
        id: e.currentTarget.id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
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
        if (res.data.status == 1) {
          wx.showToast({
            title: '删除成功',
          })
          for (var i in that.data.serverList) {
            if (that.data.serverList[i].id == e.currentTarget.id) {
              that.data.serverList.splice(i, 1)
              that.setData({
                serverList: that.data.serverList
              })
              break
            }
          }
        } else {
          wx.showModal({
            title: '请求超时',
            content: '',
          })
        }


      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function getServerList(that) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: test + 'service/project/index',
      method: 'GET',
      data: {
        service_id: that.data.serviceId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
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
        if (res.data.status == 1) {
          if (res.data.data.length == 0) {
            that.setData({
              noDta: true
            })
          } else {
            for (var i in res.data.data) {
              that.data.serverList.push(res.data.data[i])
            }
            that.setData({
              serverList: that.data.serverList
            })
          }

        } else {
          wx.showModal({
            title: '请求超时，请重新登录',
            content: '',
          })
        }
        getClassify(that).then(function() {
          resolve(that)
        })

      }
    })
  })
}

function getClassify(that) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: test + 'service/project/classify',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
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
        that.data.classfyArr = res.data.data
        console.log(that.data.classfyArr)
        resolve(that)
      }
    })
  })
}