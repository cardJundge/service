// pages/index/claimsDetail/claimsDetail.js
var test = getApp().globalData.hostName;
var app = getApp()
var imgId = 0;
var dateNow = "2018-05-18";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '查勘定损详情',
    hasPush: false,
    listArr: [],
    zfdzp1: [],
    zfdzp2: [],
    ckzpp1: [],
    ckzpp2: [],
    ckzpp3: [],
    ckzpp4: [],
    ckzpp5: [],
    ckzpp6: [],
    gydzp1: [],
    gydzp2: [],
    gydzp3: [],
    gydzp4: [],
    gydzp5: [],
    gydzp6: [],
    gydzp7: [],
    gydzp8: [],
    gydzp9: [],
    gydzp10: [],
    detailId: '',
    allImg: [],
    listId: '',
    ss: '',
    reason: false,
    steps: [{
        current: true,
        done: true,
        text: '已接车',
        desc: '2018-10-01 19:30'
      },
      {
        done: false,
        current: false,
        text: '已分配作业人员',
        desc: '2018-10-01 19:00'
      },
      {
        done: false,
        current: false,
        text: '等待审核',
        desc: '2018-10-01 18:00'
      }
    ],
    steps2: [{
        current: false,
        done: true,
        text: '步骤一',
        desc: '10.01'
      },
      {
        done: true,
        current: true,
        text: '步骤二',
        desc: '10.02'
      },
      {
        done: false,
        current: false,
        text: '步骤三',
        desc: '10.03'
      }
    ],
    steps3: [{
        current: false,
        done: true,
        text: '步骤一',
        desc: '10.01'
      },
      {
        done: true,
        current: false,
        text: '步骤二',
        desc: '10.02'
      },
      {
        done: true,
        current: true,
        text: '步骤三',
        desc: '10.03'
      }
    ],
    oprationModal: false,
    modal: [false, false, false, false]
  },
  reasonOpen: function() {
    var j = 0
    var check = 'modal[' + j + ']';
    this.setData({
      [check]: false,
      reason: true
    })

  },
  unpassReason: function(e) {
    var that = this
    this.setData({
      check: false
    })
    console.log(e)
    if (e.detail.value.reason == '') {
      this.setData({
        reasonErr: true
      })
      return
    }
    wx.request({
      url: test + 'service/maintain/audit',
      method: 'POST',
      data: {
        id: that.data.listId,
        status: 1,
        cause: e.detail.value.reason
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
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
        console.log(res)
        that.onReady()
      }
    })
    this.setData({
      reason: false
    })
  },
  cancelClaim: function() {
    this.setData({
      cancelModal: true,
      oprationModal: false
    })

  },
  confirmCancel: function() {
    var that = this
    this.setData({
      cancelModal: false
    })
    console.log(that.data.listId)
    var that = this
    wx.request({
      url: test + 'service/survey/cancel/id/' + that.data.listId,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
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
        if (res.data.status == 1) {
          wx.showToast({
            title: "取消成功"
          })
          that.onReady()
        } else {
          wx.showToast({
            title: "取消失败"
          })
        }
      }
    })
  },
  noCancel: function() {
    this.setData({
      cancelModal: false
    })
  },
  toDelete: function() {
    this.setData({
      deleteMODAL: true,
      oprationModal: false
    })
  },
  confirmDelete: function() {
    var that = this
    wx.request({
      url: test + 'service/survey/delete?id=' + that.data.listId,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
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
        if (res.data.status == 1) {
          wx.showToast({
            title: "删除成功"
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)

        } else {
          wx.showToast({
            title: "删除失败"
          })
        }
      }
    })

    this.setData({
      deleteMODAL: false,
    })
  },
  cancelDeleteModal: function() {
    this.setData({
      deleteMODAL: false,
    })
  },

  link: function(e) {
    var phonenumber = e.currentTarget.dataset.num;
    wx.makePhoneCall({
      phoneNumber: phonenumber //仅为示例，并非真实的电话号码
    })
  },
  toSelectPeople: function() {
    var pageModule = 0
    this.setData({
      oprationModal: false
    })
    console.log(this.data.detail.id)
    wx.navigateTo({
      url: '../../allot/allot?module=' + this.data.detailId + '&&moduleis=1',
    })
  },
  closeOprationModal: function(e) {
    this.setData({
      oprationModal: false
    })
  },
  openImg: function(e) {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.id] // 需要预览的图片http链接列表
    })
  },
  openImg1: function(e) {
    wx.setStorageSync('freshFlag', false)
    var that = this
    var allImgTemp = [];
    for (var j in this.data.allImg) {
      var eachTemp = test + 'uploads/work/' + this.data.allImg[j].path
      allImgTemp.push(eachTemp)

    }
    var picId = e.currentTarget.id;
    console.log(picId)
    for (var i in this.data.allImg) {
      if (this.data.allImg[i].imgId == picId) {
        var a = test + 'uploads/work/' + this.data.allImg[i].path
        console.log(a)
        wx.previewImage({
          current: a, // 当前显示图片的http链接
          urls: allImgTemp // 需要预览的图片http链接列表
        })
        return
      }
    }
  },

  stopBubble: function() {},
  openModal: function() {
    this.setData({
      oprationModal: true
    })
  },
  closeModal: function() {
    this.setData({
      check: false
    })
  },
  checkModal: function() {
    var i = 0
    var check = 'modal[' + 0 + ']';
    this.setData({
      check: true,
      oprationModal: false,
      [check]: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function(options) {
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.model)
        app.globalData.mobileType = res.model
      }
    })
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        titTop: '90px',
        container: 'containerX',
      })
    }
    var that = this
    var bean = options.listId;
    this.setData({
      userType: wx.getStorageSync('type'),
      listId: bean,
      // case_type:options.case_type,
      hostName: test,
      sessionId: wx.getStorageSync('PHPSESSID'),
      userId: wx.getStorageSync('userid')

    })
    var listData = []
    listData.push({
      name: '人车合一',
      class: 'listActive',
      dataName: 'ckzp1'
    })
    listData.push({
      name: '车架号',
      class: 'imgListName',
      dataName: 'ckzp2'
    })
    listData.push({
      name: '环境照片',
      class: 'imgListName',
      dataName: 'ckzp3'
    })
    listData.push({
      name: '验车照片',
      class: 'imgListName',
      dataName: 'ckzp4'
    })
    listData.push({
      name: '车损照片',
      class: 'imgListName',
      dataName: 'ckzp5'
    })
    listData.push({
      name: '旧伤照片',
      class: 'imgListName',
      dataName: 'ckzp6'
    })

    listData.push({
      name: '事故证明',
      class: 'imgListName',
      dataName: 'gydz1'
    })
    listData.push({
      name: '索赔申请书',
      class: 'imgListName',
      dataName: 'gydz2'
    })
    listData.push({
      name: '行驶证',
      class: 'imgListName',
      dataName: 'gydz3'
    })
    listData.push({
      name: '驾驶证',
      class: 'imgListName',
      dataName: 'gydz4'
    })
    listData.push({
      name: '查勘报告',
      class: 'imgListName',
      dataName: 'gydz5'
    })
    listData.push({
      name: '个案签报',
      class: 'imgListName',
      dataName: 'gydz6'
    })
    listData.push({
      name: '拒赔材料',
      class: 'imgListName',
      dataName: 'gydz7'
    })
    listData.push({
      name: '从业资格证',
      class: 'imgListName',
      dataName: 'gydz8'
    })
    listData.push({
      name: '法院判决书',
      class: 'imgListName',
      dataName: 'gydz9'
    })
    listData.push({
      name: '调查单证',
      class: 'imgListName',
      dataName: 'gydz10'
    })

    listData.push({
      name: '收款方账户信息',
      class: 'imgListName',
      dataName: 'zfdz1'
    })
    listData.push({
      name: '收款方身份证明',
      class: 'imgListName',
      dataName: 'zfdz2'
    })
    that.setData({
      listArr: listData
    })

  },
  submitFormId: function() {

  },
  changeView: function(e) {
    var that = this;
    this.setData({
      toView: e.currentTarget.dataset.name
    })
    for (var i in that.data.listArr) {
      if (e.currentTarget.dataset.name == that.data.listArr[i].dataName) {
        var backTemp = 'listArr[' + i + '].class'
        that.setData({
          [backTemp]: 'listActive',
          locationArr: i
        })
      } else {
        var backTemp = 'listArr[' + i + '].class'
        that.setData({
          [backTemp]: 'imgListName'
        })
      }
    }
    for (var j in that.data.moduleArr) {
      if (j == that.data.locationArr) {
        var moduleArrTemp = 'moduleArr[' + j + ']'
        that.setData({
          [moduleArrTemp]: true
        })
      } else {
        var moduleArrTemp = 'moduleArr[' + j + ']'
        that.setData({
          [moduleArrTemp]: false
        })
      }
    }

  },

  onReady: function() {
    wx.setStorageSync('freshFlag', false)
    var moduArr = wx.getStorageSync('module')
    for (var i in moduArr) {
      if (moduArr[i] == 2) {
        this.setData({
          hasPush: true
        })
      }
    }


    var that = this
    that.setData({
      allImg: [],
      zfdzp1: [],
      zfdzp2: [],
      ckzpp1: [],
      ckzpp2: [],
      ckzpp3: [],
      ckzpp4: [],
      ckzpp5: [],
      ckzpp6: [],
      gydzp1: [],
      gydzp2: [],
      gydzp3: [],
      gydzp4: [],
      gydzp5: [],
      gydzp6: [],
      gydzp7: [],
      gydzp8: [],
      gydzp9: [],
      gydzp10: [],
      detail: [],
      oprator: [],
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // this.data.sessionId = wx.getStorageSync('PHPSESSID')
    // this.data.userId = wx.getStorageSync('userid');
    // var userIdArc = this.data.userId;
    // var session_id = this.data.sessionId;
    wx.request({
      url: test + 'service/survey/info',
      method: 'GET',
      data: {
        id: that.data.listId
      },
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
        var insuranceId = res.data.survey.insurance_id
        console.log('保险公司详情id', insuranceId)
        if (insuranceId == 3) {
          that.setData({
            insuredPerson: true,
            caseType: true,
            amountMoney: true,
            jobNo: false
          })
        } else if (insuranceId == 8) {
          that.setData({
            insuredPerson: true,
            caseType: false,
            amountMoney: true,
            jobNo: false
          })
        } else {
          that.setData({
            insuredPerson: true,
            caseType: true,
            amountMoney: true,
            jobNo: true
          })
        }
        that.setData({
          detail: res.data.survey,
          detailId: res.data.survey.id,
          schedule: res.data.schedule,
          // third:res.data.sanze
        })

        that.data.businessType = res.data.survey.type
        wx.request({
          url: test + 'service/index/systemInsurance',
          method: 'GET',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.data.sessionId
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
            for (var i in res.data.insurance) {
              if (that.data.detail.insurance_id == res.data.insurance[i].id) {
                that.setData({
                  insuranceCom: res.data.insurance[i]
                })
              }
            }

          }

        })
        if (that.data.detail.task_id) {
          wx.request({
            url: test + 'service/task/index',
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
              for (var i in res.data.task) {
                if (that.data.detail.task_id == res.data.task[i].id) {
                  that.setData({
                    oprator: res.data.task[i]
                  })
                  var aa = [];
                  var allotTime;
                  var receiveTime;
                  var reachTime;
                  var caseEndTime;
                  for (var i in that.data.schedule) {
                    var tempReg = /已分配作业员/
                    if (tempReg.test(that.data.schedule[i].title)) {
                      that.setData({
                        hasReach: true
                      })
                      var year = that.data.schedule[i].date;
                      var regTime = year.replace(/\-/g, "/");
                      allotTime = new Date(regTime);
                      var month = year.slice(5, 10);
                      var time = year.slice(11)
                      var allotAgain
                      var _has;
                      if (allotAgain == true) {
                        _has = 'has'
                      } else {
                        _has = 'nohas'
                      }
                      aa.unshift({
                        timeDiffer: '',
                        first: _has,
                        color: 'grey',
                        current: true,
                        month: month,
                        time: time,
                        done: true,
                        pic: [],
                        text: that.data.schedule[i].title,
                        desc: ''
                      })
                      that.setData({
                        steps: aa
                      })
                      allotAgain = true
                    }

                    if (that.data.schedule[i].title == '已接单') {
                      var year = that.data.schedule[i].date;
                      var regTime = year.replace(/\-/g, "/");
                      receiveTime = new Date(regTime);
                      var timedec = (receiveTime - allotTime) / 1000
                      var tt = formatSeconds(timedec)

                      var month = year.slice(5, 10);
                      var time = year.slice(11)
                      aa.unshift({
                        timeDiffer: tt,
                        first: 'has',
                        color: 'grey',
                        current: true,
                        month: month,
                        time: time,
                        done: true,
                        pic: [],
                        text: that.data.oprator.nickname + '接单成功',
                        desc: ''
                      })
                      that.setData({
                        steps: aa
                      })
                    }

                    if (that.data.schedule[i].title == '到达现场') {
                      that.setData({
                        hasReach: true
                      })
                      var year = that.data.schedule[i].date;
                      var regTime = year.replace(/\-/g, "/");
                      reachTime = new Date(regTime);
                      var timedec = (reachTime - receiveTime) / 1000
                      var tt = formatSeconds(timedec)

                      var month = year.slice(5, 10);
                      var time = year.slice(11)
                      aa.unshift({
                        timeDiffer: tt,
                        first: 'has',
                        color: 'grey',
                        current: true,
                        month: month,
                        time: time,
                        done: true,
                        pic: [],
                        text: that.data.oprator.nickname + '到达现场',
                        desc: ''
                      })
                      that.setData({
                        steps: aa
                      })
                    }

                    if (that.data.schedule[i].title == '结案') {

                      var year = that.data.schedule[i].date;
                      var regTime = year.replace(/\-/g, "/");
                      caseEndTime = new Date(regTime);
                      var timedec = (caseEndTime - allotTime) / 1000
                      var tt = formatSeconds(timedec)

                      var month = year.slice(5, 10);
                      console.log(month);
                      var time = year.slice(11)
                      console.log(time)
                      aa.unshift({
                        timeDiffer: tt,
                        first: 'has',
                        color: 'blue',
                        current: true,
                        month: month,
                        time: time,
                        done: true,
                        pic: [],
                        text: '案件已结案',
                        desc: ''
                      })

                      that.setData({
                        steps: aa
                      })
                    }
                    var picTemp1;
                    var picTemp2;
                    var allTemp;
                    var picTemp1Data;
                    var resultData;


                    // ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
                    if (that.data.schedule[i].picture.ckzp) {

                      for (var j in that.data.schedule[i].picture.ckzp.p1) {
                        imgId++;

                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.ckzp.p1[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.ckzp.p1[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.ckzp.p1[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.ckzpp1.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          ckzpp1: that.data.ckzpp1
                        })
                      }
                      for (var j in that.data.schedule[i].picture.ckzp.p2) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.ckzp.p2[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.ckzp.p2[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.ckzp.p2[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.ckzpp2.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          ckzpp2: that.data.ckzpp2
                        })
                      }
                      for (var j in that.data.schedule[i].picture.ckzp.p3) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.ckzp.p3[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.ckzp.p3[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.ckzp.p3[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.ckzpp3.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          ckzpp3: that.data.ckzpp3
                        })
                      }
                      for (var j in that.data.schedule[i].picture.ckzp.p4) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.ckzp.p4[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.ckzp.p4[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.ckzp.p4[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.ckzpp4.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          ckzpp4: that.data.ckzpp4
                        })
                      }
                      for (var j in that.data.schedule[i].picture.ckzp.p5) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.ckzp.p5[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.ckzp.p5[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.ckzp.p5[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.ckzpp5.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          ckzpp5: that.data.ckzpp5
                        })
                      }
                      for (var j in that.data.schedule[i].picture.ckzp.p6) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.ckzp.p6[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.ckzp.p6[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.ckzp.p6[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.ckzpp6.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          ckzpp6: that.data.ckzpp6
                        })
                      }
                    }
                    if (that.data.schedule[i].picture.gydz) {
                      for (var j in that.data.schedule[i].picture.gydz.p1) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.gydz.p1[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.gydz.p1[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.gydz.p1[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.gydzp1.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          gydzp1: that.data.gydzp1
                        })
                      }
                      for (var j in that.data.schedule[i].picture.gydz.p2) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.gydz.p2[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.gydz.p2[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.gydz.p2[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.gydzp2.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          gydzp2: that.data.gydzp2
                        })
                      }
                      for (var j in that.data.schedule[i].picture.gydz.p3) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.gydz.p3[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.gydz.p3[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.gydz.p3[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.gydzp3.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          gydzp3: that.data.gydzp3
                        })
                      }
                      for (var j in that.data.schedule[i].picture.gydz.p4) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.gydz.p4[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.gydz.p4[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.gydz.p4[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.gydzp4.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          gydzp4: that.data.gydzp4
                        })
                      }
                      for (var j in that.data.schedule[i].picture.gydz.p5) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.gydz.p5[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.gydz.p5[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.gydz.p5[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.gydzp5.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          gydzp5: that.data.gydzp5
                        })
                      }
                      for (var j in that.data.schedule[i].picture.gydz.p6) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.gydz.p6[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.gydz.p6[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.gydz.p6[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.gydzp6.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          gydzp6: that.data.gydzp6
                        })
                      }
                      for (var j in that.data.schedule[i].picture.gydz.p7) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.gydz.p7[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.gydz.p7[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.gydz.p7[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.gydzp7.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          gydzp7: that.data.gydzp7
                        })
                      }
                      for (var j in that.data.schedule[i].picture.gydz.p8) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.gydz.p8[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.gydz.p8[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.gydz.p8[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.gydzp8.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          gydzp8: that.data.gydzp8
                        })
                      }
                      for (var j in that.data.schedule[i].picture.gydz.p9) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.gydz.p9[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.gydz.p9[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.gydz.p9[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.gydzp9.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          gydzp9: that.data.gydzp9
                        })
                      }
                      for (var j in that.data.schedule[i].picture.gydz.p10) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.gydz.p10[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.gydz.p10[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.gydz.p10[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.gydzp10.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          gydzp10: that.data.gydzp10
                        })
                      }
                    }
                    if (that.data.schedule[i].picture.zfdz) {
                      for (var j in that.data.schedule[i].picture.zfdz.p1) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.zfdz.p1[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.zfdz.p1[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.zfdz.p1[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.zfdzp1.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          zfdzp1: that.data.zfdzp1
                        })
                      }
                      for (var j in that.data.schedule[i].picture.zfdz.p2) {
                        imgId++;
                        console.log(imgId)
                        that.data.allImg.push({
                          path: that.data.schedule[i].picture.zfdz.p2[j],
                          imgId: imgId
                        })
                        picTemp1 = that.data.schedule[i].picture.zfdz.p2[j].substring(0, 11);
                        picTemp2 = that.data.schedule[i].picture.zfdz.p2[j].substring(11);
                        picTemp1Data = picTemp1.substring(0, 10);
                        resultData = CompareDate(dateNow, picTemp1Data)
                        if (resultData) {
                          allTemp = picTemp1 + 'thumb_' + picTemp2
                        } else {
                          allTemp = picTemp1 + picTemp2
                        }
                        that.data.zfdzp2.push({
                          path: allTemp,
                          imgId: imgId
                        })
                        that.setData({
                          zfdzp2: that.data.zfdzp2
                        })
                      }
                    }
                  }
                }
              }

            }
          })

        } else {
          console.log('还没有分配作业员哦')
        }

      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  checkPass: function() {
    var that = this
    this.setData({
      check: false
    })
    wx.request({
      url: test + 'service/survey/audit',
      method: 'POST',
      data: {
        id: that.data.listId,
        status: 2
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
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
        console.log(res)
        that.onReady()
      }
    })

  },
  reasonOpen: function() {
    var j = 0
    var check = 'modal[' + j + ']';
    this.setData({
      [check]: false,
      reason: true
    })

  },
  unpassReason: function(e) {
    var that = this
    this.setData({
      check: false
    })
    console.log(e)
    if (e.detail.value.reason == '') {
      this.setData({
        reasonErr: true
      })
      return
    }
    wx.request({
      url: test + 'service/survey/audit',
      method: 'POST',
      data: {
        id: that.data.listId,
        status: 1,
        cause: e.detail.value.reason
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
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
        console.log(res)
        that.onReady()
      }
    })
    this.setData({
      reason: false
    })
  },
  cancelClaim: function() {
    this.setData({
      cancelModal: true,
      oprationModal: false
    })

  },

  noCancel: function() {
    this.setData({
      cancelModal: false
    })
  },
  toDelete: function() {
    this.setData({
      deleteMODAL: true,
      oprationModal: false
    })
  },

  cancelDeleteModal: function() {
    this.setData({
      deleteMODAL: false,
    })
  },
  toEdit: function() {
    this.setData({
      oprationModal: false
    })
    wx.navigateTo({
      url: '../editcheckLossDeatail/editcheckLossDeatail?module=' + this.data.detailId,
    })
  },
  link: function(e) {
    var phonenumber = e.currentTarget.dataset.num;
    wx.makePhoneCall({
      phoneNumber: phonenumber //仅为示例，并非真实的电话号码
    })
  },

  closeOprationModal: function(e) {
    this.setData({
      oprationModal: false
    })
  },

  stopBubble: function() {},
  // openModal: function () {
  //   this.setData({
  //     oprationModal: true
  //   })
  // },
  closeModal: function() {
    this.setData({
      check: false
    })
  },
  checkModal: function() {
    var i = 0
    var check = 'modal[' + 0 + ']';
    this.setData({
      check: true,
      oprationModal: false,
      [check]: true
    })
  },
  checkPass: function() {
    var that = this
    this.setData({
      check: false
    })
    wx.request({
      url: test + 'service/survey/audit',
      method: 'POST',
      data: {
        id: that.data.listId,
        status: 2
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
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
        console.log(res)
        that.onReady()
      }
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },


  tofix: function() {
    wx.navigateTo({
      url: '../fix/fix?listId=' + this.data.listId + '&&module=9&&survey=' + this.data.detail.report_no,
    })
  },
  onShow: function() {
    var temp = wx.getStorageSync('freshFlag')
    if (temp) {
      this.onReady()
    }
  },

})

function formatSeconds(value) {
  var theTime = parseInt(value); // 秒 
  var theTime1 = 0; // 分 
  var theTime2 = 0; // 小时 
  // alert(theTime); 
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    // alert(theTime1+"-"+theTime); 
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  var result = "" + parseInt(theTime) + "秒";
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  return result;
}

function CompareDate(d1, d2) {

  return ((new Date(d1.replace(/-/g, "\/"))) < (new Date(d2.replace(/-/g, "\/"))));
}