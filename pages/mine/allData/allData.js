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
    radioTextShow: true,
    noPeopleCancvas: 'block',
    searchIcon: false,
    tag: true,
    dataNumber: 0,
    radiosArr: [],
    weekArr1: [],
    canvasNull: 'block',
    radioText: '业务量占比',
    bussinessText: '业务量统计',
    dataRange: 1,
    bussinessClasify: 1,
    main_left: 'block',
    main_right: 'none',
    task_search: false,
    moduIndex: 0,
    weekList: [],
    weekArr: [],
    moduleArr: [],
    pointArr: [],
    task_name: '',
    modal_top: 0 + 'px',
    modal_left: 0 + 'px',
    activeLeft: 'active',
    start_time: '2016-09-01',
    end_time: '2016-09-06',
  },
  backPage:function(){
    wx.navigateBack({
      delta:1
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
    that.data.userId = wx.getStorageSync('userid')
    that.data.sessionId = wx.getStorageSync('PHPSESSID')
    wx.request({
      url: test + 'service/index/info/id/' + that.data.userId,
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
        if (res.data.service.short_name) {
          that.setData({

            service_short_name: res.data.service.short_name,
            short_name: res.data.service.short_name + ' • '
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
  canvasEvent: function(e) {
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
  canvasMove: function(e) {
    this.canvasEvent(e)
  },

  cancelTouched: function() {
    this.setData({
      touched: false,
      weekArr: [],
    })
    this.data.tag = true
    charles(this, this.data.weekArr, this.data.contextL)
  },
  bindDateChange: function(e) {
    this.setData({
      start_time: e.detail.value
    })
    this.toDetail()
  },
  bindDateChange1: function(e) {
    this.setData({
      end_time: e.detail.value
    })
    this.toDetail()
  },
  changebussiness: function(e) {
    this.setData({
      bussinessClasify: e.currentTarget.dataset.name
    })
    if (e.currentTarget.dataset.name == 1) {
      this.setData({
        bussinessText: '业务量统计',
        radioText: '业务量',
        radioTextShow: true
      })
    } else if (e.currentTarget.dataset.name == 2) {
      this.setData({
        bussinessText: '接单平均时间(s)',
        radioText: '接单时长占比',
        radioTextShow: true
      })
    } else if (e.currentTarget.dataset.name == 3) {
      this.setData({
        bussinessText: '结案平均时间(min)',
        radioText: '结案时长占比',
        radioTextShow: true
      })
    } else if (e.currentTarget.dataset.name == 4) {
      this.setData({
        bussinessText: '到场率(%)',
        radioTextShow: false
      })
    } else if (e.currentTarget.dataset.name == 5) {
      this.setData({
        bussinessText: '推修成功率(%)',
        radioTextShow: false
      })
    }
    this.toDetail()
  },
  changeRange: function(e) {
    this.setData({
      dataRange: e.currentTarget.dataset.name
    })
    if (e.currentTarget.dataset.name == 2) {
      this.setData({
        start_time: fun_date(-30)
      })
    }
    if (e.currentTarget.dataset.name == 1) {
      this.setData({
        start_time: fun_date(-6)
      })
    }
    this.toDetail()
  },
  toChoose: function(e) {
    var that = this;
    that.data.searchIcon = true
    if (e.detail.value == '') {
      return
    }
    console.log(e.detail.value)
    that.setData({
      weekArr1: [],
      weekArr: [],
      week: [],
      task_search: true,
      cancelSearchIcon: true,
      task_name: e.detail.value
    })
    if (that.data.main_left == 'block') {
      that.onReady()
    } else {
      that.toDetail()
    }

  },
  cancelSearch: function() {
    var that = this
    that.data.searchIcon = false
    this.setData({
      moduIndex: 0,
      moduIndexRequest: that.data.modules[0],
      cancelSearchIcon: false,
      task_search: false,
      keyWordsTemp: '',
      task_name: '',
      short_name: that.data.service_short_name + ' • ',
    })
    this.data.moduIndexRequest = this.data.modules[0]
    if (this.data.main_left == 'block') {
      this.onReady()
    } else {
      this.toDetail()
    }
  },
  onReady: function() {
    var that = this
    wx.showLoading({
      title: '加载中...',
    })

    that.setData({
      moduIndex: 0,
      weekArr1: [],
      weekList: [],
      week: [],
      weekArr: [],
      moduleArr: [],
    })
    this.data.hostName = app.globalData.hostName
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.modules = wx.getStorageSync('module')
    this.data.modules = sort(this.data.modules)
    for (let i in this.data.modules) {
      if (this.data.modules[i] == 1) {
        for (let j in this.data.modules) {
          if (this.data.modules[j] == 2) {
            this.setData({
              hasPush: true
            })
          }
        }
      }
    } 
    this.data.moduIndexRequest = this.data.modules[0]
    var systemWidth = wx.getSystemInfoSync().windowWidth * 0.94 * 0.8 * 0.3;
    var promiseTemp = new Promise(function(resolve, reject) {
      resolve(that);
    });
    promiseTemp.then(data.getOutLine).then(function(res) {
      console.log(res)
      //weekArr1表格的日期

      //weekArr画的图
      if (that.data.searchIcon) {
        if (res.data.count_sum == 0) {
          that.setData({
            noPeople: true,
            noPeopleCancvas: 'none'
          })
          wx.hideLoading()
          return
        } else {
          that.setData({
            noPeople: false,
            noPeopleCancvas: 'block'
          })
        }
      } else {
        that.setData({
          noPeople: false,
          noPeopleCancvas: 'block'
        })
      }
      that.data.week = res.data.week_sum
      for (var i in res.data.week_sum) {

        that.data.weekArr1.push({
          data: i.slice(5).replace('-', '.'),
          number: res.data.week_sum[i]
        })
      }
      console.log(that.data.weekArr1)
      for (var j in res.data.week_service) {
        that.data.weekList.push({
          data: j,
          value: res.data.week_service[j]
        })
      }
      that.setData({
        weekArr1: that.data.weekArr1,
        weekList: that.data.weekList,
        allData: res.data.count_sum,
        month: res.data.count_month_sum,
        today: res.data.count_today_sum,
        weekArr: that.data.weekArr,
        week_list: [],

      })
      console.log(that.data.weekList)
      for (var i in that.data.weekList[0].value) {
        if (i == 'survey') {
          that.data.moduleArr.push('查勘定损')
        } else if (i == 'trailer') {
          that.data.moduleArr.push('拖车')
        } else if (i == 'rescue') {
          that.data.moduleArr.push('紧急救援')
        } else if (i == 'push') {
          var tempType = wx.getStorageSync('type')
          if (tempType == 1) {
            that.data.moduleArr.push('车辆推修')
          } else {
            that.data.moduleArr.push('车辆维修')
          }
        }
      }
      console.log(that.data.moduleArr)
      //that.data.moduIndexRequest = that.data.moduleArr[0]
      if (that.data.searchIcon) {
        if (that.data.moduleArr[0] == '查勘定损') {
          that.data.moduIndexRequest = 1
        } else if (that.data.moduleArr[0] == '拖车') {
          that.data.moduIndexRequest = 3
        } else if (that.data.moduleArr[0] == '紧急救援') {
          that.data.moduIndexRequest = 4
        } else if (that.data.moduleArr[0] == '车辆推修' || that.data.moduleArr[0] == '车辆维修') {
          that.data.moduIndexRequest = 2
        }
      }
      that.setData({
        moduleArr: that.data.moduleArr
      })
      if (that.data.moduleArr.length == 1) {
        that.data.trWidth = '100%'
        that.data.tdWidth = '99%'
      } else if (that.data.moduleArr.length == 2) {
        that.data.trWidth = '100%'
        that.data.tdWidth = '49%'
      } else if (that.data.moduleArr.length == 3) {
        that.data.trWidth = '100%'
        that.data.tdWidth = '32.3%'
      } else if (that.data.moduleArr.length > 3) {
        that.data.trWidth = systemWidth * that.data.moduleArr.length
        that.data.tdWidth = systemWidth
      }
      if (that.data.moduleArr.length > 3) {
        that.setData({
          trWidth: that.data.trWidth + that.data.moduleArr.length + 'px',
          tdWidth: that.data.tdWidth + 'px'
        })
      } else {
        that.setData({
          trWidth: that.data.trWidth,
          tdWidth: that.data.tdWidth
        })
      }
      console.log(that.data.weekArr)
      that.data.contextL = wx.createCanvasContext('line-canvas');
      charles(that, that.data.weekArr, that.data.contextL)
    })
  },
  toDetail: function() {
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      activeLeft: '',
      activeRight: 'active',
      main_left: 'none',
      main_right: 'block',
      week_list: [],
      weekArr: [],
      radiosArr: [],
      week: [],

    })
    //charlesDetail(this, this.data.weekArr, 0)
    var promise = new Promise(function(resolve, reject) {
      resolve(that);
    });
    promise.then(data.getDeatail).then(function(res) {
      console.log(res)
      console.log(res.data.result.ratios)

      if (that.data.bussinessClasify == 1) {
        that.data.moduleArr = []
        //that.data.moduIndex = 0
        for (var i in res.data.result.ratios) {
          if (i == 'trailer') {
            that.data.moduleArr.push('拖车')
          } else if (i == 'rescue') {
            that.data.moduleArr.push('紧急救援')
          } else if (i == 'survey') {
            that.data.moduleArr.push('查勘定损')
          } else if (i == 'push') {
            var tempType = wx.getStorageSync('type')
            if (tempType == 1) {
              that.data.moduleArr.push('车辆推修')
            } else {
              that.data.moduleArr.push('车辆维修')
            }
          }
        }
      }
      if (that.data.bussinessClasify == 4 || that.data.bussinessClasify == 5) {
        for (let i in res.data.result.census_data) {
          var temp = res.data.result.census_data[i]
          res.data.result.census_data[i] = temp.replace('%', '')
          res.data.result.census_data[i] = parseFloat(res.data.result.census_data[i])
          console.log(res.data.result.census_data[i])
        }
      }
      that.setData({
        moduleArr: that.data.moduleArr,
        // moduIndex: 0
      })
      if (res.data.result == '暂无数据' || res.data.result == '没有此作业员') {
        that.setData({
          dataNull: true,
          canvasNull: 'none'
        })
      } else {
        that.setData({
          dataNull: false,
          canvasNull: 'block'
        })
      }
      var tempRadio;
      for (var m in res.data.result.ratios) {
        if (that.data.bussinessClasify == 1) {
          if (m == 'claims') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '代办理赔',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'maintain') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '代办维修',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })

          } else if (m == 'yearbook') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '代办年审',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'trailer') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '拖车',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'rescue') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '紧急救援',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'accident') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '事故车定损',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'used') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '二手车评估',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'sale') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '保险代售',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'survey') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '查勘定损',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'risk') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '风险调查',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'push') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '车辆推修',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          }
          console.log(that.data.radiosArr)
        } else if (that.data.bussinessClasify == 2) {
          if (m == 'sum_3_0') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '0-2秒',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'sum_6_3') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '3-5秒',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })

          } else if (m == 'sum_10_6') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '6-10秒',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })

          } else if (m == 'sum_20_10') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '11-20秒',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'sum_30_20') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '20-30秒',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'sum_50_30') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '30-50秒',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })

          } else if (m == 'sum_50_100') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '50-100秒',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })

          } else if (m == 'sum_100') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '>100秒',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          }
        } else if (that.data.bussinessClasify == 3) {
          if (m == 'sum_0_5') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '<5分钟',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'sum_5_10') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '5-10分钟',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })

          } else if (m == 'sum_10_20') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '10-12分钟',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })

          } else if (m == 'sum_20_30') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '20-30分钟',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'sum_30_40') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '30-40分钟',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          } else if (m == 'sum_40_50') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '40-50分钟',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })

          } else if (m == 'sum_50_60') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '50-60分钟',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })

          } else if (m == 'sum_60') {
            tempRadio = parseFloat(res.data.result.ratios[m][1]) / 100
            that.data.radiosArr.push({
              moduName: '>60分钟',
              width: that.data.radioWidth * tempRadio + 1 + 'px',
              num: res.data.result.ratios[m][0],
              radio: res.data.result.ratios[m][1]
            })
          }
        }
      }
      that.setData({
        radiosArr: that.data.radiosArr
      })
      that.data.week = res.data.result.census_data
      for (var j in res.data.result.census_data) {
        that.data.weekList.push({
          data: j,
          value: res.data.result.census_data[j]
        })
      }
      that.data.contextR = wx.createCanvasContext('line-canvass');
      charles(that, that.data.weekArr, that.data.contextR)
    })

  },
  toOutLine: function() {
    var systemWidth = wx.getSystemInfoSync().windowWidth * 0.94 * 0.8 * 0.3;
    var that = this
    //charles(this, this.data.weekArr, max)
    this.setData({
      dataRange: 1,
      weekList: [],
      weekArr: [],
      weekArr1: [],
      moduleArr: [],
      week: [],
      activeLeft: 'active',
      activeRight: '',
      main_left: 'block',
      main_right: 'none',
      start_time: fun_date(-6)
    })
    this.onReady()
    // var promiseTemp = new Promise(function (resolve, reject) {
    //   resolve(that);
    // });
    // promiseTemp.then(data.getOutLine).then(function (res) {
    //   that.data.week = res.data.result.week
    //   for (var i in res.data.result.week) {
    //     that.data.weekArr1.push({
    //       data: i.slice(5).replace('-', '.'),
    //       number: res.data.result.week[i]
    //     })
    //   }
    //   for (var j in res.data.result.week_list) {
    //     that.data.weekList.push({
    //       data: j,
    //       value: res.data.result.week_list[j]
    //     })
    //   }
    //   that.setData({
    //     weekList: that.data.weekList,
    //     weekArr1: that.data.weekArr1,
    //     allData: res.data.result.total,
    //     month: res.data.result.month,
    //     today: res.data.result.today,
    //     weekArr: that.data.weekArr,
    //     week_list: []
    //   })
    //   for (var i in that.data.weekList[0].value) {
    //     if (i == 'claims') {
    //       that.data.moduleArr.push('代办理赔')
    //     } else if (i == 'maintain') {
    //       that.data.moduleArr.push('维修保养')
    //     } else if (i == 'yearbook') {
    //       that.data.moduleArr.push('代办年审')
    //     } else if (i == 'trailer') {
    //       that.data.moduleArr.push('拖车')
    //     } else if (i == 'rescue') {
    //       that.data.moduleArr.push('紧急救援')
    //     } else if (i == 'accident') {
    //       that.data.moduleArr.push('事故车定损')
    //     } else if (i == 'used') {
    //       that.data.moduleArr.push('二手车评估')
    //     } else if (i == 'sale') {
    //       that.data.moduleArr.push('保险代售')
    //     } else if (i == 'survey') {
    //       that.data.moduleArr.push('查勘定损')
    //     } else if (i == 'risk') {
    //       that.data.moduleArr.push('风险调查')
    //     } else if (i == 'push') {
    //       var tempType = wx.getStorageSync('type')
    //       if (tempType == 1) {
    //         that.data.moduleArr.push('车辆推修')
    //       } else {
    //         that.data.moduleArr.push('车辆维修')
    //       }
    //     }
    //   }
    //   that.setData({
    //     moduleArr: that.data.moduleArr
    //   })
    //   if (that.data.moduleArr.length == 1) {
    //     that.data.trWidth = '100%'
    //     that.data.tdWidth = '99%'
    //   } else if (that.data.moduleArr.length == 2) {
    //     that.data.trWidth = '100%'
    //     that.data.tdWidth = '49%'
    //   } else if (that.data.moduleArr.length == 3) {
    //     that.data.trWidth = '100%'
    //     that.data.tdWidth = '32.3%'
    //   } else if (that.data.moduleArr.length > 3) {
    //     that.data.trWidth = systemWidth * that.data.moduleArr.length
    //     that.data.tdWidth = systemWidth
    //   }
    //   if (that.data.moduleArr.length > 3) {
    //     that.setData({
    //       trWidth: that.data.trWidth + that.data.moduleArr.length + 'px',
    //       tdWidth: that.data.tdWidth + 'px'
    //     })
    //   } else {
    //     that.setData({
    //       trWidth: that.data.trWidth,
    //       tdWidth: that.data.tdWidth
    //     })
    //   }
    //   that.data.contextL = wx.createCanvasContext('line-canvas');
    //   charles(that, that.data.weekArr, that.data.contextL)
    // })
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
  changeModule: function(e) {
    this.setData({
      moduIndex: e.detail.value
    })
    e.target.id = this.data.moduleArr[this.data.moduIndex]
    if (e.target.id == '拖车') {
      this.data.moduIndexRequest = 3
    } else if (e.target.id == '紧急救援') {
      this.data.moduIndexRequest = 4
    } else if (e.target.id == '查勘定损') {
      this.data.moduIndexRequest = 1
    } else if (e.target.id == '车辆推修' || e.target.id == '车辆维修') {
      this.data.moduIndexRequest = 2
    }

    this.toDetail()
  },

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
  for (var i in that.data.week) {
    if (that.data.week[i] > max) {
      max = that.data.week[i]
    }
    that.data.weekArr.push({
      data: i.slice(5).replace('-', '.'),
      number: that.data.week[i]
    })
  }
  that.setData({
    pointArr: [],
    weekArr: that.data.weekArr,
    arr: that.data.weekArr
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
  draw(that, max, context, arr, duration, tempaa)
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

function sort(arr) {
  for (var j = 0; j < arr.length - 1; j++) {
    //两两比较，如果前一个比后一个大，则交换位置。
    for (var i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] > arr[i + 1]) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr
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
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]) //转换为12-18-2002格式  
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
  return iDays
}