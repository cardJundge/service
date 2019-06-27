// pages/login/login.js
var test = getApp().globalData.hostName;
Page({
  /**
   * 页面的初始数据
   */
  data: {

    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '添加作业员',
    groupNameArr: [],
    hasGroup: true,
    ownModule: {},
  },
  formSubmit: function (e) {
    console.log(e)
    var that = this;
    if (e.detail.value.trueName == '') {
      that.setData({
        nameErr: true
      })
      return
    }

    if (e.detail.value.truePassword.length > 0 && e.detail.value.truePassword.length < 6) {
      that.setData({
        pswErr: true
      })
      return
    }
    var reg = /^1[345789]\d{9}$/;
    if (reg.test(e.detail.value.mobile)) {
      console.log('ok')
    } else {
      that.setData({
        mobileErr: true
      })
      return
    }
    var taskType;
    var group_id;
    console.log(that.data.groupId)

    if (that.data.hasGroup) {
      taskType = e.detail.value.radio;
      group_id = e.detail.value.groupBy
    } else {
      taskType = 0;
      group_id = ''
    }
    if (that.data.groupId == -1) {
      taskType = 0;
      group_id = ''
    }
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    // if (e.detail.value.checkbox.length == 0) {
    //   that.setData({
    //     checkBoxNull: true
    //   })
    //   return
    // }
    var moudlestr = ''
    for (var t in e.detail.value.checkbox) {
      if (t == e.detail.value.checkbox.length - 1) {
        moudlestr += e.detail.value.checkbox[t]
      } else {
        moudlestr += e.detail.value.checkbox[t] + ','
      }

    }
    console.log(moudlestr)
    console.log(typeof moudlestr)

    that.setData({
      allOver: true
    })
    var arr = e.detail.value.checkbox;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: test + 'service/task/add',
      dataType: 'json',
      method: 'POST',
      data: {
        nickname: e.detail.value.trueName,
        mobile: e.detail.value.mobile,
        password: e.detail.value.truePassword,
        modules: moudlestr,
        type: taskType,
        group_id: group_id,
        job_no: e.detail.value.jobNo,
      },
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
        if (res.data.status == 1) {
          wx.showToast({
            title: '添加成功',
            duration: 500
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          if (res.data.msg = '作业员已存在') {
            that.setData({
              registered: true,
              allOver: false
            })
          }
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
    var that = this;
    if (e.currentTarget.id == 'trueName') {
      that.setData({
        nameErr: false,
        nameWorld: false
      })
    } else if (e.currentTarget.id == 'mobile') {
      that.setData({
        mobileErr: false,
        registered: false
      })
    } else if (e.currentTarget.id == 'truePassword') {
      that.setData({
        pswErr: false
      })
    }
  },
  bindPickerChange: function (e) {
    console.log(e)
    for (var i in this.data.groupList) {
      if (this.data.groupNameArr[e.detail.value] == this.data.groupList[i].name) {
        for (var j in this.data.groupNameArr) {
          if (this.data.groupNameArr[j] == this.data.groupList[i].name) {
            this.setData({
              index1: j
            })
          }
        }
        this.setData({
          groupId: this.data.groupList[i].id
        })
        console.log(this.data.groupId)
      }
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    var that = this;
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
    that.setData({
      serviceType:wx.getStorageSync('type')
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.data.sessionId = wx.getStorageSync('PHPSESSID');
    wx.request({
      url: test + 'service/group/index',
      method: 'GET',
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

        if (res.data.group.length == 0) {
          that.setData({
            hasGroup: false
          })
          return
        }
        for (var i in res.data.group) {
          that.data.groupNameArr.push(res.data.group[i].name)
        }
        that.data.groupNameArr.push('无分组')
        that.setData({
          hasGroup: true,
          groupId: res.data.group[0].id,
          groupNameArr: that.data.groupNameArr,
          groupList: res.data.group,
          index1: 0
        })
        that.data.groupList.push({ id: -1, name: '无分组' })

      },
      complete: function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.userId = wx.getStorageSync('userid');
    this.data.module = wx.getStorageSync('module');
    console.log(this.data.module)
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    var that = this;
    for (var i in that.data.module) {
      if (that.data.module[i] == 1) {
        that.data.ownModule.checkLoss = true
      } else if (that.data.module[i] == 2) {
        that.data.ownModule.push = true
      } else if (that.data.module[i] == 3) {
        that.data.ownModule.trailer = true
      } else if (that.data.module[i] == 4) {
        that.data.ownModule.rescue = true
      } 
    }
    var moduleTemp = that.data.ownModule
    that.setData({
      ownModule: moduleTemp,
      module: that.data.module
    })
    console.log(that.data.ownModule)
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