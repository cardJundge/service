// pages/index/adminPeople/editPeople/editPeople.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '编辑作业员信息',
    groupNameArr: [],
    ownModule: {},
    keywords: '',
    module_id: '',
    peopleDetail: {}
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  onLoad: function (options) {
    this.setData({
      serviceType:wx.getStorageSync('type'),
      opratorId: options.opratorId
    })
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
  },
  onReady: function () {
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
      }
    }
    console.log(this.data.index1)
    console.log(this.data.groupId)
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
    var wordReg = /^[\u4e00-\u9fa5]/
    if (!wordReg.test(e.detail.value.trueName)) {
      that.setData({
        nameWorld: true
      })
      return
    }
    if (e.detail.value.password.length > 0 && e.detail.value.password.length < 6) {
      that.setData({
        pswErr: true
      })
      return
    }
    var reg = /^1[345789]\d{9}$/;
    if (reg.test(e.detail.value.mobile)) {
    } else {
      that.setData({
        mobileErr: true
      })
      return
    }
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    // if (e.detail.value.checkbox.length == 0) {
    //   that.setData({
    //     checkBoxNull: true
    //   })
    //   return
    // }
    var moduleOwn = e.detail.value.checkbox
    if (that.data.module.length==0){
      moduleOwn=''
    }
    that.setData({
      allover: true
    })

    var arr = e.detail.value.checkbox;
    var groupId;
    var type1;
    console.log(that.data.noGroup)
    if (that.data.noGroup) {
      groupId = '',
        type1 = 0
    }
    if (that.data.groupId == -1) {
      groupId = '',
        type1 = 0
    } else {
      groupId = that.data.groupId;
      type1 = e.detail.value.radio
    }
    console.log(type1)
    wx.request({
      url: test + 'service/task/edit',
      dataType: 'json',
      method: 'POST',
      data: {
        id: that.data.opratorId,
        nickname: e.detail.value.trueName,
        mobile: e.detail.value.mobile,
        password: e.detail.value.password,
        modules: moduleOwn,
        group_id: groupId,
        job_no: e.detail.value.jobNo,
        type: type1
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
      },
      success: function (res) {
        console.log(res)
        var dataType = typeof res.data
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
            title: '编辑成功',
            duration: 500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 500)

        } else if (res.data.status == 0){
          if (res.data.msg =='手机号码已存在'){
            wx.showModal({
              title: '该号码已注册',
              content: '',
            })
          }else{
            wx.showModal({
              title: '编辑失败',
              content: '',
            })
          }

       
         that.setData({
           allover:false
         })
        }


      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    wx.request({
      url: test + '/service/task/index',
      method: 'GET',
      data: {
        keywords: that.data.keywords,
        // module_id: that.data.module_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
      },// 默认值
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
          peopleList: res.data.task
        })
        for (var i in res.data.task) {
          if (res.data.task[i].id == that.data.opratorId) {
            that.setData({
              detail: res.data.task[i]
            })
            console.log(that.data.detail)

          }
        }

        //获取分组
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
                groupId: -1,
                noGroup: true
              })
              return

            }
            for (var i in res.data.group) {
              that.data.groupNameArr.push(res.data.group[i].name)
            }
            that.data.groupNameArr.push('无分组')
            that.setData({
              groupId: res.data.group[0].id,
              groupNameArr: that.data.groupNameArr,
              groupList: res.data.group,
              index1: 0
            })
            that.data.groupList.push({ id: -1, name: '无分组' })
            var tempGroup;
            for (var m in res.data.group) {
              if (res.data.group[m].id == that.data.detail.group_id) {
                that.setData({
                  groupId: res.data.group[m].id
                })
                tempGroup = res.data.group[m].name
              }
            }
            for (var n in that.data.groupNameArr) {
              if (that.data.groupNameArr[n] == tempGroup) {
                that.setData({
                  index1: n
                })
              }
            }
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          },
        })
        var peopleDetailname = 'peopleDetail.nickname';
        var peopleDetailmobile = 'peopleDetail.mobile';
        var peopleDetailjob = 'peopleDetail.job_no';
        that.setData({
          [peopleDetailname]: that.data.detail.nickname,
          [peopleDetailmobile]: that.data.detail.mobile,
          [peopleDetailjob]: that.data.detail.job_no,
        })
        var aa = that.data.detail.module
        for (var n in aa) {
          if (aa[n] == 1) {
            var peopleDetailClaims = 'peopleDetail.check'
            that.setData({
              [peopleDetailClaims]: true
            })
          } else if (aa[n] == 2) {
            var peopleDetailMaintain = 'peopleDetail.push'
            that.setData({
              [peopleDetailMaintain]: true
            })
          } else if (aa[n] == 3) {
            var peopleDetailYearly = 'peopleDetail.trailer'
            that.setData({
              [peopleDetailYearly]: true
            })
          } else if (aa[n] == 4) {
            var peopleDetailtrailer = 'peopleDetail.rescue'
            that.setData({
              [peopleDetailtrailer]: true
            })
          }
        }


      }
    })

    this.data.module = wx.getStorageSync('module');
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
      module: this.data.module,
      ownModule: moduleTemp
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
    } else if (e.currentTarget.id == 'jobNo') {
      that.setData({
        jobErr: false
      })
    }


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