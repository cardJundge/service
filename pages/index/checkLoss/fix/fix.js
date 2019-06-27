// pages/index/mine/myCar/AddmyCar/AddmyCar.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '推修',
    series: [],
    toViewModal: 'A',
    selectCar: '',
    selectCarName: '',
    selectSeries: '',
    selectSeriesName: '',
    allList: [{
        id: 'A',
        list: []
      },
      {
        id: 'B',
        list: []
      },
      {
        id: 'C',
        list: []
      },
      {
        id: 'D',
        list: []
      },
      {
        id: 'E',
        list: []
      },
      {
        id: 'F',
        list: []
      },
      {
        id: 'G',
        list: []
      },
      {
        id: 'H',
        list: []
      },
      {
        id: 'I',
        list: []
      },
      {
        id: 'J',
        list: []
      },
      {
        id: 'K',
        list: []
      },
      {
        id: 'L',
        list: []
      },
      {
        id: 'M',
        list: []
      },
      {
        id: 'N',
        list: []
      },
      {
        id: 'O',
        list: []
      },
      {
        id: 'P',
        list: []
      },
      {
        id: 'Q',
        list: []
      },
      {
        id: 'R',
        list: []
      },
      {
        id: 'S',
        list: []
      },
      {
        id: 'T',
        list: []
      },
      {
        id: 'V',
        list: []
      },
      {
        id: 'W',
        list: []
      },
      {
        id: 'X',
        list: []
      },
      {
        id: 'Y',
        list: []
      },
      {
        id: 'Z',
        list: []
      },

    ],
    letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
    Alist: [],
    Blist: [],
    Clist: [],
    Dlist: [],
    Elist: [],
    Flist: [],
    Glist: [],
    Hlist: [],
    Ilist: [],
    Jlist: [],
    Klist: [],
    Llist: [],
    Mlist: [],
    Nlist: [],
    Olist: [],
    Plist: [],
    Qlist: [],
    Rlist: [],
    Slist: [],
    Tlist: [],
    Ulist: [],
    Vlist: [],
    Wlist: [],
    Xlist: [],
    Ylist: [],
    Zlist: []
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.sessionId = wx.getStorageSync('PHPSESSID');
    this.data.listId = options.listId
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
    console.log(this.data.listId)
    if (options.survey){
      this.setData({
        survey: options.survey
      })
    }
    this.setData({
      hostName: test,
      moduNum: options.module
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  chooseSeries: function(e) {
    console.log(e)
    this.data.selectSeries = e.currentTarget.id
    for (var i in this.data.series) {
      if (this.data.series[i].id == e.currentTarget.id) {
        if (this.data.series[i].short_name) {
          this.setData({
            selectSeriesName: this.data.series[i].short_name
          })
        } else {
          this.setData({
            selectSeriesName: this.data.series[i].name
          })
        }
        this.data.series[i].class = 'each_series active_series'
      } else {
        this.data.series[i].class = 'each_series'
      }
    }
    this.setData({
      series: this.data.series
    })
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  onReady: function() {
    var that = this;
    var systemHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      systemHeight: systemHeight + 'px',
      systemHeightC: (systemHeight - 20) + 'px'
    })
    wx.request({
      url: test + 'service/index/brand_relation',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      }, // 默认值
      success: function(res) {
        console.log(res)
        var dataType = typeof res.data.data
        console.log(dataType)
        if (dataType == 'string') {
          var jsonStr = res.data.data;
          jsonStr = jsonStr.replace(" ", "");
          var temp
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
            temp = JSON.parse(jsonStr);
            res.data.data = temp;
          }
        }
        console.log(res)
        if (res.data.data.length != 0) {
          for (var i in res.data.data) {
            if (res.data.data[i].first_name == 'A') {
              that.data.Alist.push(res.data.data[i])
              that.data.Alist[that.data.Alist.length - 1].class = 'brand_cell'
              for (var j in that.data.Alist[that.data.Alist.length - 1].service) {
                that.data.Alist[that.data.Alist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[0].list.push(that.data.Alist[that.data.Alist.length - 1])

            } else if (res.data.data[i].first_name == 'B') {
              that.data.Blist.push(res.data.data[i])
              that.data.Blist[that.data.Blist.length - 1].class = 'brand_cell'
              for (var j in that.data.Blist[that.data.Blist.length - 1].service) {
                that.data.Blist[that.data.Blist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[1].list.push(that.data.Blist[that.data.Blist.length - 1])
            } else if (res.data.data[i].first_name == 'C') {
              that.data.Clist.push(res.data.data[i])
              that.data.Clist[that.data.Clist.length - 1].class = 'brand_cell'
              for (var j in that.data.Clist[that.data.Clist.length - 1].service) {
                that.data.Clist[that.data.Clist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[2].list.push(that.data.Clist[that.data.Clist.length - 1])
            } else if (res.data.data[i].first_name == 'D') {
              that.data.Dlist.push(res.data.data[i])
              that.data.Dlist[that.data.Dlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Dlist[that.data.Dlist.length - 1].service) {
                that.data.Dlist[that.data.Dlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[3].list.push(that.data.Dlist[that.data.Dlist.length - 1])
            } else if (res.data.data[i].first_name == 'E') {
              that.data.Elist.push(res.data.data[i])
              that.data.Elist[that.data.Elist.length - 1].class = 'brand_cell'
              for (var j in that.data.Elist[that.data.Elist.length - 1].service) {
                that.data.Dlist[that.data.Dlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[4].list.push(that.data.Elist[that.data.Elist.length - 1])
            } else if (res.data.data[i].first_name == 'F') {
              that.data.Flist.push(res.data.data[i])
              that.data.Flist[that.data.Flist.length - 1].class = 'brand_cell'
              for (var j in that.data.Flist[that.data.Flist.length - 1].service) {
                that.data.Flist[that.data.Flist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[5].list.push(that.data.Flist[that.data.Flist.length - 1])
            } else if (res.data.data[i].first_name == 'G') {
              that.data.Glist.push(res.data.data[i])
              that.data.Glist[that.data.Glist.length - 1].class = 'brand_cell'
              for (var j in that.data.Glist[that.data.Glist.length - 1].service) {
                that.data.Glist[that.data.Glist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[6].list.push(that.data.Glist[that.data.Glist.length - 1])
            } else if (res.data.data[i].first_name == 'H') {
              that.data.Hlist.push(res.data.data[i])
              that.data.Hlist[that.data.Hlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Hlist[that.data.Hlist.length - 1].service) {
                that.data.Hlist[that.data.Hlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[7].list.push(that.data.Hlist[that.data.Hlist.length - 1])
            } else if (res.data.data[i].first_name == 'I') {
              that.data.Ilist.push(res.data.data[i])
              that.data.Ilist[that.data.Ilist.length - 1].class = 'brand_cell'
              for (var j in that.data.Ilist[that.data.Ilist.length - 1].service) {
                that.data.Ilist[that.data.Ilist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[8].list.push(that.data.Ilist[that.data.Ilist.length - 1])
            } else if (res.data.data[i].first_name == 'J') {
              that.data.Jlist.push(res.data.data[i])
              that.data.Jlist[that.data.Jlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Jlist[that.data.Jlist.length - 1].service) {
                that.data.Jlist[that.data.Jlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[9].list.push(that.data.Jlist[that.data.Jlist.length - 1])
            } else if (res.data.data[i].first_name == 'K') {
              that.data.Klist.push(res.data.data[i])
              that.data.Klist[that.data.Klist.length - 1].class = 'brand_cell'
              for (var j in that.data.Klist[that.data.Klist.length - 1].service) {
                that.data.Klist[that.data.Klist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[10].list.push(that.data.Klist[that.data.Klist.length - 1])
            } else if (res.data.data[i].first_name == 'L') {
              that.data.Llist.push(res.data.data[i])
              that.data.Llist[that.data.Llist.length - 1].class = 'brand_cell'
              for (var j in that.data.Llist[that.data.Llist.length - 1].service) {
                that.data.Llist[that.data.Llist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[11].list.push(that.data.Llist[that.data.Llist.length - 1])
            } else if (res.data.data[i].first_name == 'M') {
              that.data.Mlist.push(res.data.data[i])
              that.data.Mlist[that.data.Mlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Mlist[that.data.Mlist.length - 1].service) {
                that.data.Mlist[that.data.Mlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[12].list.push(that.data.Mlist[that.data.Mlist.length - 1])
            } else if (res.data.data[i].first_name == 'N') {
              that.data.Nlist.push(res.data.data[i])
              that.data.Nlist[that.data.Nlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Nlist[that.data.Nlist.length - 1].service) {
                that.data.Nlist[that.data.Nlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[13].list.push(that.data.Nlist[that.data.Nlist.length - 1])
            } else if (res.data.data[i].first_name == 'O') {
              that.data.Olist.push(res.data.data[i])
              that.data.Olist[that.data.Olist.length - 1].class = 'brand_cell'
              for (var j in that.data.Olist[that.data.Olist.length - 1].service) {
                that.data.Olist[that.data.Olist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[14].list.push(that.data.Olist[that.data.Olist.length - 1])
            } else if (res.data.data[i].first_name == 'P') {
              that.data.Plist.push(res.data.data[i])
              that.data.Plist[that.data.Plist.length - 1].class = 'brand_cell'
              for (var j in that.data.Plist[that.data.Plist.length - 1].service) {
                that.data.Plist[that.data.Plist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[15].list.push(that.data.Plist[that.data.Plist.length - 1])
            } else if (res.data.data[i].first_name == 'Q') {
              that.data.Qlist.push(res.data.data[i])
              that.data.Qlist[that.data.Qlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Qlist[that.data.Qlist.length - 1].service) {
                that.data.Qlist[that.data.Qlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[16].list.push(that.data.Qlist[that.data.Qlist.length - 1])
            } else if (res.data.data[i].first_name == 'R') {
              that.data.Rlist.push(res.data.data[i])
              that.data.Rlist[that.data.Rlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Rlist[that.data.Rlist.length - 1].service) {
                that.data.Rlist[that.data.Rlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[17].list.push(that.data.Rlist[that.data.Rlist.length - 1])
            } else if (res.data.data[i].first_name == 'S') {
              that.data.Slist.push(res.data.data[i])
              that.data.Slist[that.data.Slist.length - 1].class = 'brand_cell'
              for (var j in that.data.Slist[that.data.Slist.length - 1].service) {
                that.data.Slist[that.data.Slist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[18].list.push(that.data.Slist[that.data.Slist.length - 1])
            } else if (res.data.data[i].first_name == 'T') {
              that.data.Tlist.push(res.data.data[i])
              that.data.Tlist[that.data.Tlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Tlist[that.data.Tlist.length - 1].service) {
                that.data.Tlist[that.data.Tlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[19].list.push(that.data.Tlist[that.data.Tlist.length - 1])
            } else if (res.data.data[i].first_name == 'V') {
              that.data.Vlist.push(res.data.data[i])
              that.data.Vlist[that.data.Vlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Vlist[that.data.Vlist.length - 1].service) {
                that.data.Vlist[that.data.Vlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[20].list.push(that.data.Vlist[that.data.Vlist.length - 1])
            } else if (res.data.data[i].first_name == 'W') {
              that.data.Wlist.push(res.data.data[i])
              that.data.Wlist[that.data.Wlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Wlist[that.data.Wlist.length - 1].service) {
                that.data.Wlist[that.data.Wlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[21].list.push(that.data.Wlist[that.data.Wlist.length - 1])
            } else if (res.data.data[i].first_name == 'X') {
              that.data.Xlist.push(res.data.data[i])
              that.data.Xlist[that.data.Xlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Xlist[that.data.Xlist.length - 1].service) {
                that.data.Xlist[that.data.Xlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[22].list.push(that.data.Xlist[that.data.Xlist.length - 1])
            } else if (res.data.data[i].first_name == 'Y') {
              that.data.Ylist.push(res.data.data[i])
              that.data.Ylist[that.data.Ylist.length - 1].class = 'brand_cell'
              for (var j in that.data.Ylist[that.data.Ylist.length - 1].service) {
                that.data.Ylist[that.data.Ylist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[23].list.push(that.data.Ylist[that.data.Ylist.length - 1])
            } else if (res.data.data[i].first_name == 'Z') {
              that.data.Zlist.push(res.data.data[i])
              that.data.Zlist[that.data.Zlist.length - 1].class = 'brand_cell'
              for (var j in that.data.Zlist[that.data.Zlist.length - 1].service) {
                that.data.Zlist[that.data.Zlist.length - 1].service[j].class = 'each_series'
              }
              that.data.allList[24].list.push(that.data.Zlist[that.data.Zlist.length - 1])
            }
          }
          console.log(that.data.allList)
          console.log('kkkkk')
          for (var i in that.data.allList) {
            //console.log(that.data.allList[i].list.length)
            if (that.data.allList[i].list.length != 0) {
              console.log(i)
              that.data.allList[i].list[0].class = 'brand_cell active';
              that.data.allList[i].list[0].service[0].class = 'each_series active_series'
              that.setData({
                allList: that.data.allList,
                series: that.data.allList[i].list[0].service
              })
              that.data.selectSeries = that.data.allList[i].list[0].service[0].id

              if (that.data.allList[i].list[0].service[0].short_name) {
                that.data.selectSeriesName = that.data.allList[i].list[0].service[0].short_name
              } else {
                that.data.selectSeriesName = that.data.allList[i].list[0].service[0].name
              }
              that.data.selectCar = that.data.allList[i].list[0].id
              that.setData({
                selectCarName: that.data.allList[i].list[0].name,
                loaded: true
              })
              break
            }

          }
          console.log(that.data.allList)

          console.log('lll')

          console.log('pppp')

        } else {
          that.setData({
            noService: true
          })
          
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  changeSeries: function(e) {
    console.log(e)
    console.log(e.currentTarget.id)
    var letter = e.currentTarget.dataset.letter
    this.data.selectCar = e.currentTarget.id;
    this.data.selectCarName = e.currentTarget.dataset.name
    console.log(this.data.allList)
    for (var i in this.data.allList) {
      if (this.data.allList[i].id == letter) {
        for (var j in this.data.allList[i].list) {
          if (this.data.allList[i].list[j].id == e.currentTarget.id) {
            if (this.data.allList[i].list[j].service[0].short_name) {
              this.data.selectSeries = this.data.allList[i].list[j].service[0].id
              this.data.selectSeriesName = this.data.allList[i].list[j].service[0].short_name
            } else {
              this.data.selectSeries = this.data.allList[i].list[j].service[0].id
              this.data.selectSeriesName = this.data.allList[i].list[j].service[0].name
            }
            this.data.allList[i].list[j].service[0].class = 'each_series active_series'
            this.setData({
              series: this.data.allList[i].list[j].service
            })
            this.data.allList[i].list[j].class = 'brand_cell active'
          } else {
            this.data.allList[i].list[j].class = 'brand_cell'
          }
        }
      } else {
        for (var j in this.data.allList[i].list) {
          this.data.allList[i].list[j].class = 'brand_cell'
        }
      }
    }
    this.setData({
      allList: this.data.allList
    })

  },
  toView: function(e) {
    var that = this
    this.setData({
      animation: true,
      toViewModal: e.currentTarget.id
    })
    setTimeout(function() {
      that.setData({
        animation: false,
      })
    }, 500)
  },
  optionCar: function() {
    var that = this
    this.setData({
      ok_btn:true
    })
    console.log(this.data.selectCar)
    console.log(this.data.selectCarName)
    console.log(this.data.selectSeries)
    console.log(this.data.selectSeriesName)

    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    var temp = {}
    temp.dataId = this.data.selectCar
    temp.dataName = this.data.selectCarName
    temp.seriesId = this.data.selectSeries
    temp.seriesName = this.data.selectSeriesName
    temp.has = true
    prevPage.setData({
      carData: temp
    })
    if (that.data.listId == 'special') {

      wx.navigateBack({
        delta: 1
      })
      return
    }
    wx.setStorageSync('freshFlag', true)
    var moduType;
    if (that.data.moduNum == 9) {
      wx.request({
        url: test + 'service/survey/push',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + this.data.sessionId
        }, // 默认值
        data: {
          id: this.data.listId,
          brand_id: this.data.selectCar,
          service_id: this.data.selectSeries,
          report_no:this.data.survey
        },
        success: function(res) {
          console.log(res)
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
            title: '推送成功',
            duration: 500
          })

          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 500)
        }
      })
    } else if (that.data.moduNum == 11) {
      wx.request({
        url: test + 'service/push/push',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + this.data.sessionId
        }, // 默认值
        data: {
          survey_no: this.data.listId,
          service_id: this.data.selectSeries,
        },
        success: function(res) {
          console.log(res)
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
            title: '推送成功',
            duration: 500
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 500)
        }
      })
    } else if (that.data.moduNum == 111) {
      wx.request({
        url: test + 'service/survey/again_push',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + this.data.sessionId
        }, // 默认值
        data: {
          id: this.data.listId,
          brand_id: this.data.selectCar,
          service_id: this.data.selectSeries,
        },
        success: function(res) {
          console.log(res)
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
          addProgress1(that)
        }
      })
    }


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

  }
})

function addProgress1(that) {
  var title = ''

  wx.request({
    url: test + 'service/push/schedule',
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'PHPSESSID=' + that.data.sessionId
    }, // 默认值
    data: {
      case_id: that.data.listId,
      title: '案件已撤回',
      content: '',
      picture: '',
      type:2
    },
    success: function(res) {
      wx.showToast({
        title: '重修成功',
        duration: 500
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 500)
    }
  })
}