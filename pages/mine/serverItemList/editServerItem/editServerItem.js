var dateTimePicker = require('../../../dateTimePicker.js');
var test = getApp().globalData.hostName;
Page({
  data: {
    top: '64px',
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '编辑服务项目',
    dateTimeArray1: null,
    dateTime1: null,
    classify: ['请选择'],
    startYear: 2018,
    endYear: 2050,
    index: 0,
    imagePath: ''
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad(options) {
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
        top: '90px',
      })
    }
    this.setData({
      detail: JSON.parse(options.allData)
    })
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.serviceId = wx.getStorageSync('userid')
    this.setData({
      hostName: test
    })
    var temp = this.data.detail.useful.split(' ')[0].split('-').concat(this.data.detail.useful.split(' ')[1].split(':'))
    for (var i in this.data.dateTimeArray1[0]){
      if (this.data.dateTimeArray1[0][i] == temp[0]){
        this.data.dateTime1[0]=i
      }
    }
    this.data.dateTime1[1] = parseInt(temp[1] - 1) 
    this.data.dateTime1[2] = parseInt(temp[2]-1)
    this.data.dateTime1[3] = parseInt(temp[3])
    this.data.dateTime1[4] = parseInt(temp[4])
    this.data.dateTime1[5] = parseInt(temp[5])
    this.setData({
      dateTime1: this.data.dateTime1
    })
  },
  onReady: function () {
    var that = this
    getClassify(that).then(function(){
      for(var i in that.data.classfyArr){
        if (that.data.classify[i] == that.data.detail.classify_name){
          that.setData({
            index:i
          })
        }
      }
    })
  },
  addServer: function (e) {
    var selectId;
    var that = this
    if (this.data.index == 0) {
      this.setData({
        classifyError: true
      })
      return
    } else {
      for (var i in this.data.classfyArr) {
        if (this.data.classfyArr[i].name == this.data.classify[this.data.index]) {
          selectId = this.data.classfyArr[i].id
          break
        }

      }
    }
    if (!e.detail.value.marketPrice) {
      this.setData({
        marketPriceError: true
      })
      return
    }
    if (!e.detail.value.truePrice) {
      this.setData({
        truePriceError: true
      })
      return
    }
    // if (!e.detail.value.mealPrice) {
    //   this.setData({
    //     mealPriceError: true
    //   })
    //   return
    // }
    wx.showLoading({
      title: '修改中...',
    })
    that.setData({
      adding: true
    })
    wx.request({
      url: test + 'service/project/edit',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      },
      data: {
        id:that.data.detail.id,
        classify_id: selectId,
        market_price: e.detail.value.marketPrice,
        platform_price: e.detail.value.truePrice,
        // combo_price: e.detail.value.mealPrice,
        useful: this.data.dateTimeArray1[0][this.data.dateTime1[0]] + `-` + this.data.dateTimeArray1[1][this.data.dateTime1[1]] + `-` +
          this.data.dateTimeArray1[2][this.data.dateTime1[2]] + ` ` +
          this.data.dateTimeArray1[3][this.data.dateTime1[3]] + `:` +
          this.data.dateTimeArray1[4][this.data.dateTime1[4]] + `:` + `00`,
        status: 1,
        service_id: that.data.serviceId,
        thumb: that.data.detail.thumb
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
        if (res.data.status == 1) {
          wx.showToast({
            title: '修改成功',
          })
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];  //上一个页面
          var tempArr=[]
          tempArr = prevPage.data.serverList
          for (var i in tempArr){
            if (tempArr[i].id==that.data.detail.id){
              tempArr.splice(i, 1, {
                id: that.data.detail.id, classify_id: selectId, classify_name: that.data.classify[that.data.index], market_price: e.detail.value.marketPrice, platform_price: e.detail.value.truePrice,thumb: that.data.detail.thumb, useful: that.data.dateTimeArray1[0][that.data.dateTime1[0]] + `-` + that.data.dateTimeArray1[1][that.data.dateTime1[1]] + `-` +that.data.dateTimeArray1[2][that.data.dateTime1[2]] + ` ` +that.data.dateTimeArray1[3][that.data.dateTime1[3]] + `:` +that.data.dateTimeArray1[4][that.data.dateTime1[4]] + `:` + `00`})
            }
          }
          prevPage.data.serverList = tempArr
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '修改失败',
            content: '',
          })
          that.setData({
            adding: false
          })
        }
      }
    })

  },
  addImage: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中...',
        })
        wx.uploadFile({
          url: test + 'service/project/upload',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.data.sessionId
          },
          filePath: res.tempFilePaths[0],
          name: 'image',
          success: res => {
            var jsonStr = res.data;
            jsonStr = jsonStr.replace(" ", "");
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
              res = JSON.parse(jsonStr);

            }
            if (res.status == 1) {
              wx.showToast({
                title: '上传成功',
              })
              that.data.detail.thumb = res.file_name
              that.setData({
                detail: that.data.detail
              })

            }
          }
        })
      }
    })
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value,
      datachenged: true
    });
  },
  cancelRed: function (e) {
    if (e.target.id == 'marketPrice') {
      this.setData({
        marketPriceError: false
      })
    } else if (e.target.id == 'truePrice') {
      this.setData({
        truePriceError: false
      })
    } 
    // else if (e.target.id == 'mealPrice') {
    //   this.setData({
    //     mealPriceError: false
    //   })
    // }
  },
  changeClassify: function (e) {
    this.setData({
      index: e.detail.value,
    })
    if (this.data.index != 0) {
      this.setData({
        classifyError: false
      })
    }
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
    dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    // this.setData({
    //   dateTimeArray1: dateArr,
    //   dateTime1: arr
    // });
  }
})

function getClassify(that) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: test + 'service/project/classify',
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
        that.data.classfyArr = res.data.data
        for (var i in res.data.data) {
          that.data.classify.push(res.data.data[i].name)
        }
        that.setData({
          classify: that.data.classify
        })
        resolve(that)
      }
    })
  })
}