// pages/index/allot/allot.js
var app = getApp()
var wxSortPickerView = require('../allotSort/allotSort.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paddingTop: '228rpx',
    back_cell: 'back_cell',
    titTop: '128rpx',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '分配作业员',
    peopleList: []
  },
  // 返回
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 跳过分配作业员这一步骤
  toSkipAllot: function () {
    wx.request({
      url: app.globalData.hostName + 'service/order/skipTask',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      }, // 默认值
      data: {
        order_id: this.data.orderId
      },
      success: function(res) {
        console.log(res)
        if(res.data.status == 1) {
          wx.redirectTo({
            url: '../../mine/allOder/allOder',
          })
        }
      }
    })
  },
  // 去添加作业人员
  toAddPerson: function () {
    wx.redirectTo({
      url: '../../mine/adminPeople/adminPeople',
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
    console.log('3', options.module)
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        paddingTop: '280rpx',
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        titTop: '180rpx',
        container: 'containerX',
      })
    }
    wx.showLoading({
      title: '载入中...',
    })
    wx.setStorageSync('freshFlag', true)
    this.data.moduleis = options.moduleis
    this.data.special = options.special
    var pageModule = options.module
    this.setData({
      listId: pageModule,
      orderId: options.module
    })
    var that = this
    var test = getApp().globalData.hostName;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    wx.request({
      url: test + 'service/task/index',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id
      }, // 默认值
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
        if (res.data.status == -1) {
          wx.setStorageSync('freshFlag', false)
          that.setData({
            notask: true
          })
          wx.hideLoading()
          return
        }
        for (var i in res.data.task) {
          that.data.peopleList.push(res.data.task[i])
        }
        that.setData({
          peopleList: that.data.peopleList
        })
        console.log(res.data.task)
        if (that.data.moduleis == 100) {
          if (that.data.peopleList.length == 0) {
            wx.setStorageSync('freshFlag', false)
            that.setData({
              notask: true
            })
          } else {
            wxSortPickerView.init(that.data.peopleList, that);
            that.setData({
              pageReady: true,
              loaded: true
            })
          }

          wx.hideLoading()
        } else {
          wx.request({
            url: test + 'service/group/index',
            method: 'GET',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie': 'PHPSESSID=' + that.data.sessionId
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

              that.setData({
                groupList: res.data.group
              })
              console.log(that.data.groupList)

              console.log(that.data.peopleList)
              var mpdulesisplus = parseInt(that.data.moduleis)
              var peopleAttay = []
              console.log(mpdulesisplus)
              for (var i in that.data.peopleList) {
                //console.log(that.data.peopleList[i]) 
                for (var j in that.data.peopleList[i].module) {
                  if (mpdulesisplus == that.data.peopleList[i].module[j]) {
                    var personTempGroupid = 'personTemp[' + i + '].groupId'
                    var personTempid = 'personTemp[' + i + '].id'
                    var personTempnickname = 'personTemp[' + i + '].nickname'
                    var personTempmobile = 'personTemp[' + i + '].mobile'
                    var personTempstatus = 'personTemp[' + i + '].status'
                    var personTempmodule = 'personTemp[' + i + '].module'
                    that.setData({
                      [personTempGroupid]: that.data.peopleList[i].group_id,
                      [personTempid]: that.data.peopleList[i].id,
                      [personTempnickname]: that.data.peopleList[i].nickname,
                      [personTempmobile]: that.data.peopleList[i].mobile,
                      [personTempstatus]: that.data.peopleList[i].status,
                      [personTempmodule]: that.data.peopleList[i].module
                    })
                    console.log(that.data.personTemp[i])
                    peopleAttay.push(that.data.personTemp[i])
                  }

                  //console.log(that.data.moduleis)
                  //console.log(that.data.personTemp[i])
                }
              }
              console.log(that.data.personTemp)
              console.log(peopleAttay)
              if (peopleAttay.length != 0) {
                wxSortPickerView.init(peopleAttay, that);
                wx.hideLoading()
                that.setData({
                  pageReady: true,
                  loaded: true
                })
              } else {
                wx.hideLoading()
                wx.setStorageSync('freshFlag', false)
                that.setData({
                  notask: true
                })
              }
            }
          })
        }
      }
    })
  },

  formSubmit: function(e) {
    console.log('4545e',e)
    var that = this
    if (e.detail.value.task == '') {
      this.setData({
        pNull: true,
      })
      return
    }
    var test = getApp().globalData.hostName;
    this.data.sessionId = wx.getStorageSync('PHPSESSID');
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    var temp = e.detail.value.task.split("&")
    var taskId = temp[0]
    var groupId = temp[1]
    var taskname = temp[2]
    if (groupId == null || groupId == 'null') {
      groupId = 0
    }
    
    if (that.data.moduleis == 100) {
  
      wx.request({
        url: test + 'service/order/orderAllot',
        method: 'GET',
        data: {
          order_id: that.data.listId,
          task_id: taskId,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id
        }, // 默认值
        success: function (res) {
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
          if(res.data.status==1){
            wx.showToast({
              title: '分配成功',
              duration: 1000
            })
            wx.navigateBack({
              delta:1
            })
            
            wx.setStorageSync('orderId', that.data.listId)
            wx.setStorageSync('taskName', taskname)
            return
          }else{
            wx.showModal({
              title: '操作超时',
              content: '',
            })
            return
          }
         
        }
      })
    }else{
      if (that.data.moduleis == 1) {
        var moduleName = 'survey'
      } else if (that.data.moduleis == 2) {
        var moduleName = 'push'
      } else if (that.data.moduleis == 3) {
        var moduleName = 'trailer'
      } else if (that.data.moduleis == 4) {
        var moduleName = 'rescue'
      }

      wx.request({
        url: test + 'service/' + moduleName + '/allot',
        method: 'POST',
        data: {
          id: that.data.listId,
          task_id: taskId,
          group_id: groupId
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id
        }, // 默认值
        success: function (res) {
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
          wx.showToast({
            title: '分配成功',
            duration: 1000
          })
          console.log(res)
        }
      })
      if (that.data.special == 100) {
        wx.navigateBack({
          delta: 2,
        })
        return
      } else {
        wx.navigateBack({
          delta: 1,
        })
      }

    }
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  }
})