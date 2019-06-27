// pages/index/allData/allData.js
var test = getApp().globalData.hostName;
var data = require('../../../data/daily.js');
var wxCharts = require('../../../data/wxcharts.js');
var app = getApp();
var max = 0;
var systemWidthA;
Page({
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '数据统计',
    serverList: [],
    radioTextShow: true,
    noPeopleCancvas: 'block',
    searchIcon: false,
    tag: true,
    dataNumber: 0,
    radiosArr: [],
    weekArr1: [],
    canvasNull: 'block',
    dataRange: 1,
    bussinessClasify: 1,
    main_left: 'block',
    main_right: 'none',
    task_search: false,
    moduIndex: 0,
    weekList: [],
    moduleArr: [],
    pointArr: [],
    weekArr: [],
    daysValue:[],
    task_name: '',
    modal_top: 0 + 'px',
    modal_left: 0 + 'px',
    activeLeft: 'active',
    start_time: fun_date(-6)
  },
  toChoose: function (e) {
    var that = this;
    that.data.searchIcon = true
    if (e.detail.value == '') {
      return
    }
    console.log(e.detail.value)
    that.setData({
      serverList: [],
      daysValue: [],
      weekArr1: [],
      weekArr: [],
      week: [],
      task_search: true,
      cancelSearchIcon: true,
      task_name: e.detail.value,
     
    })
    if (that.data.main_left == 'block') {
      that.onReady()
    } else {
      that.toDetail()
    }

  },
  cancelSearch: function () {
    var that = this
    that.data.searchIcon = false
    this.setData({
      cancelSearchIcon: false,
      task_search: false,
      keyWordsTemp: '',
      task_name: '',
    })
    this.onReady()
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function() {
    var that = this;
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
    this.data.serviceId = wx.getStorageSync('userid')
    that.data.sessionId = wx.getStorageSync('PHPSESSID')
    that.data.userId = wx.getStorageSync('userid')
    var datatemp = new Date()
    var systemWidth = wx.getSystemInfoSync().windowWidth;
    systemWidthA = systemWidth
    var systemWidthCon = systemWidth * 0.94 * 0.7;
    that.data.radioWidth = systemWidthCon - (systemWidthCon * 0.02 + systemWidthCon * 0.16)
    that.setData({
      start_time: fun_date(-6),
      initEnd_time: datatemp.getFullYear() + "-" + (datatemp.getMonth() + 1) + "-" + datatemp.getDate(),
      end_time: datatemp.getFullYear() + "-" + (datatemp.getMonth() + 1) + "-" + datatemp.getDate()
    })

  },
  canvasEvent: function (e) {
    var that = this
    if (this.data.bussinessClasify == 2 || this.data.bussinessClasify == 3) {
      return
    }
    var modal_left;
    var pointValue;
    var posy;
    var temp;
    var dateNow = this.data.pointArr[0].date;
    dateNow = this.data.pointArr[0].date.split('.')
    dateNow = dateNow[0] + '月' + dateNow[1] + '日'
    var minDuration = Math.abs(this.data.pointArr[0].x - e.changedTouches[0].x);
    modal_left = this.data.pointArr[0].x
    pointValue = this.data.pointArr[0].y
    posy = this.data.pointArr[0].pos
    temp = this.data.pointArr[0].id
    for (var i in this.data.pointArr) {
      if (Math.abs(this.data.pointArr[i].x - e.changedTouches[0].x) < minDuration) {
        modal_left = this.data.pointArr[i].x
        pointValue = this.data.pointArr[i].y
        dateNow = this.data.pointArr[i].date.split('.')
        dateNow = dateNow[0] + '月' + dateNow[1] + '日'
        posy = this.data.pointArr[i].pos
        temp = this.data.pointArr[i].id
        minDuration = Math.abs(this.data.pointArr[i].x - e.changedTouches[0].x)
      }
    }
    if (temp < parseInt(this.data.pointArr.length / 2)) {
      this.setData({
        modal_left: modal_left + 10 + 'px',
      })
    } else {
      this.setData({
        modal_left: modal_left - 110 + 'px',
      })
    }
    this.setData({
      pointArr: [],
      weekArr: [],
    })
    var tempContext;
    if (e.target.dataset.canvas == 'left') {
      that.data.contextL = wx.createCanvasContext('line-canvas')
    } else {
      that.data.contextL = wx.createCanvasContext('line-canvass')
    };
    that.data.tag = false
    charles(that, that.data.weekArr, that.data.contextL, temp)
    //drawCirle(modal_left, posy, that.data.contextL, 'red')
  },
  cancelTouched: function () {
    this.setData({
      touched: false,
      weekArr: [],
    })
    this.data.tag = true
    charles(this, this.data.weekArr, this.data.contextL)
  },
  onReady: function() {
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    that.setData({
      week:[],
      serverList: [],
      daysValue: [],
      weekArr1: [],
      pointArr: [],
      weekArr: [],
    })
    var systemWidth = wx.getSystemInfoSync().windowWidth * 0.94 * 0.8 * 0.3;
    getServerList(that).then(function() {
      if (that.data.serverList.length != 0) {
        for (let i in that.data.serverList) {
          for (let j in that.data.classfyArr) {
            if (that.data.serverList[i].classify_id == that.data.classfyArr[j].id) {
              that.data.serverList[i].classify_name = that.data.classfyArr[j].name
              break
            }
          }
        }
        that.setData({
          serverList: that.data.serverList
        })
        console.log(that.data.serverList)
        if (that.data.serverList.length == 1) {
          that.data.trWidth = '100%'
          that.data.tdWidth = '99%'
        } else if (that.data.serverList.length == 2) {
          that.data.trWidth = '100%'
          that.data.tdWidth = '49%'
        } else if (that.data.serverList.length == 3) {
          that.data.trWidth = '150%'
          that.data.tdWidth = '32.3%'
        } else if (that.data.serverList.length > 3) {
          that.data.trWidth = systemWidth * that.data.serverList.length
          that.data.tdWidth = systemWidth
        }
        if (that.data.serverList.length > 3) {
          that.setData({
            trWidth: that.data.trWidth + that.data.serverList.length + 'px',
            tdWidth: that.data.tdWidth + 'px'
          })
        } else {
          that.setData({
            trWidth: that.data.trWidth,
            tdWidth: that.data.tdWidth
          })
        }
      }
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
  onPullDownRefresh: function() {},


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})

function charles(that, arr, context, tempaa) {
  var max = 0
  that.data.week = that.data.week_sum
  for (var i in that.data.week) {
    if (that.data.week[i] > max) {
      max = that.data.week[i]
    }
  }
  console.log(max)
  that.setData({
    pointArr: [],
  })
  that.data.durationData = DateDiff(that.data.start_time, that.data.end_time)
  var duration = that.data.durationData
  var systemWidth = wx.getSystemInfoSync().windowWidth;
  if (that.data.main_right == 'block') {
    if (that.data.bussinessClasify == 3) {
      for (var j in arr) {
        arr[j].number = parseInt(arr[j].number / 60)
      }
      max = parseInt((max + 300) / 60)
    }
  }
  draw(that, max, context, that.data.weekArr1, duration, tempaa)
}

function draw(that, max, context, arr, duration, tempaa) {
  var systemWidth = wx.getSystemInfoSync().windowWidth;
  var charsCon = systemWidth * 0.8;
  var eachLength = charsCon / duration;
  var startPos = systemWidth * 0.1;
  that.setData({
    systemWidth: systemWidth + 'px'
  })
  // 画布宽度，与CSS中定义等值
  var canvasWidth = charsCon;
  // 画布高度，与CSS中定义等值  
  var canvasHeight = 200;
  // x轴放大倍数
  var ratioX = eachLength;

  // 浅紫
  var lightPurple = '#d6dbf4';
  // 紫色
  var purple = '#7587db';
  // 浅灰
  var lightGray = '#c7cce5';
  // 灰色
  var gray = '#cccccc';
  //var context = context;
  /* Part1.画横向参照线 */
  var lineCount = 4;
  if (that.data.main_right == 'block' && that.data.bussinessClasify > 3) {
    max = 100
  } else {
    if (max < 4) {
      max = 4
    } else {
      max = max
    }
  }

  // y轴放大倍数
  var ratioY = 200 / max;
  var estimateRatio = max / lineCount;
  var ratio = canvasHeight / lineCount;
  for (var i = 0; i < lineCount + 1; i++) {
    context.beginPath();
    var currentPoint = {
      x: startPos,
      y: canvasHeight - i * ratio
    };
    // 移动到原点
    context.moveTo(currentPoint.x, currentPoint.y + 14);
    // 向Y正轴方向画线
    context.lineTo(charsCon + 40, canvasHeight - i * ratio + 14);
    // 设置属性
    context.setFontSize(14)
    context.setLineWidth(0.5);
    // 设置颜色
    context.setStrokeStyle('#EFEFEF');
    context.stroke();
    // 标注数值
    context.setFillStyle(gray);
    context.fillText((i * estimateRatio).toFixed(0), currentPoint.x - 30, currentPoint.y + 18);
  }
  /* Part2.画折线 */
  arr.forEach(function(daily, i, array) {
    if (i < array.length - 1) {
      var currentPoint = {
        x: i * ratioX + startPos,
        y: canvasHeight - daily.number * ratioY + 14
      }
      // 下一个点坐标
      var nextPoint = {
        x: (i + 1) * ratioX + startPos,
        y: canvasHeight - array[i + 1].number * ratioY + 14
      }
      // 开始
      context.beginPath();
      // 移动到当前点
      context.moveTo(currentPoint.x, currentPoint.y);
      // 画线到下个点
      context.lineTo(nextPoint.x, nextPoint.y);
      // 设置属性
      context.setLineWidth(2);
      // 设置颜色
      context.setStrokeStyle(purple);
      // 描线
      context.stroke();
      // 竖直往下，至x轴
      context.lineTo(nextPoint.x, canvasHeight + 14);
      // 水平往左，至上一个点的在x轴的垂点
      context.lineTo(currentPoint.x, canvasHeight + 14);
      // 设置淡紫色
      context.setFillStyle(lightPurple);
      // 实现闭合与x轴之前的区域
      context.fill();
    }
  });
  /* Part3.画圆圈 */
  arr.forEach(function(daily, i, array) {
    //that.data.circleFill.push('white')
    var currentPoint = {
      x: i * ratioX + startPos,
      y: canvasHeight - daily.number * ratioY
    };
    that.data.pointArr.push({
      id: i,
      x: i * ratioX + startPos,
      y: daily.number,
      pos: canvasHeight - daily.number * ratioY
    })
    if (that.data.durationData < 31) {
      context.beginPath();
      context.arc(currentPoint.x, currentPoint.y + 14, 2, 0, 2 * Math.PI);
      context.setStrokeStyle(purple);
      context.setFillStyle('white');
      context.stroke();
      context.fill();
    }

  });

  /* Part4.写下面的数durationData */
  arr.forEach(function(daily, i, array) {
    that.data.pointArr[i].date = array[i].data
    if (that.data.durationData < 8) {
      var currentPoint = {
        x: i * ratioX + startPos,
        y: canvasHeight - daily.number * ratioY
      };

      // 设置属性
      context.setLineWidth(0.5);
      // 设置颜色
      context.setStrokeStyle(lightGray);
      context.stroke();
      // 标注数值
      context.setFillStyle(gray);
      context.fillText(array[i].data, currentPoint.x - 14, 230);
    } else if (7 < that.data.durationData < 22) {
      var tempDuration = parseInt(that.data.durationData / 7)
      if (i % tempDuration == 0) {
        var currentPoint = {
          x: i * ratioX + startPos,
          y: canvasHeight - daily.number * ratioY
        };

        // 设置属性
        context.setLineWidth(0.5);
        // 设置颜色
        context.setStrokeStyle(lightGray);
        context.stroke();
        // 标注数值
        context.setFillStyle(gray);
        context.fillText(array[i].data, currentPoint.x - 14, 230);
      }

    } else if (21 < that.data.durationData < 30) {
      var tempDuration = parseInt(that.data.durationData / 7)
      if (i % tempDuration == 0) {
        var currentPoint = {
          x: i * ratioX + startPos,
          y: canvasHeight - daily.number * ratioY
        };

        // 设置属性
        context.setLineWidth(0.5);
        // 设置颜色
        context.setStrokeStyle(lightGray);
        context.stroke();
        // 标注数值
        context.setFillStyle(gray);
        context.fillText(array[i].data, currentPoint.x - 14, 230);
      }

    } else {
      var tempDuration = parseInt(that.data.durationData / 7)
      if (i % tempDuration == 0) {
        var currentPoint = {
          x: i * ratioX + startPos,
          y: canvasHeight - daily.number * ratioY
        };

        // 设置属性
        context.setLineWidth(0.5);
        // 设置颜色
        context.setStrokeStyle(lightGray);
        context.stroke();
        // 标注数值
        context.setFillStyle(gray);
        context.fillText(array[i].data, currentPoint.x - 14, 230);
      }
    }
  });
  that.setData({
    pointArr: that.data.pointArr
  })
  if (that.data.tag) {
    context.draw();
  } else {
    var median = parseInt(that.data.pointArr.length / 2)
    var medianBoolue;
    if (tempaa < median) {
      medianBoolue = true
    } else {
      medianBoolue = false
    }
    drawCirle(that.data.pointArr[tempaa].x, that.data.pointArr[tempaa].pos, context, '#7587DB', that.data.pointArr[tempaa].y, that.data.pointArr[tempaa].date, medianBoolue)
  }
  wx.hideLoading()
}

function drawCirle(circleX, circleY, context, color, value, date, medianBoolue) {

  // 画矩形
  var textOffsetX;
  var rectOffsetX
  if (medianBoolue) {
    rectOffsetX = circleX + 10
    textOffsetX = circleX + 24
  } else {
    rectOffsetX = circleX - 110
    textOffsetX = circleX + -100
  }
  context.fillStyle = '#555';
  context.globalAlpha = 0.6;
  context.fillRect(rectOffsetX, 14, 100, 70);

  // 写字月份
  // 设置属性
  context.setLineWidth(1);
  context.setFontSize(10)
  context.globalAlpha = 1;
  // 设置颜色
  context.setStrokeStyle('#fff');
  context.stroke();
  // 标注数值
  console.log(333)
  var dateArr = date.split('.')

  context.setFillStyle('#fff');
  context.fillText(dateArr[0] + '月' + dateArr[1] + '日', textOffsetX, 36);
  // 写字值
  // 设置属性
  context.setLineWidth(1);
  context.setFontSize(10)
  context.globalAlpha = 1;
  // 设置颜色
  context.setStrokeStyle('#fff');
  context.stroke();
  // 标注数值

  context.setFillStyle('#fff');
  context.fillText('业务量：' + value, textOffsetX, 60);
  // 开始
  // 画竖线
  context.beginPath();
  // 移动到当前点
  context.moveTo(circleX, 14);
  // 画线到下个点
  context.lineTo(circleX, 214);
  // 设置属性
  context.setLineWidth(0.5);
  // 设置颜色
  context.setStrokeStyle('#ddd');
  // 描线
  context.stroke();
  // 竖直往下，至x轴
  //context.lineTo(nextPoint.x, canvasHeight + 14);
  context.setLineWidth(0.5);
  context.beginPath();
  context.arc(circleX, circleY + 14, 2, 0, 2 * Math.PI);
  context.setStrokeStyle('#7587DB');
  context.setFillStyle(color);
  context.stroke();
  context.fill();
  context.draw();
}


function fun_date(aa) {
  var date1 = new Date(),
    time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间
  var date2 = new Date(date1);
  date2.setDate(date1.getDate() + aa);
  var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();

  return time2
}

function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式  
  console.log(sDate1)
  console.log(sDate2)
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]) //转换为12-18-2002格式  
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
  return iDays
}


function getServerList(that) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: test + 'service/project/index',
      method: 'GET',
      data: {
        service_id: that.data.serviceId
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
          that.setData({
            serverList: []
          })
          if (res.data.data.length == 0) {
            that.setData({
              noDta: true
            })
          } else {
            for (var i in res.data.data) {
              that.data.serverList.push(res.data.data[i])
            }
            that.setData({
              serverList: that.data.serverList
            })
          }
        } else {
          wx.showModal({
            title: '请求超时，请重新登录',
            content: '',
          })
        }
        getClassify(that).then(function() {
          resolve(that)
        })
      }
    })
  })
}



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
        that.data.classfyArr = res.data.data
        console.log(that.data.classfyArr)
        getServiceData(that).then(resolve(that))
      }
    })
  })
}

function getServiceData(that) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: test + 'service/count/countOrder',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      },
      data:{
        task_name: that.data.task_name
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
        if(res.data.status==-1){
       
          that.setData({
            noData:'none'
          })
          wx.hideLoading()
          return
        }else{
          that.setData({
            noData: 'block'
          })
        }
        that.setData({
          allData: res.data.count_sum,
          month: res.data.count_month_sum,
          today: res.data.count_today_sum,
        })

        that.data.week_class = res.data.week_class
        that.data.week_sum = res.data.week_sum
        that.setData({
          daysValue: []
        })
        //把每天的量设为0
        for (var i in that.data.week_class) {
          var tempArr =[]
          for (var m in that.data.serverList) {
            tempArr.push({ classify_id: that.data.serverList[m].classify_id, count: 0 })   
          }
          that.data.daysValue.push({ data: i, daysCount: tempArr})  
        }
        
        //核实每一天
        for (var m in that.data.week_class) {
          for (var n in that.data.daysValue){
            if (m == that.data.daysValue[n].data){
              for (var p in that.data.daysValue[n].daysCount){
                for (var q in that.data.week_class[m]) {
                  if (that.data.week_class[m][q].classify_id == that.data.daysValue[n].daysCount[p].classify_id) {
                    that.data.daysValue[n].daysCount[p].count = that.data.week_class[m][q].count
                }
                }
              }
       
            }
          }
        }

        that.setData({
          daysValue: that.data.daysValue,
         
        })
        that.setData({
          weekArr1:[],
        })
        console.log(that.data.weekArr1)
        for (var i in that.data.week_sum) {
          that.data.weekArr1.push({
            data: i.slice(5).replace('-', '.'),
            number: res.data.week_sum[i]
          })
        }
        that.setData({
          weekArr1: that.data.weekArr1,
        })
        console.log(that.data.weekArr1)
        charles(that, that.data.weekArr1, wx.createCanvasContext('line-canvas'))
        resolve(that)
      }
    })
  })
}