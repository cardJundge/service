//index.js
//获取应用实例
var test = getApp().globalData.hostName;
var app = getApp()
var wxSortPickerView = require('../wxSortPickerView/wxSortPickerView.js');
Page({
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    top:'64px',
    marginTop: '114px',
    container: 'container',
    titleTop: '作业员管理',
    opration: false,
    beCarHostAac: false,
    keywords: '',
    module_id: '',
    groupList: [],

  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad:function(){
    this.data.serviceType = wx.getStorageSync('type');
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        top: '90px',
        marginTop:'140px',
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
  },
  onPullDownRefresh: function() {
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },
  toEdit: function() {
    var opratorId = wx.getStorageSync('opratorId')
    wx.navigateTo({
      url: 'editPeople/editPeople?opratorId=' + opratorId,
    })
    this.setData({
      opration: false
    })
  },
  addGroupEve: function() {
    var that = this
    if (!this.data.groupName){
      this.setData({
        groupErr:true
      })
      return
    }
    wx.request({
      url: test + 'service/group/add',
      method: 'post',
      data: {
        name: this.data.groupName
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      }, // 默认值
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
        wx.showToast({
          title: '添加成功',
        })
        that.setData({
          groupName:'',
          addGroupModal: false
        })
      }
    })
  },
  cancelGroupModal: function() {
    this.setData({
      inputShow: false,
      addGroupModal: false
    })
  },
  recordName: function(e) {
    this.setData({
      groupErr:false
    })
    this.data.groupName = e.detail.value
  },
  addGroup: function() {
    this.setData({
      inputShow: true,
      ifGroup: false,
      addGroupModal: true
    })
  },
  toGroup: function() {
    this.setData({
      ifGroup: true
    })
  },
  cancalModal: function() {
    this.setData({
      ifGroup: false
    })
  },
  toEdit1: function() {
    this.setData({
      ifGroup: false
    })
    wx.navigateTo({
      url: 'adminGroup/adminGroup',
    })
  },
  link1: function(e) {
    var opratorId = wx.getStorageSync('opratorId')
    var phonenumber;
    for (var i in this.data.peopleList) {
      if (this.data.peopleList[i].id == opratorId) {
        phonenumber = this.data.peopleList[i].mobile
      }
    }
    this.setData({
      opration: false
    })

    wx.makePhoneCall({
      phoneNumber: phonenumber //仅为示例，并非真实的电话号码
    })
  },
  openOpration: function(e) {
    var that = this;
    that.setData({
      inputShow: true
    })
    var peopleIdTemp = e.currentTarget.id
    that.setData({
      peopleIdTemp: peopleIdTemp
    })
    wx.setStorageSync('opratorId', peopleIdTemp)
    this.setData({
      opration: true,
    })


    wx.request({
      url: test + 'service/task/index',
      method: 'GET',
      data: {
        keywords: that.data.keywords,
        // module_id: that.data.module_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      }, // 默认值
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
        console.log(res)
        if (res.data.status==-1){
          return
        }
        for (var i in res.data.task) {
          if (res.data.task[i].id == peopleIdTemp) {
            that.setData({
              personsta: res.data.task[i].status
            })
          }
        }
      }
    })
  },
  toforbide: function() {
    var that = this;
    this.setData({
      opration: false,
      forbideModal: true
    })
  },
  confirmForbide: function() {
    var that = this
    this.setData({
      opration: false,
      forbideModal: false
    })

    wx.request({
      url: test + 'service/task/able',
      method: 'POST',
      data: {
        id: that.data.peopleIdTemp,
        status: 0
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      }, // 默认值
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
            title: "禁用成功",
            duration: 500
          })
          setTimeout(function() {
            that.onShow()
          }, 500)

        } else {
          wx.showToast({
            title: "禁用失败"
          })
        }
      }
    })


  },
  cancelForbide: function() {
    this.setData({
      forbideModal: false
    })
  },
  toUse: function() {
    this.setData({
      opration: false,
      noforbideModal: true
    })
  },
  cancelnoForbide: function() {
    this.setData({
      noforbideModal: false
    })

  },
  confirmnoForbide: function() {
    var that = this
    this.setData({
      noforbideModal: false
    })


    wx.request({
      url: test + 'service/task/able',
      method: 'POST',
      data: {
        id: that.data.peopleIdTemp,
        status: 1
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      }, // 默认值
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
            title: "启用成功",
            duration: 500
          })
          setTimeout(function() {
            that.onShow()
          }, 500)

        } else {
          wx.showToast({
            title: "启用失败"
          })
        }
      }
    })

  },
  deleteModal: function() {
    this.setData({
      opration: false,
      deleteModalm: true,
    })
  },
  toDeletePeople: function() {
    var that = this
    var opratorId = wx.getStorageSync('opratorId')
    this.setData({
      deleteModalm: false,
    })
    wx.request({
      url: test + 'service/task/delete/id/' + opratorId,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
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
            duration: 1000
          })
          setTimeout(function() {
            that.onShow()
          }, 500)
        }

      }
    })
  },
  cancelSearch:function(e){
    var that=this
    that.setData({
      taskName:'',
      cancelSearchIcon: false,
      personTemp: [],
      peopleList: [],
      pageReady:false
    })
    that.data.keywords =''
    getPeopleList(this)
  },
  toChoose: function(e) {
    var that = this
    if (e.detail.value == '') {
      return
    }
    that.setData({
      pageReady:false,
      cancelSearchIcon:true,
      personTemp:[],
     peopleList:[],
    })
    that.data.keywords = e.detail.value 
    getPeopleList(this)
    // wx.request({
    //   url: test + 'service/base/systemModule',
    //   method: 'GET',
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Cookie': 'PHPSESSID=' + that.data.sessionId
    //   }, // 默认值
    //   success: function(res) {
    //     var dataType = typeof res.data
    //     if (dataType == 'string') {
    //       var jsonStr = res.data;
    //       jsonStr = jsonStr.replace(" ", "");
    //       var temp
    //       if (typeof jsonStr != 'object') {
    //         jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
    //         temp = JSON.parse(jsonStr);
    //         res.data = temp;
    //       }
    //     }
    //     var systemModule = res.data.module
    //     for (var i in systemModule) {
    //       if (systemModule[i].name == e.detail.value) {
    //         that.setData({
    //           module_id: systemModule[i].id
    //         })
    //         that.onShow()
    //         return
    //       }
    //     }
    //     that.setData({
    //       keywords: e.detail.value
    //     })
    //     that.onShow()
    //     return
    //   }
    // })
  },
  cancelModal: function() {
    this.setData({
      deleteModalm: false,
    })
  },
  toAddPeople: function() {
    wx.navigateTo({
      url: './addPeople/addPeople',
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.showLoading({
      title: '载入中',
    })
    that.setData({
      personTemp: [],
      inputShow: false
    })

    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;

    getPeopleList(that)

  },
  closeOprationModal: function() {
    this.setData({
      opration: false,
      inputShow: false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },


  onReady: function() {
    var that = this



  },
  wxSortPickerViewItemTap: function(e) {}
})
function getPeopleList(that){
  wx.request({
    url: test + 'service/task/index',
    method: 'GET',
    data: {
      keywords: that.data.keywords,
      // module_id: that.data.module_id
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'PHPSESSID=' + that.data.sessionId
    }, // 默认值
    success: function (res) {
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
      wx.hideLoading()
      console.log(res)
     
      that.setData({
        pageReady: true
      })
      if(res.data.status==-1){
        return
      }
      if (res.data.status == 2) {
        that.setData({
          noTask: true
        })
        return
      }else{
        that.setData({
          noTask: false
        })
      }
      that.setData({
        peopleList: res.data.task
      })

      wx.request({
        url: test + 'service/group/index',
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + that.data.sessionId
        },
        success: function (res) {
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
        
          that.setData({
            groupList: res.data.group
          })

          for (var i in that.data.peopleList) {
            var rankName;
            console.log(that.data.peopleList[i].nickname)
            if (that.data.peopleList[i].group_id) {
              for (var n in that.data.groupList) {
                if (that.data.peopleList[i].group_id == that.data.groupList[n].id) {
                  console.log(that.data.peopleList[i].type)
                  if (that.data.peopleList[i].type == 1) {

                    rankName = that.data.groupList[n].name + ' ★'
                  } else {
                    rankName = that.data.groupList[n].name + ''
                  }
                }
              }
            } else {
              rankName = ''
            }
            var personTempRank = 'personTemp[' + i + '].rankName'
            var personTempid = 'personTemp[' + i + '].id'
            var personTemptype = 'personTemp[' + i + '].type'
            var personTempstatus = 'personTemp[' + i + '].status'
            var personTempnickname = 'personTemp[' + i + '].nickname'
            var personTempmobile = 'personTemp[' + i + '].mobile'
            that.setData({
              [personTempRank]: rankName,
              [personTemptype]: that.data.peopleList[i].type,
              [personTempid]: that.data.peopleList[i].id,
              [personTempnickname]: that.data.peopleList[i].nickname,
              [personTempmobile]: that.data.peopleList[i].mobile,
              [personTempstatus]: that.data.peopleList[i].status
            })
            that.data.personTemp[i].module = []
            for (var j in that.data.peopleList[i].module) {

              if (that.data.peopleList[i].module[j] == 1) {
                that.data.personTemp[i].module.push('查勘定损')
              } else if (that.data.peopleList[i].module[j] == 2) {
                if (that.data.serviceType == 1 || that.data.serviceType == 11){
                  that.data.personTemp[i].module.push('车辆推修')
                }else{
                  that.data.personTemp[i].module.push('车辆维修')
                }
              } else if (that.data.peopleList[i].module[j] == 3) {

                that.data.personTemp[i].module.push('拖车')
              } else if (that.data.peopleList[i].module[j] == 4) {

                that.data.personTemp[i].module.push('紧急救援')
              } 
            }

          }
          console.log(that.data.peopleList)
          console.log(that.data.personTemp)
          that.setData({
            peopleList: that.data.peopleList,
            personTemp: that.data.personTemp
          })
          wxSortPickerView.init(that.data.personTemp, that);

        },

      })

    }
  })

}