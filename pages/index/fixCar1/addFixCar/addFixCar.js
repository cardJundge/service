// pages/index/addTask/addTask.js
var addData = require('../../getData/addData.js');
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first_page:true,
    carData:{},
    trueName_n: '',
    mobile_n: '',
    carNo_n: '',
    remark: '',
    brandId:'',
    trueName: false
  },
  toAnalyze: function () {
    this.setData({
      first_page: false
    })
  },
  todirect: function () {
    this.setData({
      first_page: true
    })
  },
  trueName: function (e) {
    console.log(e.detail.value)
    this.setData({
      trueName_n: e.detail.value
    })
  },
  mobile: function (e) {
    this.setData({
      mobile_n: e.detail.value
    })
  },
  carNo: function (e) {
    this.setData({
      carNo_n: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toBrand: function () {
    wx.navigateTo({
      url: './addbrand/addbrand',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      choosedBrand: wx.getStorageSync('brand'),
      remark: this.data.remark,
      carNo_n: this.data.carNo_n,
      mobile_n: this.data.mobile_n,
      trueName_n: this.data.trueName_n,
    })
    if (this.data.choosedBrand) {
      this.data.carData.dataId = this.data.choosedBrand.split('&&')[1]
      this.setData({
        brandId: this.data.choosedBrand.split('&&')[1],
        brandName: this.data.choosedBrand.split('&&')[0]
      })
      wx.removeStorageSync('brand')

    }

  },
  formSubmit: function (e) {
    var that = this;
    var userIdArc = this.data.userId;
    var noCar = true;
    that.data.sessionId = wx.getStorageSync('PHPSESSID')
    var session_id = this.data.sessionId;
    console.log(session_id)
    addData.addSubmit(that, e, userIdArc, session_id, 'push', false, false, true);
  },

  cancelRed: function (e) {
    addData.cancelRed(this, e)

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
  analyze: function (e) {
    var that = this;
    if (e.detail.value.infor == '') {
      that.setData({
        tip: true
      })
      return
    }

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
              console.log(companySpecial.match(companyNameReg)[0])
              that.setData({
                companyed: companySpecial.match(companyNameReg)[0],
                shortInfor1: shortInforData,
              })
              if (that.data.companyed == '平安产险') {
                that.data.companyed = '中国平安'
              }
              console.log(that.data.arrayObject)
              for (var j in that.data.arrayObject) {
                console.log(j)
                if (that.data.arrayObject[j].name == that.data.companyed) {
                  var aa = that.data.arrayObject[j].id
                  console.log(aa)
                  that.setData({
                    insuranceId: aa
                  })
                  console.log(that.data.insuranceId)
                  for (var t in that.data.array) {
                    if (that.data.array[t] == that.data.companyed) {
                      console.log(that.data.array[t])
                      console.log(t)
                      that.setData({
                        index1: t
                      })
                      console.log(that.data.index1)
                    }
                  }
                }
              }
              console.log('kkkk')
              console.log(that.data.companyed)
            } else {
              that.setData({
                companyed: '其他',
                shortInfor1: shortInforData,
              })
            }
          } else {
            console.log('解析不出来保险公司名字')
            var shortInforData = e.detail.value.infor
            that.setData({
              shortInfor1: shortInforData,
            })

          }
          console.log(that.data.arrayObject)
          console.log(that.data.array)


          var carPatt = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;
          if (that.data.companyed == '鼎和保险') {
            var patt1 = /报案号(\d+).(\d+)/i;
            if (shortInforData.match(patt1)) {
              console.log(shortInforData.match(patt1))
              var caseCont = shortInforData.match(patt1);
              var pattNum = /(\d+).(\d+)/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
                console.log(caseNum[0]);
              } else {
                var caseNum = []
                caseNum[0] = ''
                console.log(caseNum[0])
              }
            } else {
              var caseNum = [];
              caseNum[0] = ''
              console.log(caseNum[0])
            }
            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              console.log(carCont)
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到鼎和保险的车牌号')
            }

            var pPatt = /被保险人[\u4e00-\u9fa5]{2,}/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              console.log('保险人测试')
              console.log(pCont)
              var temp = pCont[0].slice(4)
              console.log(temp)
              var trueName = []
              trueName[0] = temp
            } else {
              var trueName = []
              trueName[0] = ''
              console.log('匹配不到鼎和保险的被保险人')
            }

            var mobileReg = /联系人[\u4e00-\u9fa5]{2,}1[345789]\d{9}/
            if (shortInforData.match(mobileReg)) {
              console.log('电话测试')
              var temp = shortInforData.match(mobileReg)
              var tempReg = /1[345789]\d{9}/
              if (temp[0].match(tempReg)) {
                var mobile = temp[0].match(tempReg)
              } else {
                var mobile = []
                mobile[0] = ''
                console.log('匹配不到鼎和保险的报案电话')
              }
            } else {
              var mobile = []
              mobile[0] = ''
              console.log('匹配不到鼎和保险的报案电话')
            }



          } else if (that.data.companyed == '中华保险') {
            var patt1 = /报案号\d+/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var pattNum = /\d+/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
                console.log(caseNum[0]);
              } else {
                var caseNum = []
                caseNum[0] = ''
                console.log('匹配不到中华保险的报案号')
              }
            } else {
              var caseNum = []
              caseNum[0] = ''
              console.log('匹配不到中华保险的报案号')
            }



            if (shortInforData.match(carPatt)) {
              var carNum = shortInforData.match(carPatt);
              console.log(carNum[0])

            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到中华保险的车牌号')
            }
            var pPatt = /[\u4e00-\u9fa5]{2,}\d{11}/i;
            if (shortInforData.match(pPatt)) {
              var peopleTemp = shortInforData.match(pPatt)
              var peopleNameReg = /[\u4e00-\u9fa5]+/
              if (peopleTemp[0].match(peopleNameReg)) {
                var trueName = peopleTemp[0].match(peopleNameReg)
                console.log(trueName)
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
              console.log('电话测试')
              console.log(shortInforData.match(mobileReg))
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
                console.log(caseNum[0]);
              } else {
                var caseNum = []
                caseNum[0] = '';
                console.log('匹配不到渤海财险的报案号')
              }
            } else {
              var caseNum = []
              caseNum[0] = '';
              console.log('匹配不到渤海财险的报案号')
            }



            if (shortInforData.match(carPatt)) {
              var carNum = shortInforData.match(carPatt);
              console.log(carNum[0])

            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到渤海的车牌号')
            }

            var pPatt = /被保人[\u4e00-\u9fa5]+/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              console.log('测试')
              var test = pCont[0].slice(3)
              console.log(test)

              //被保人XXX
              var trueName = []
              trueName[0] = test
            } else {
              var trueName = []
              trueName[0] = ''
              console.log('匹配不到渤海财险的被保人')
            }
            var mobileReg = /.\b(\d{11}).\b/
            if (shortInforData.match(mobileReg)) {
              console.log('电话测试')
              console.log(shortInforData.match(mobileReg))
              var temp = shortInforData.match(mobileReg)
              console.log(temp[0])
              var tempReg = /\d{11}/
              if (temp[0].match(tempReg)) {
                console.log('第二次测试')
                console.log(temp[0].match(tempReg))
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
                console.log('匹配不到中煤保险的报案号')
              }
            } else {
              var caseNum = []
              caseNum[0] = ''
              console.log('匹配不到中煤保险的报案号')
            }
            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              console.log(carCont)
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到中煤保险的车牌号')
            }
            var pPatt = /被保险人.[\u4e00-\u9fa5]+/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              console.log(pCont)
              var pfPatt = /.[\u4e00-\u9fa5]+$/
              if (pCont[0].match(pfPatt)) {
                var personNum = pCont[0].match(pfPatt);
                var truePat = /[\u4e00-\u9fa5]+/;
                if (personNum[0].match(truePat)) {
                  var trueName = personNum[0].match(truePat)
                } else {
                  var trueName = []
                  trueName[0] = ''
                  console.log('匹配不到中煤保险的被保险人')
                }
              } else {
                var trueName = []
                trueName[0] = ''
                console.log('匹配不到中煤保险的被保险人')
              }
            } else {
              var trueName = []
              trueName[0] = ''
              console.log('匹配不到中煤保险的被保险人')
            }
            var mobilePatt = /报案电话.\d+/i;
            if (shortInforData.match(mobilePatt)) {
              var mobileCont = shortInforData.match(mobilePatt);
              console.log(mobileCont)
              var mpbilePattc = /\d+/
              if (mobileCont[0].match(mpbilePattc)) {
                var mobile = mobileCont[0].match(mpbilePattc);
                console.log(mobile[0]);
              } else {
                var mobile = []
                mobile[0] = ''
                console.log('匹配不到中煤保险的报案电话')
              }
            } else {
              var mobile = []
              mobile[0] = ''
              console.log('匹配不到中煤保险的报案电话')
            }


          } else if (that.data.companyed == '中国太平') {

            var patt1 = /.支付宝.\d+.\d+/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              console.log(caseCont)
              var caseNum = []
              caseNum[0] = caseCont[0].slice(5)
              console.log(caseNum[0])

            } else {
              var caseNum = []
              caseNum[0] = ''
              console.log('匹配不到中煤保险的报案号')
            }


            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              console.log(carCont)
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到中煤保险的车牌号')
            }

            var pPatt = /一般客户.[\u4e00-\u9fa5]+./i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              console.log(pCont)
              pCont[0] = pCont[0].slice(5)
              var chinesePat = /[\u4e00-\u9fa5]+/
              if (pCont[0].match(chinesePat)) {
                var trueName = []
                trueName[0] = pCont[0].match(chinesePat)[0]
              } else {
                var trueName = []
                trueName[0] = ''
                console.log('匹配不到中煤保险的被保险人')
              }

            } else {
              var trueName = []
              trueName[0] = ''
              console.log('匹配不到中煤保险的被保险人')
            }


            var mobilePatt = /1[3|4|5|8][0-9]\d{4,8}/i;
            if (shortInforData.match(mobilePatt)) {
              var mobileCont = shortInforData.match(mobilePatt);
              console.log(mobileCont)
              var mpbilePattc = /\d+/
              if (mobileCont[0].match(mpbilePattc)) {
                var mobile = mobileCont[0].match(mpbilePattc);
                console.log(mobile[0]);
              } else {
                var mobile = []
                mobile[0] = ''
                console.log('匹配不到中煤保险的报案电话')
              }
            } else {
              var mobile = []
              mobile[0] = ''
              console.log('匹配不到中煤保险的报案电话')
            }
          } else if (that.data.companyed == '中国平安' || that.data.companyed == '平安产险') {
            that.data.companyed = '中国平安'
            shortInforData = shortInforData.replace('【中国平安】', '')
            console.log(shortInforData[0])
            if (shortInforData[0] == '直') {
              console.log(shortInforData[0])
              var patt1 = /%(\w+)-(\w+)/i;
              if (shortInforData.match(patt1)) {
                console.log(shortInforData.match(patt1))
                var caseNum = shortInforData.match(patt1);
                caseNum[0] = caseNum[0].slice(1)
              } else {
                var caseNum = [];
                caseNum[0] = ''
                console.log(caseNum[0])
              }
              var mobile = []
              mobile[0] = ''
              console.log('匹配不到中国平安的报案电话')
              var pPatt = /被.[\u4e00-\u9fa5]{2,3}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                console.log('oooo')
                console.log(pCont[0])
                var trueNameTemp = pCont[0].slice(2)
                console.log(trueNameTemp)
                var trueName = []
                trueName[0] = trueNameTemp
              } else {
                var trueName = []
                trueName[0] = ''
                console.log('匹配不到中煤保险的被保险人')
              }
              var reCar = /.[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}.[出险地点|派工地点]/
              if (shortInforData.match(reCar)) {
                var pCont = shortInforData.match(reCar);
                console.log(pCont[0])
                var car_reg2 = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}/
                if (pCont[0].match(car_reg2)) {
                  var carNum = pCont[0].match(car_reg2);
                  console.log(carNum[0])
                } else {
                  var carNum = []
                  carNum[0] = ''
                }

              } else {
                console.log('ddd')
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
                console.log(shortInforData.match(patt1))
                var caseNum = shortInforData.match(patt1);
                caseNum[0] = caseNum[0].slice(3)
                console.log(caseNum[0])
              } else {
                var caseNum = [];
                caseNum[0] = ''
                console.log(caseNum[0])
              }
              var mobilePatt = /.1[3|4|5|8][0-9]\d{4,8}./i;
              if (shortInforData.match(mobilePatt)) {
                var mobile = shortInforData.match(mobilePatt)
                mobile[0] = mobile[0].slice(1, 12)
                console.log(mobile[0])
              } else {
                var mobile = [];
                mobile[0] = ''
                console.log('匹配不到中国平安的报案电话')
              }
              var pPatt = /联系人.[\u4e00-\u9fa5]{2,3}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                console.log(pCont[0])
                var trueNameTemp = pCont[0].slice(4)
                console.log(trueNameTemp)
                var trueName = []
                trueName[0] = trueNameTemp
              } else {
                var trueName = []
                trueName[0] = ''
                console.log('匹配不到中煤保险的被保险人')
              }
              var reCar = /车牌(\S*).品牌/
              if (shortInforData.match(reCar)) {
                var carNum = shortInforData.match(reCar)
                carNum[0] = carNum[0].replace('-', '')
                carNum[0] = carNum[0].replace('，品牌', '')
                carNum[0] = carNum[0].slice(2)
                console.log(carNum[0])
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
              var mobilePatt = /客户电话1[345789]\d{9}/;
              if (shortInforData.match(mobilePatt)) {
                var mobile = shortInforData.match(mobilePatt);
                mobile[0] = mobile[0].slice(4)
                console.log(mobile[0])
              } else {
                var mobile = []
                mobile[0] = ''
              }
              var pPatt = /客户[\u4e00-\u9fa5]{2,}./i;
              if (shortInforData.match(pPatt)) {
                var shortInforData1 = shortInforData.replace(/\s*/g, "");
                console.log(shortInforData1)
                var pCont = shortInforData1.match(pPatt);

                var temp = pCont[0].slice(2)
                console.log(temp)
                var chinese = /[\u4e00-\u9fa5]{2,}/
                if (temp.match(chinese)) {
                  console.log('dsd')
                  var trueName = temp.match(chinese)

                } else {
                  var trueName = []
                  trueName[0] = ''
                }

                //console.log(trueName)
              } else {
                var trueName = []
                trueName[0] = ''
              }

              var carPatt1 = /车牌(\S*)品牌/;
              if (shortInforData.match(carPatt1)) {
                var carCont = shortInforData.match(carPatt1);
                carCont[0] = carCont[0].replace('-', '')
                console.log(carCont[0])
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
              var mobilePatt = /1[345789]\d{9}/;
              if (shortInforData.match(mobilePatt)) {
                var mobile = shortInforData.match(mobilePatt);
                console.log(mobile[0])
              } else {
                var mobile = []
                mobile[0] = ''
              }
              var pPatt = /客户.[\u4e00-\u9fa5]{2,}./i;
              if (shortInforData.match(pPatt)) {
                var shortInforData1 = shortInforData.replace(/\s*/g, "");
                console.log(shortInforData1)
                var pCont = shortInforData1.match(pPatt);

                var temp = pCont[0].slice(3)
                console.log(temp)
                var chinese = /[\u4e00-\u9fa5]{2,}/
                if (temp.match(chinese)) {
                  console.log('dsd')
                  var trueName = temp.match(chinese)

                } else {
                  var trueName = []
                  trueName[0] = ''
                }

                //console.log(trueName)
              } else {
                var trueName = []
                trueName[0] = ''
              }

              var carPatt1 = /车牌(\S*)品牌/;
              if (shortInforData.match(carPatt1)) {
                var carCont = shortInforData.match(carPatt1);
                carCont[0] = carCont[0].replace('-', '')
                console.log(carCont[0])
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
              var mobilePatt = /1[345789]\d{9}/;
              if (shortInforData.match(mobilePatt)) {
                var mobile = shortInforData.match(mobilePatt);

              } else {
                var mobile = []
                mobile[0] = ''
              }
              var pPatt = /被保险人(\S*)./i;
              if (shortInforData.match(pPatt)) {
                var shortInforData1 = shortInforData.replace(/\s*/g, "");
                console.log(shortInforData1)
                var pCont = shortInforData1.match(pPatt);
                console.log(pCont)
                var trueNameTemp = pCont[0].slice(4)
                console.log(trueNameTemp)
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

              var carPatt1 = /车(\S*)驾驶员/;
              if (shortInforData.match(carPatt1)) {
                var carCont = shortInforData.match(carPatt1);
                carCont[0] = carCont[0].replace('-', '')
                console.log(carCont[0])
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

            }

          } else if (that.data.companyed == '永安保险') {
            console.log('kdjskd')
            var patt1 = /(\d+)定损员/i;
            if (shortInforData.match(patt1)) {
              console.log(shortInforData.match(patt1))
              var patt2 = /(\d+)/i;
              if (shortInforData.match(patt1)[0].match(patt2)) {
                var caseNum = shortInforData.match(patt1)[0].match(patt2)
                console.log(caseNum)
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
              console.log(carCont)
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到鼎和保险的车牌号')
            }

            var namePhoneReg = /[\u4e00-\u9fa5]{2,}1[345789]\d{9}/
            if (shortInforData.match(namePhoneReg)) {
              console.log(shortInforData.match(namePhoneReg))
              var nameReg = /[\u4e00-\u9fa5]{2,}/
              if (shortInforData.match(namePhoneReg)[0].match(nameReg)) {
                console.log(shortInforData.match(namePhoneReg)[0].match(nameReg))
                var trueName = shortInforData.match(namePhoneReg)[0].match(nameReg)
              } else {
                var trueName = []
                trueName[0] = ''
              }
              var phoneReg = /1[345789]\d{9}/
              if (shortInforData.match(namePhoneReg)[0].match(phoneReg)) {
                console.log(shortInforData.match(namePhoneReg)[0].match(phoneReg))
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
            console.log(that.data.insuranceId)
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
            trueName_n: trueName[0],
            mobile_n: mobile[0],
            carNo_n: carNum[0],
            [numberIdc]: caseNum[0],
            [carIdNum]: carNum[0],
            [personName]: trueName[0],
            [mobileaa]: mobile[0]
          })
          console.log('okay')
          that.setData({
            first_page: true,
          })

        }
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})