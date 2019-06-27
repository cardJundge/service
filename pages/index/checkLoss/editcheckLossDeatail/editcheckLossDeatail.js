// pages/index/editClaims/editClaims.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '编辑查勘定损',
    third_num:1,
    listId: '',
    array:[]
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
    this.data.listId = options.module
    console.log(this.data.listId)
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        paddingTop: '140px',
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        titTop: '90px',
        container: 'containerX',
        nav_cell: "nav_cellX",
      })
    }

  },
  formSubmit: function (e) {
    var that = this
    var temp_third = [];
    if (e.detail.value.car1 || e.detail.value.mobile1) {
      temp_third.push({survey_id:that.data.listId, phone: e.detail.value.mobile1, car_no: e.detail.value.car1 })
    }
    if (e.detail.value.car2 || e.detail.value.mobile2) {
      temp_third.push({ survey_id: that.data.listId,  phone: e.detail.value.mobile2, car_no: e.detail.value.car2 })
    }
    if (e.detail.value.car3 || e.detail.value.mobile3) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile3, car_no: e.detail.value.car3 })
    }
    if (e.detail.value.car4 || e.detail.value.mobile4) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile4, car_no: e.detail.value.car4 })
    }
    if (e.detail.value.car5 || e.detail.value.mobile5) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile5, car_no: e.detail.value.car5 })
    }
    if (e.detail.value.car6 || e.detail.value.mobile6) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile6, car_no: e.detail.value.car6 })
    }
    if (e.detail.value.car7 || e.detail.value.mobile7) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile7, car_no: e.detail.value.car7 })
    }
    if (e.detail.value.car8 || e.detail.value.mobile8) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile8, car_no: e.detail.value.car8 })
    }
    if (e.detail.value.car9 || e.detail.value.mobile9) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile9, car_no: e.detail.value.car9 })
    }
    if (e.detail.value.car10 || e.detail.value.mobile10) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile10, car_no: e.detail.value.car10 })
    }
    temp_third = JSON.stringify(temp_third);
    console.log(temp_third)
    console.log(e)
    var that = this;
    if (e.detail.value.report_no == '') {
      that.setData({
        report_noErr: true
      })
      return
    }
    // if (e.detail.value.carId == '') {
    //   that.setData({
    //     carIdErr: true
    //   })
    //   return
    // }
    // var reCar = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/
    // if (reCar.test(e.detail.value.carId)) {
    //   console.log('ok')
    // } else {
    //   that.setData({
    //     carIdErr: true
    //   })
    //   return
    // }

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
    var reg = /^1[3456789]\d{9}$/;
    if (reg.test(e.detail.value.caseMobile)) {
      console.log('ok')
    } else {
      that.setData({
        caseMobileErr: true
      })
      return
    }
    that.setData({
      allOver: true
    })

    console.log(that.data.insuranceId)
    var test = getApp().globalData.hostName;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = that.data.userId;
    var session_id = that.data.sessionId;
    console.log(e.detail.value);
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: test + 'service/survey/edit',
      method: 'POST',
      data: {
        id: that.data.listId,
        type: e.detail.value.classify,
        insurance_id: that.data.insuranceId,
        report_no: e.detail.value.report_no,
        car_no: e.detail.value.carId,
        recognizee: e.detail.value.casePerson,
        mobile: e.detail.value.caseMobile,
        money: e.detail.value.money,
        remark: e.detail.value.remark ? e.detail.value.remark:'',
        sanze: temp_third
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
        wx.setStorageSync('freshFlag', true)
       if(res.data.status==1){
         wx.showToast({
           title: '修改成功',
           duration:500
         })
         setTimeout(function(){
           wx.navigateBack({
             delta: 1
           })
         },500)
       }else{
         wx.showToast({
           title: '修改失败',
         })
         that.setData({
           allOver:false
         })
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
    } 

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
    var that = this

    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: test + 'service/survey/info/id/' + that.data.listId,
      method: 'GET',
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
          detail: res.data.survey,
          detailId: res.data.survey.id,
          third:res.data.sanze,
          thirdLength: res.data.sanze.length
        })
        console.log(that.data.third)
        console.log(res.data.survey.id)
        wx.request({
          url: test + 'service/index/systemInsurance',
          method: 'GET',
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
              insurance: res.data.insurance
            })
            console.log(that.data.insurance)
            for (var i in res.data.insurance) {
              that.data.array.push(res.data.insurance[i].name)
            }
            var arrayTemp = that.data.array
            that.setData({
              array: arrayTemp,
              insuranceId: that.data.detail.insurance_id
            })
            console.log(that.data.insuranceId)
            for (var j in that.data.insurance){
              if (that.data.insurance[j].id == that.data.detail.insurance_id){
                for (var m in that.data.array) {
                  if (that.data.insurance[j].name == that.data.array[m]) {

                    that.setData({
                      index1: m,
                      insuranceId: that.data.insurance[j].id
                    })
                  }
                }
              }
            }
            
          }

        })

      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  

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
  bindPickerChange:function(e){
    console.log(e)
    var that = this
    for (var i in that.data.insurance) {
      if (that.data.insurance[i].name == that.data.array[e.detail.value]) {
        that.setData({
          insuranceId: that.data.insurance[i].id
        })
      }
    }
    console.log(that.data.insuranceId)
    that.setData({
      index1: e.detail.value
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})