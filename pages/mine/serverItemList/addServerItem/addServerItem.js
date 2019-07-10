var dateTimePicker = require('../../../dateTimePicker.js');
var test = getApp().globalData.hostName;
Page({
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '添加服务项目',
    dateTimeArray1: null,
    dateTime1: null,
    classify: ['请选择'],
    startYear: 2018,
    endYear: 2050,
    index: 0,
    imagePath: ''
  },
  backPage:function(){
    wx.navigateBack({
      delta:1
    })
  },
  onLoad: function() {
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // // 精确到分的处理，将数组的秒去掉
    // var lastArray = obj1.dateTimeArray.pop();
    // var lastTime = obj1.dateTime.pop();
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
  },
  onReady: function() {
    var that = this
    getClassify(that)
  },
  addServer: function(e) {
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
      title: '添加中...',
    })
    that.setData({
      adding: true
    })
    wx.request({
      url: test + 'service/project/add',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      },
      data: {
        classify_id: selectId,
        market_price: e.detail.value.marketPrice,
        platform_price: e.detail.value.truePrice,
        // combo_price: e.detail.value.mealPrice,
        useful: this.data.dateTimeArray1[0][this.data.dateTime1[0]] + `-` + this.data.dateTimeArray1[1][this.data.dateTime1[1]] + `-` +
          this.data.dateTimeArray1[2][this.data.dateTime1[2]] + ` ` +
          this.data.dateTimeArray1[3][this.data.dateTime1[3]] + `:` +
          this.data.dateTimeArray1[4][this.data.dateTime1[4]] + `:` +
          this.data.dateTimeArray1[5][this.data.dateTime1[5]],
        status: 1,
        service_id: that.data.serviceId,
        thumb: that.data.imagePath
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
            title: '添加成功',
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          wx.showModal({
            title: '添加失败',
            content: '',
          })
          tat.setData({
            adding: false
          })
        }
      }
    })

  },
  addImage: function() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
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
              console.log(res)

            }
            console.log(res)
            if (res.status == 1) {
              wx.showToast({
                title: '上传成功',
              })
              that.setData({
                imagePath: res.file_name
              })

            }
          }
        })
      }
    })
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  cancelRed: function(e) {
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
  changeClassify: function(e) {
    this.setData({
      index: e.detail.value
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
        console.log(res)
        that.data.classfyArr = res.data.data
        for (var i in res.data.data) {
          that.data.classify.push(res.data.data[i].name)
        }
        that.setData({
          classify: that.data.classify
        })
        console.log(that.data.classify)
        resolve(that)
      }
    })
  })
}