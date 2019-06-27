// pages/index/checkLoss/addcheckLoss/addcheckLoss.js
var test = getApp().globalData.hostName;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '添加查勘定损',
    third_num: -1,
    money: '',
    arrayObject: [],
    array: [],
    index: 0,
    firstPage: true,
    secondPage: false,
    companyed: '',
    choosedCompany: true,
    chooseCompany: false,
    please: false,
    shortInfor: '',
    caseInfor: [{
      numberId: '',
      carId: '',
      casePerson: '',
      casePhone: ''
    }],
  },
  writing: function() {
    this.setData({
      tip: false
    })
  },
  decrease_third: function() {
    if (this.data.third_num == 10) {
      this.setData({
        third_num: -1
      })
    } else if (this.data.third_num == -1) {
      return
    } else {
      this.data.third_num++
        this.setData({
          third_num: this.data.third_num
        })
    }
  },
  addThird: function() {
    if (this.data.third_num == -1) {
      this.setData({
        third_num: 10
      })
    } else if (this.data.third_num == 1) {
      return
    } else {
      this.data.third_num--
        this.setData({
          third_num: this.data.third_num
        })
    }


  },
  tosecondPagere: function() {
    var that = this
    this.setData({
      secondPage: true,
      firstPage: false
    })

    wx.request({
      url: test + 'service/index/systemInsurance',
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
          that.setData({
            arrayObject: res.data.insurance,
            array: []
          })
          for (var i in that.data.arrayObject) {
            that.data.array.push(that.data.arrayObject[i].name)
          }
          that.setData({
            index1: 0,
            array: that.data.array,
            insuranceId: that.data.arrayObject[0].id
          })
        }
      }
    })



  },
  onLoad: function(options) {
    this.data.serviceId = parseInt(wx.getStorageSync('userid'))
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    if (this.data.serviceId == 3813) {
      this.setData({
        hasMoney: true
      })
    }
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }

  },
  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  toAllotP: function() {
    wx.navigateTo({
      url: '../../allot/allot?special=100&&module=' + this.data.detailId + '&moduleis=1',
    })
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  submitCheck: function(e) {
    var that = this
    var temp_third = [];
    if (that.data.third_num == -1) {

    } else {

      if (e.detail.value.car1 || e.detail.value.mobile1) {
        temp_third.push({
          phone: e.detail.value.mobile1,
          car_no: e.detail.value.car1
        })
      }
      if (e.detail.value.car2 || e.detail.value.mobile2) {
        temp_third.push({
          phone: e.detail.value.mobile2,
          car_no: e.detail.value.car2
        })
      }
      if (e.detail.value.car3 || e.detail.value.mobile3) {
        temp_third.push({
          phone: e.detail.value.mobile3,
          car_no: e.detail.value.car3
        })
      }
      if (e.detail.value.car4 || e.detail.value.mobile4) {
        temp_third.push({
          phone: e.detail.value.mobile4,
          car_no: e.detail.value.car4
        })
      }
      if (e.detail.value.car5 || e.detail.value.mobile5) {
        temp_third.push({
          phone: e.detail.value.mobile5,
          car_no: e.detail.value.car5
        })
      }
      if (e.detail.value.car6 || e.detail.value.mobile6) {
        temp_third.push({
          phone: e.detail.value.mobile6,
          car_no: e.detail.value.car6
        })
      }
      if (e.detail.value.car7 || e.detail.value.mobile7) {
        temp_third.push({
          phone: e.detail.value.mobile7,
          car_no: e.detail.value.car7
        })
      }
      if (e.detail.value.car8 || e.detail.value.mobile8) {
        temp_third.push({
          phone: e.detail.value.mobile8,
          car_no: e.detail.value.car8
        })
      }
      if (e.detail.value.car9 || e.detail.value.mobile9) {
        temp_third.push({
          phone: e.detail.value.mobile9,
          car_no: e.detail.value.car9
        })
      }
      if (e.detail.value.car10 || e.detail.value.mobile10) {
        temp_third.push({
          phone: e.detail.value.mobile10,
          car_no: e.detail.value.car10
        })
      }


      temp_third = JSON.stringify(temp_third);

    }


    if (e.detail.value.report_no == '') {
      that.setData({
        report_noErr: true
      })
      return
    }
    if (e.detail.value.carId == '') {

    } else {

    }


    if (e.detail.value.casePerson == '') {
      that.setData({
        casePersonErr: true
      })
      return
    }
    if (e.detail.value.caseMobile == '') {
      that.setData({
        caseMobileErr: true
      })
      return
    }
    var moneyTemp = 0
    if (this.data.serviceId == 3813) {
      if (e.detail.value.money == '') {
        that.setData({
          moneyErr: true
        })
        return
      } else {
        if (e.detail.value.money < 1000) {
          that.setData({
            moneyErr: true
          })
          return
        } else {
          moneyTemp = e.detail.value.money
        }
      }
    } else {
      moneyTemp = 0
    }
    // var reg = /^1[3456789]\d{9}$/;
    // if (reg.test(e.detail.value.caseMobile)) {
    // } else {
    //   that.setData({
    //     caseMobileErr: true
    //   })
    //   return
    // }

    wx.showLoading({
      title: '添加中...',
    })
    that.setData({
      allOver: true
    })


    var test = getApp().globalData.hostName;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = that.data.userId;
    var session_id = that.data.sessionId;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: test + 'service/survey/add',
      method: 'POST',
      data: {
        insurance_id: that.data.insuranceId,
        type: e.detail.value.classify,
        report_no: e.detail.value.report_no,
        car_no: e.detail.value.carId,
        recognizee: e.detail.value.casePerson,
        mobile: e.detail.value.caseMobile,
        remark: that.data.shortInfor1 ? that.data.shortInfor1 : '',
        money: moneyTemp,
        sanze: temp_third
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
          wx.redirectTo({
            url: '../../allot/allot?module=' + res.data.id + '&&moduleis=1',
          })
          wx.hideLoading()
        } else if (res.data.msg == '金豆余额不足') {
          wx.showModal({
            title: '金豆余额不足',
            content: '',
          })
          that.setData({
            allOver: false
          })
          wx.hideLoading()
        } else {
          wx.hideLoading()
          that.setData({
            allOver: false
          })
          wx.showToast({
            title: "操作超时"
          })
        }


      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })



  },

  cancelRed: function(e) {
    var that = this;
    if (e.currentTarget.id == 'casePerson') {
      that.setData({
        casePersonErr: false
      })
    } else if (e.currentTarget.id == 'report_no') {
      that.setData({
        report_noErr: false
      })
    } else if (e.currentTarget.id == 'carId') {
      that.setData({
        carIdErr: false
      })
    } else if (e.currentTarget.id == 'caseMobile') {
      that.setData({
        caseMobileErr: false
      })
    } else if (e.currentTarget.id == 'money') {
      that.setData({
        moneyErr: false
      })
    }

  },
  bindPickerChange: function(e) {
    var that = this
    for (var i in that.data.arrayObject) {
      if (that.data.arrayObject[i].name == that.data.array[e.detail.value]) {
        that.setData({
          insuranceId: that.data.arrayObject[i].id
        })
      }
    }
    that.setData({
      index1: e.detail.value
    })

  },

  onShow: function() {
    var that = this

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
    this.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
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

  },

  analyze: function(e) {
    var that = this;
    if (e.detail.value.infor == '') {
      that.setData({
        tip: true
      })
      return
    }
    that.setData({
      shortInfor1: e.detail.value.infor
    })

    e.detail.value.infor += '【永安保险】'


    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    wx.request({
      url: test + 'service/index/systemInsurance',
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
          that.setData({
            arrayObject: res.data.insurance,
            array: []
          })


          for (var i in that.data.arrayObject) {
            that.data.array.push(that.data.arrayObject[i].name)
          }

          that.setData({
            array: that.data.array
          })


          var regg = /【[\u4e00-\u9fa5]{2,}】/
          if (e.detail.value.infor.match(regg)) {
            var companySpecial = e.detail.value.infor.match(regg)[0]
            var companyNameReg = /[\u4e00-\u9fa5]{2,}/
            if (companySpecial.match(companyNameReg)[0]) {
              var shortInforData = e.detail.value.infor
              that.setData({
                companyed: companySpecial.match(companyNameReg)[0],

              })
              if (that.data.companyed == '平安产险') {
                that.data.companyed = '中国平安'
              }
              for (var j in that.data.arrayObject) {
                if (that.data.arrayObject[j].name == that.data.companyed) {
                  var aa = that.data.arrayObject[j].id
                  that.setData({
                    insuranceId: aa
                  })
                  for (var t in that.data.array) {
                    if (that.data.array[t] == that.data.companyed) {
                      that.setData({
                        index1: t
                      })
                    }
                  }
                }
              }
            } else {
              that.setData({
                companyed: '其他',
                shortInfor1: shortInforData,
              })
            }
          } else {
            var shortInforData = e.detail.value.infor
            that.setData({
              shortInfor1: shortInforData,
            })

          }

          var carPatt = /[\u4E00-\u9FA5]{1}[A-Z0-9]{6}|[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}|[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}|[A-Z]{2}[0-9]{5}|(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}/i;
          if (that.data.companyed == '鼎和保险') {
            var patt1 = /报案号(\d+).(\d+)/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var pattNum = /(\d+).(\d+)/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
              } else {
                var caseNum = []
                caseNum[0] = ''
              }
            } else {
              var caseNum = [];
              caseNum[0] = ''
            }
            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
            }

            var pPatt = /被保险人[\u4e00-\u9fa5]{2,}/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              var temp = pCont[0].slice(4)
              var trueName = []
              trueName[0] = temp
            } else {
              var trueName = []
              trueName[0] = ''
            }

            var mobileReg = /联系人[\u4e00-\u9fa5]{2,}1[345789]\d{9}/
            if (shortInforData.match(mobileReg)) {
              var temp = shortInforData.match(mobileReg)
              var tempReg = /1[345789]\d{9}/
              if (temp[0].match(tempReg)) {
                var mobile = temp[0].match(tempReg)
              } else {
                var mobile = []
                mobile[0] = ''
              }
            } else {
              var mobile = []
              mobile[0] = ''
            }



          } else if (that.data.companyed == '中华保险') {
            var patt1 = /报案号\d+/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var pattNum = /\d+/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
              } else {
                var caseNum = []
                caseNum[0] = ''
              }
            } else {
              var caseNum = []
              caseNum[0] = ''
            }



            if (shortInforData.match(carPatt)) {
              var carNum = shortInforData.match(carPatt);
            } else {
              var carNum = []
              carNum[0] = ''
            }
            var pPatt = /[\u4e00-\u9fa5]{2,}\d{11}/i;
            if (shortInforData.match(pPatt)) {
              var peopleTemp = shortInforData.match(pPatt)
              var peopleNameReg = /[\u4e00-\u9fa5]+/
              if (peopleTemp[0].match(peopleNameReg)) {
                var trueName = peopleTemp[0].match(peopleNameReg)

              } else {
                var trueName = [];
                trueName[0] = '';
              }

            } else {
              var trueName = [];
              trueName[0] = '';
            }
            var mobileReg = /\d{11}/
            if (shortInforData.match(mobileReg)) {

              var mobile1 = shortInforData.match(mobileReg)
              var mobileReg1 = /\d{11}/
              if (mobile1[0].match(mobileReg1)) {
                var mobile = mobile1[0].match(mobileReg1)
              } else {
                var mobile = [];
                mobile[0] = ''
              }
            } else {
              var mobile = [];
              mobile[0] = ''
            }


            that.setData({
              index: 1
            })
          } else if (that.data.companyed == '渤海财险') {
            that.data.companyed = '渤海'
            that.setData({
              companyed: '渤海'
            })
            var patt1 = /报案号.\d+/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var pattNum = /\d+/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);

              } else {
                var caseNum = []
                caseNum[0] = '';

              }
            } else {
              var caseNum = []
              caseNum[0] = '';
            }



            if (shortInforData.match(carPatt)) {
              var carNum = shortInforData.match(carPatt);

            } else {
              var carNum = []
              carNum[0] = ''
            }

            var pPatt = /被保人[\u4e00-\u9fa5]+/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              var test = pCont[0].slice(3)

              //被保人XXX
              var trueName = []
              trueName[0] = test
            } else {
              var trueName = []
              trueName[0] = ''
            }
            var mobileReg = /.\b(\d{11}).\b/
            if (shortInforData.match(mobileReg)) {
              var temp = shortInforData.match(mobileReg)
              var tempReg = /\d{11}/
              if (temp[0].match(tempReg)) {
                var mobile = temp[0].match(tempReg)

              } else {
                var mobile = [];
                mobile[0] = ''
              }
            } else {
              var mobile = [];
              mobile[0] = ''
            }
          } else if (that.data.companyed == '中煤保险') {

            var patt1 = /报案号.\d+/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var pattNum = /\d+/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
              } else {
                var caseNum = []
                caseNum[0] = ''
              }
            } else {
              var caseNum = []
              caseNum[0] = ''
            }
            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
            }
            var pPatt = /被保险人.[\u4e00-\u9fa5]+/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              var pfPatt = /.[\u4e00-\u9fa5]+$/
              if (pCont[0].match(pfPatt)) {
                var personNum = pCont[0].match(pfPatt);
                var truePat = /[\u4e00-\u9fa5]+/;
                if (personNum[0].match(truePat)) {
                  var trueName = personNum[0].match(truePat)
                } else {
                  var trueName = []
                  trueName[0] = ''
                }
              } else {
                var trueName = []
                trueName[0] = ''
              }
            } else {
              var trueName = []
              trueName[0] = ''
            }
            var mobilePatt = /报案电话.\d+/i;
            if (shortInforData.match(mobilePatt)) {
              var mobileCont = shortInforData.match(mobilePatt);
              var mpbilePattc = /\d+/
              if (mobileCont[0].match(mpbilePattc)) {
                var mobile = mobileCont[0].match(mpbilePattc);
              } else {
                var mobile = []
                mobile[0] = ''
              }
            } else {
              var mobile = []
              mobile[0] = ''
            }
          } else if (that.data.companyed == '中国太平') {

            var patt1 = /.支付宝.\d+.\d+/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var caseNum = []
              caseNum[0] = caseCont[0].slice(5)

            } else {
              var caseNum = []
              caseNum[0] = ''
            }

            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
            }

            var pPatt = /一般客户.[\u4e00-\u9fa5]+./i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              pCont[0] = pCont[0].slice(5)
              var chinesePat = /[\u4e00-\u9fa5]+/
              if (pCont[0].match(chinesePat)) {
                var trueName = []
                trueName[0] = pCont[0].match(chinesePat)[0]
              } else {
                var trueName = []
                trueName[0] = ''
              }

            } else {
              var trueName = []
              trueName[0] = ''
            }
            var mobilePatt = /1[3|4|5|8][0-9]\d{4,8}/i;
            if (shortInforData.match(mobilePatt)) {
              var mobileCont = shortInforData.match(mobilePatt);
              var mpbilePattc = /\d+/
              if (mobileCont[0].match(mpbilePattc)) {
                var mobile = mobileCont[0].match(mpbilePattc);
              } else {
                var mobile = []
                mobile[0] = ''
              }
            } else {
              var mobile = []
              mobile[0] = ''
            }
          } else if (that.data.companyed == '中国平安' || that.data.companyed == '平安产险') {
            that.data.companyed = '中国平安'
            shortInforData = shortInforData.replace('【中国平安】', '')
            if (shortInforData[0] == '直') {
              var patt1 = /%(\w+)-(\w+)/i;
              if (shortInforData.match(patt1)) {
                var caseNum = shortInforData.match(patt1);
                caseNum[0] = caseNum[0].slice(1)
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }

              var pPatt = /被.[\u4e00-\u9fa5]{2,3}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                var trueNameTemp = pCont[0].slice(2)
                var trueName = []
                trueName[0] = trueNameTemp
              } else {
                var trueName = []
                trueName[0] = ''
              }
              var reCar = /.[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}.[出险地点|派工地点]/
              if (shortInforData.match(reCar)) {
                var pCont = shortInforData.match(reCar);
                var car_reg2 = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}/
                if (pCont[0].match(car_reg2)) {
                  var carNum = pCont[0].match(car_reg2);
                } else {
                  var carNum = []
                  carNum[0] = ''
                }

              } else {
                var reCar = /.[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}..出险地点/
                if (shortInforData.match(reCar)) {
                  var temp1 = shortInforData.match(reCar)[0].slice(1, 4)

                  var carNum = []
                  carNum[0] = temp1
                } else {
                  var carNum = []
                  carNum[0] = ''
                }

              }
            } else if (shortInforData[0] == '三') {
              var patt1 = /报案号(\d+)/i;
              if (shortInforData.match(patt1)) {
                var caseNum = shortInforData.match(patt1);
                caseNum[0] = caseNum[0].slice(3)
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }
              var pPatt = /联系人.[\u4e00-\u9fa5]{2,3}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                var trueNameTemp = pCont[0].slice(4)
                var trueName = []
                trueName[0] = trueNameTemp
              } else {
                var trueName = []
                trueName[0] = ''
              }
              var reCar = /车牌(\S*).品牌/
              if (shortInforData.match(reCar)) {
                var carNum = shortInforData.match(reCar)
                carNum[0] = carNum[0].replace('-', '')
                carNum[0] = carNum[0].replace('，品牌', '')
                carNum[0] = carNum[0].slice(2)
              } else {
                var carNum = []
                carNum[0] = ''
              }
            } else if (shortInforData[0] == '返') {
              var patt1 = /%(\w+)-(\w+)/i;
              if (shortInforData.match(patt1)) {

                var caseNum = shortInforData.match(patt1);

                caseNum[0] = caseNum[0].replace('%', '')
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }

              var pPatt = /客户[\u4e00-\u9fa5]{2,}./i;
              if (shortInforData.match(pPatt)) {
                var shortInforData1 = shortInforData.replace(/\s*/g, "");
                var pCont = shortInforData1.match(pPatt);
                var temp = pCont[0].slice(2)
                var chinese = /[\u4e00-\u9fa5]{2,}/
                if (temp.match(chinese)) {
                  var trueName = temp.match(chinese)
                } else {
                  var trueName = []
                  trueName[0] = ''
                }
              } else {
                var trueName = []
                trueName[0] = ''
              }

              var carPatt1 = /车牌(\S*)品牌/;
              if (shortInforData.match(carPatt1)) {
                var carCont = shortInforData.match(carPatt1);
                carCont[0] = carCont[0].replace('-', '')
                var carPatt2 = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;
                if (carCont[0].match(carPatt2)) {
                  var carNum = carCont[0].match(carPatt2)

                } else {
                  var carPatt3 = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}.)/i;
                  if (carCont[0].match(carPatt3)) {
                    var carNum = carCont[0].match(carPatt3)
                  } else {
                    var carNum = []
                    carNum[0] = ''
                  }


                }
              } else {
                var carNum = []
                carNum[0] = ''
              }

            } else if (shortInforData[0] == '送') {
              var patt1 = /%(\w+)-(\w+)/i;
              if (shortInforData.match(patt1)) {

                var caseNum = shortInforData.match(patt1);

                caseNum[0] = caseNum[0].replace('%', '')
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }

              var pPatt = /客户.[\u4e00-\u9fa5]{2,}./i;
              if (shortInforData.match(pPatt)) {
                var shortInforData1 = shortInforData.replace(/\s*/g, "");
                var pCont = shortInforData1.match(pPatt);
                var temp = pCont[0].slice(3)
                var chinese = /[\u4e00-\u9fa5]{2,}/
                if (temp.match(chinese)) {
                  var trueName = temp.match(chinese)
                } else {
                  var trueName = []
                  trueName[0] = ''
                }
              } else {
                var trueName = []
                trueName[0] = ''
              }

              var carPatt1 = /车牌(\S*)品牌/;
              if (shortInforData.match(carPatt1)) {
                var carCont = shortInforData.match(carPatt1);
                carCont[0] = carCont[0].replace('-', '')
                var carPatt2 = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;
                if (carCont[0].match(carPatt2)) {
                  var carNum = carCont[0].match(carPatt2)

                } else {
                  var carPatt3 = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}.)/i;
                  if (carCont[0].match(carPatt3)) {
                    var carNum = carCont[0].match(carPatt3)
                  } else {
                    var carNum = []
                    carNum[0] = ''
                  }


                }
              } else {
                var carNum = []
                carNum[0] = ''
              }

            } else {
              var patt1 = /%(\w+)-(\w+)/i;
              if (shortInforData.match(patt1)) {

                var caseNum = shortInforData.match(patt1);

                caseNum[0] = caseNum[0].replace('%', '')
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }

              var pPatt = /被保险人(\S*)./i;
              if (shortInforData.match(pPatt)) {
                var shortInforData1 = shortInforData.replace(/\s*/g, "");
                var pCont = shortInforData1.match(pPatt);
                var trueNameTemp = pCont[0].slice(4)
                trueNameTemp = trueNameTemp.replace('价值客户', '')
                trueNameTemp = trueNameTemp.replace('正价值客户', '')
                trueNameTemp = trueNameTemp.replace('综合金融客户', '')
                trueNameTemp = trueNameTemp.replace('VIP', '')
                trueNameTemp = trueNameTemp.replace('信用卡预筛选优质客户', '')
                trueNameTemp = trueNameTemp.replace('黄金', '')
                var regTemp = /[\u4e00-\u9fa5]+/

                var trueNameTemp1 = trueNameTemp.slice(0, 3).match(regTemp)
                if (trueNameTemp.slice(0, 3).match(regTemp)) {
                  var trueName = []
                  trueName[0] = trueNameTemp1[0]
                } else {
                  var trueName = []
                  trueName[0] = trueNameTemp.slice(0, 3)
                }

              } else {
                var trueName = []
                trueName[0] = ''
              }

              shortInforData = shortInforData.replace('-', '')

              var carWord = /车/;
              if (shortInforData.match(carWord)) {
                shortInforData = shortInforData.slice(shortInforData.match(carWord).index)
                var carPatt1 = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}/i;
                if (shortInforData.match(carPatt1)) {
                  var carCont = shortInforData.match(carPatt1);
                  carCont[0] = carCont[0].replace('-', '')
                  var carNum = []
                  carNum[0] = carCont[0]

                } else {
                  var carNum = []
                  carNum[0] = ''
                }
              } else {
                var carNum = []
                carNum[0] = ''
              }

            }

            var mobilePatt = /1[3456789]\d{9}/;
            var mobilePatt1 = /驾.[\u4e00-\u9fa5]{2,3}\d+/;
            var mobilePatt2 = /联系人.[\u4e00-\u9fa5]{2,3}\d+/;
            var mobilePatt3 = /联系人.[\u4e00-\u9fa5]{2,3}.\d+/;
            var mobilePatt4 = /客户联系电话\d+/;
            if (shortInforData.match(mobilePatt2)) {
              var numReg = /[0-9]{1,}/
              if (shortInforData.match(mobilePatt2)[0].match(numReg)) {
                var mobile = shortInforData.match(mobilePatt2)[0].match(numReg)
              } else {
                var mobile = shortInforData.match(mobilePatt)
                mobile[0] = ''
              }
            } else if (shortInforData.match(mobilePatt3)) {
              var numReg = /[0-9]{1,}/
              if (shortInforData.match(mobilePatt3)[0].match(numReg)) {
                var mobile = shortInforData.match(mobilePatt3)[0].match(numReg)
              } else {
                var mobile = shortInforData.match(mobilePatt)
                mobile[0] = ''
              }

            } else if (shortInforData.match(mobilePatt1)) {
              var numReg = /[0-9]{1,}/
              var temp = shortInforData.match(mobilePatt1)[0]
              if (temp.match(numReg)) {
                var mobile = shortInforData.match(mobilePatt1)[0].match(numReg)
              } else {
                var mobile = [];
                mobile[0] = ''
              }
            } else if (shortInforData.match(mobilePatt)) {
              var mobile = shortInforData.match(mobilePatt)
            } else if (shortInforData.match(mobilePatt4)) {
              var numReg = /[0-9]{1,}/
              if (shortInforData.match(mobilePatt4)[0].match(numReg)) {
                var mobile = shortInforData.match(mobilePatt4)[0].match(numReg)
              } else {
                var mobile = shortInforData.match(mobilePatt)
                mobile[0] = ''
              }

            } else {
              var mobile = [];
              mobile[0] = ''
            }
          } else if (that.data.companyed == '永安保险') {
            var patt1 = /(\d){13,}/i;
            if (shortInforData.match(patt1)) {
              var patt2 = /(\d+)/i;
              if (shortInforData.match(patt1)[0].match(patt2)) {
                var caseNum = shortInforData.match(patt1)[0].match(patt2)
              } else {
                var caseNum = []
                caseNum[0] = ''
              }
            } else {
              var caseNum = []
              caseNum[0] = ''
            }

            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
            }

            var namePhoneReg = /[\u4e00-\u9fa5]{2,}1[345789]\d{9}/
            if (shortInforData.match(namePhoneReg)) {
              var nameReg = /[\u4e00-\u9fa5]{2,}/
              if (shortInforData.match(namePhoneReg)[0].match(nameReg)) {
                var trueName = shortInforData.match(namePhoneReg)[0].match(nameReg)
              } else {
                var trueName = []
                trueName[0] = ''
              }
              var phoneReg = /1[345789]\d{9}/
              if (shortInforData.match(namePhoneReg)[0].match(phoneReg)) {
                var mobile = shortInforData.match(namePhoneReg)[0].match(phoneReg)
              } else {
                var mobile = []
                mobile[0] = ''
              }


            } else {
              var trueName = []
              var mobile = []
              trueName[0] = ''
              mobile[0] = ''
            }
          } else if (that.data.companyed == '中银保险') {

            var lossreg = /定损/
            if (shortInforData.match(lossreg)) {
              that.setData({
                ifLoss: true
              })
              var patt1 = /(\d+)/i;
              if (shortInforData.match(patt1)) {
                var caseCont = shortInforData.match(patt1);
                var pattNum = /(\d+).(\d+)/
                if (caseCont[0].match(pattNum)) {
                  var caseNum = caseCont[0].match(pattNum);
                } else {
                  var caseNum = []
                  caseNum[0] = ''
                }
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }
              var carPattchina = /牌照./i
              if (shortInforData.match(carPattchina)) {
                var temp = shortInforData.slice(shortInforData.match(carPattchina).index + 3, shortInforData.match(carPattchina).index + 10)
                temp = temp.replace('，', '')
                var carNum = []
                if (temp[0] == '新') {
                  carNum[0] = '新车未上牌'
                } else {
                  carNum[0] = temp
                }
              } else {
                var carNum = []
                carNum[0] = ''
              }
              var pPatt = /.[\u4e00-\u9fa5]{2,}.1[345789]\d{9}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                pCont[0] = pCont[0].replace('，', '')
                var chineReg = /[\u4e00-\u9fa5]{2,}/
                if (pCont[0].match(chineReg)) {
                  var trueName = []
                  trueName[0] = pCont[0].match(chineReg)[0]
                } else {
                  var trueName = []
                  trueName[0] = ''
                }

              } else {
                var trueName = []
                trueName[0] = ''
              }

              var mobileReg = /.[\u4e00-\u9fa5]{2,}.1[345789]\d{9}/i;
              if (shortInforData.match(mobileReg)) {
                var temp = shortInforData.match(mobileReg)
                var tempReg = /1[345789]\d{9}/
                if (temp[0].match(tempReg)) {
                  var mobile = temp[0].match(tempReg)
                } else {
                  var mobile = []
                  mobile[0] = ''
                }
              } else {
                var mobile = []
                mobile[0] = ''
              }

            } else {
              var patt1 = /报案号.(\d+)/i;
              if (shortInforData.match(patt1)) {
                var caseCont = shortInforData.match(patt1);
                var pattNum = /(\d+).(\d+)/
                if (caseCont[0].match(pattNum)) {
                  var caseNum = caseCont[0].match(pattNum);
                } else {
                  var caseNum = []
                  caseNum[0] = ''
                }
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }
              var carPattchina = /牌照./i

              if (shortInforData.match(carPattchina)) {
                var temp = shortInforData.slice(shortInforData.match(carPattchina).index + 3, shortInforData.match(carPattchina).index + 10)
                temp = temp.replace('，', '')
                var carNum = []
                if (temp[0] == '新') {
                  carNum[0] = '新车未上牌'
                } else {
                  carNum[0] = temp
                }
              } else {
                var carNum = []
                carNum[0] = ''
              }
              var pPatt = /被保人.[\u4e00-\u9fa5]{2,}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                var temp = pCont[0].slice(4)
                var trueName = []
                trueName[0] = temp
              } else {
                var trueName = []
                trueName[0] = ''
              }

              var mobileReg = /联系人.[\u4e00-\u9fa5]{2,}.1[345789]\d{9}/
              if (shortInforData.match(mobileReg)) {
                var temp = shortInforData.match(mobileReg)
                var tempReg = /1[345789]\d{9}/
                if (temp[0].match(tempReg)) {
                  var mobile = temp[0].match(tempReg)
                } else {
                  var mobile = []
                  mobile[0] = ''
                }
              } else {
                var mobile = []
                mobile[0] = ''
              }

            }

          } else if (that.data.companyed == '天安财险') {

            var lossreg = /定损/
            if (shortInforData.match(lossreg)) {
              that.setData({
                ifLoss: true
              })
              var patt1 = /报案号.(\d+)/i;
              if (shortInforData.match(patt1)) {
                var caseCont = shortInforData.match(patt1);
                var pattNum = /(\d+).(\d+)/
                if (caseCont[0].match(pattNum)) {
                  var caseNum = caseCont[0].match(pattNum);
                } else {
                  var caseNum = []
                  caseNum[0] = ''
                }
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }
              var carPattchina = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;
              if (shortInforData.match(carPattchina)) {
                var carNum = shortInforData.match(carPattchina)
              } else {
                var carNum = []
                carNum[0] = ''
              }
              var pPatt = /被保险人[\u4e00-\u9fa5]{2,}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                pCont[0] = pCont[0].slice(4)
                var trueName = []
                trueName[0] = pCont[0] 
             
              } else {
                var trueName = []
                trueName[0] = ''
              }
              var mobileReg = /.[\u4e00-\u9fa5]{2,}.1[345789]\d{9}/i;
              if (shortInforData.match(mobileReg)) {
                var temp = shortInforData.match(mobileReg)
                var tempReg = /1[345789]\d{9}/
                if (temp[0].match(tempReg)) {
                  var mobile = temp[0].match(tempReg)
                } else {
                  var mobile = []
                  mobile[0] = ''
                }
              } else {
                var mobile = []
                mobile[0] = ''
              }

            } else {
              var patt1 = /报案号.(\d+)/i;
              if (shortInforData.match(patt1)) {
                var caseCont = shortInforData.match(patt1);
                var pattNum = /(\d+).(\d+)/
                if (caseCont[0].match(pattNum)) {
                  var caseNum = caseCont[0].match(pattNum);
                } else {
                  var caseNum = []
                  caseNum[0] = ''
                }
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }
              var carPattchina = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;
              if (shortInforData.match(carPattchina)) {
                var carNum = shortInforData.match(carPattchina)
              } else {
                var carNum = []
                carNum[0] = ''
              }
              var pPatt = /被保险人[\u4e00-\u9fa5]{2,}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                var temp = pCont[0].slice(4)
                var trueName = []
                trueName[0] = temp
              } else {
                var trueName = []
                trueName[0] = ''
              }

              var mobileReg = /[\u4e00-\u9fa5]{2,}1[345789]\d{9}/i
              if (shortInforData.match(mobileReg)) {
                var temp = shortInforData.match(mobileReg)
                var tempReg = /1[345789]\d{9}/
                if (temp[0].match(tempReg)) {
                  var mobile = temp[0].match(tempReg)
                } else {
                  var mobile = []
                  mobile[0] = ''
                }
              } else {
                var mobile = []
                mobile[0] = ''
              }

            }

          } else {
            that.setData({
              cannot: true,
              hh: true,
              index1: 0,

            })
            for (var y in that.data.arrayObject) {
              if (that.data.array[0] == that.data.arrayObject[y].name) {
                that.setData({
                  insuranceId: that.data.arrayObject[y].id
                })
              }
            }
            var caseNum = []
            var carNum = []
            var trueName = []
            var mobile = []
            caseNum[0] = ''
            carNum[0] = ''
            trueName[0] = ''
            mobile[0] = ''

          }

          var numberIdc = 'caseInfor[' + 0 + '].' + 'numberId';
          var carIdNum = 'caseInfor[' + 0 + '].' + 'carId';
          var personName = 'caseInfor[' + 0 + '].' + 'casePerson';
          var mobileaa = 'caseInfor[' + 0 + '].' + 'casePhone';
          that.setData({
            [numberIdc]: caseNum[0],
            [carIdNum]: carNum[0],
            [personName]: trueName[0],
            [mobileaa]: mobile[0]
          })
          that.setData({
            firstPage: false,
            secondPage: true,

          })

        }
      }
    })

  },
})

function getPhone(url) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function(res) {},
  })
}