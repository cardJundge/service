// pages/index/mine/myCar/AddmyCar/AddmyCar.js
var test = getApp().globalData.hostName;
var test1 = getApp().globalData.hostName1;
Page({
  data: {
    titTop: '128rpx',
    top:'99px',
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '关联服务商',
    animationData: {},
    serviceArr: [],
    selectMenuID: 0,
    result: [],
    selectSeries: [],
    show_all: true,
    series: [],
    toViewModal: 'A',
    selectCar: '',
    selectCarName: '',
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
    var that = this
    this.setData({
      hostName: test
    })
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        titTop: '180rpx',
        top: '125px',
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
    getRelated(that)
  },
  chooseSeries: function(e) {
    var that=this
    console.log(e.currentTarget.id)
    if (e.currentTarget.id == 'false' || !e.currentTarget.id) {
      return
    }
    var temp = {
      relation_id: parseInt(e.currentTarget.id),
      brand_id: this.data.selectCar
    }
    console.log(temp)
    console.log(this.data.result)
    for (var m in this.data.result) {
      if (this.data.result[m].brand_id == temp.brand_id) {
        if (this.data.result[m].relation_id == temp.relation_id) {
          this.data.result.splice(m, 1)
          for (var n in this.data.series) {
            if (this.data.series[n].id == e.currentTarget.id) {
              this.data.series[n].class = 'each_series'
            }
          }
          this.setData({
            series: this.data.series
          })
          console.log(this.data.result)
          return
        }
      }

    }
    this.setData({
      modalLevel: true
    })
    that.data.tempArr = {
      relation_id: parseInt(e.currentTarget.id),
      brand_id: this.data.selectCar
    }
    // this.data.result.push({
    //   relation_id: parseInt(e.currentTarget.id),
    //   brand_id: this.data.selectCar
    // })
    // for (var i in this.data.series) {
    //   if (this.data.series[i].id == e.currentTarget.id) {
    //     this.data.series[i].class = 'each_series active_series'
    //   }
    // }
    // this.setData({
    //   series: this.data.series
    // })
  },
  okAddSercice:function(e){
    var that=this
    console.log(e.detail.value.level)
     this.data.result.push({
       relation_id: that.data.tempArr.relation_id,
       brand_id: that.data.tempArr.brand_id,
       level: e.detail.value.level
    })
    for (var i in this.data.series) {
      if (this.data.series[i].id == that.data.tempArr.relation_id) {
        this.data.series[i].class = 'each_series active_series'
      }
    }
    this.setData({
      series: this.data.series,
      modalLevel:false
    })
    console.log(this.data.result)

  },
  showAll: function() {
    this.setData({
      show_all: !this.data.show_all
    })
  },
  onReady: function() {
    var that = this;

    var systemHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      systemHeight: systemHeight + 'px',
      systemHeightC: (systemHeight - 65) + 'px',
      systemHeightRight: (systemHeight + 100) + 'px',
    })

  },
  onShow: function() {},
  changeSeries: function(e) {
    var that = this
    var animation = wx.createAnimation({
      transformOrigin: "0 0",
      duration: 100,
      timingFunction: "ease-in",
      delay: 0
    })
    that.animation = animation
    animation.opacity(0).step()
    that.setData({
      animationData: animation.export()
    })
    console.log(e)
    var letter = e.currentTarget.dataset.letter
    this.data.selectCar = e.currentTarget.id;
    for (var i in this.data.allList) {
      if (this.data.allList[i].id == letter) {
        for (var j in this.data.allList[i].list) {
          if (this.data.allList[i].list[j].id == e.currentTarget.id) {
            this.setData({
              selectCarName: this.data.allList[i].list[j].name
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
    this.data.first_id = e.currentTarget.id
    getSeries(that)
  },
  cancelModal: function() {
    this.setData({
      modalLevel:false
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
    // console.log(that.data.result)
    var moudlestr = '';
    wx.request({
      url: test1 + 'service/index/setRelation',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        result: that.data.result
      },
      success: function(res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '添加成功',
            duration: 500
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: '操作超时',
            duration: 1000
          })
        }

      }
    })

  },
  checkName: function(e) {
    // console.log(e)
  },
  switchToRight: function(e) {
    this.setData({
      selectMenuID: e.currentTarget.dataset.index
    })
    // console.log(e.currentTarget.dataset.index)
  }
})


function getRelated(that) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: test + 'service/index/relation_service',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      },
      success: function(res) {
        console.log('拿到的合作服务商列表',res.data.service)
        if(res.data.status == 1) {
          that.setData({
            serviceArr: res.data.service
          })
          getBrand(that)
        } else  {
          getBrand(that)
        }
        // var temp = that.data.selectSeries;
        // var tag = true;
        // console.log(res)
        // if (res.data.status == 1) {
        //   for (var i in res.data.service) {
        //     for (var j in res.data.service[i].service) {

        //       that.data.result.push({
        //         relation_id: res.data.service[i].service[j].id,
        //         brand_id: res.data.service[i].id,
        //         level: res.data.service[i].service[j].level
        //       })
        //     }
        //   }
        //   console.log('xxxxx',that.data.result)
        //   var cell = false;
        //   var cell_con = false
        //   for (var m in res.data.service) {
        //     for (var n in res.data.service[m].service) {
        //       for (var t in that.data.serviceArr) {
        //         if (that.data.serviceArr[t].service_id == res.data.service[m].service[n].id) {
        //           that.data.serviceArr[t].brand.push({
        //             brand_id: res.data.service[m].id,
        //             brand_name: res.data.service[m].name
        //           })
        //           if (n == res.data.service[m].service.length - 1) {
        //             cell = true
        //           }
        //           cell_con = true
        //         }
        //       }
        //       if (cell_con) {
        //         cell_con = false
        //         break
        //       }
        //       that.data.serviceArr.push({
        //         service_id: res.data.service[m].service[n].id,
        //         service_name: res.data.service[m].service[n].name,
        //         service_sname: res.data.service[m].service[n].short_name,
        //         brand: [{
        //           brand_id: res.data.service[m].id,
        //           brand_name: res.data.service[m].name
        //         }]
        //       })
        //     }
        //     if (cell_con) {
        //       cell_con = false
        //       break
        //     }
        //   }
        //   that.setData({
        //     serviceArr: that.data.serviceArr
        //   })
        //   getBrand(that)

        //   console.log(that.data.result)
        // } else {
        //   getBrand(that)
        //   resolve(that)
        // }

      }
    })
  })

}

function getBrand(that) {
  wx.request({
    url: test + 'service/index/brands',
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
      for (var i in res.data.brand) {
        if (res.data.brand[i].first_name == 'A') {
          that.data.Alist.push(res.data.brand[i])
          that.data.Alist[that.data.Alist.length - 1].class = 'brand_cell'
          that.data.allList[0].list.push(that.data.Alist[that.data.Alist.length - 1])
        } else if (res.data.brand[i].first_name == 'B') {
          that.data.Blist.push(res.data.brand[i])
          that.data.Blist[that.data.Blist.length - 1].class = 'brand_cell'
          that.data.allList[1].list.push(that.data.Blist[that.data.Blist.length - 1])
        } else if (res.data.brand[i].first_name == 'C') {
          that.data.Clist.push(res.data.brand[i])
          that.data.Clist[that.data.Clist.length - 1].class = 'brand_cell'
          that.data.allList[2].list.push(that.data.Clist[that.data.Clist.length - 1])
        } else if (res.data.brand[i].first_name == 'D') {
          that.data.Dlist.push(res.data.brand[i])
          that.data.Dlist[that.data.Dlist.length - 1].class = 'brand_cell'
          that.data.allList[3].list.push(that.data.Dlist[that.data.Dlist.length - 1])
        } else if (res.data.brand[i].first_name == 'E') {
          that.data.Elist.push(res.data.brand[i])
          that.data.Elist[that.data.Elist.length - 1].class = 'brand_cell'
          that.data.allList[4].list.push(that.data.Elist[that.data.Elist.length - 1])
        } else if (res.data.brand[i].first_name == 'F') {
          that.data.Flist.push(res.data.brand[i])
          that.data.Flist[that.data.Flist.length - 1].class = 'brand_cell'
          that.data.allList[5].list.push(that.data.Flist[that.data.Flist.length - 1])
        } else if (res.data.brand[i].first_name == 'G') {
          that.data.Glist.push(res.data.brand[i])
          that.data.Glist[that.data.Glist.length - 1].class = 'brand_cell'
          that.data.allList[6].list.push(that.data.Glist[that.data.Glist.length - 1])
        } else if (res.data.brand[i].first_name == 'H') {
          that.data.Hlist.push(res.data.brand[i])
          that.data.Hlist[that.data.Hlist.length - 1].class = 'brand_cell'
          that.data.allList[7].list.push(that.data.Hlist[that.data.Hlist.length - 1])
        } else if (res.data.brand[i].first_name == 'I') {
          that.data.Ilist.push(res.data.brand[i])
          that.data.Ilist[that.data.Ilist.length - 1].class = 'brand_cell'
          that.data.allList[8].list.push(that.data.Ilist[that.data.Ilist.length - 1])
        } else if (res.data.brand[i].first_name == 'J') {
          that.data.Jlist.push(res.data.brand[i])
          that.data.Jlist[that.data.Jlist.length - 1].class = 'brand_cell'
          that.data.allList[9].list.push(that.data.Jlist[that.data.Jlist.length - 1])
        } else if (res.data.brand[i].first_name == 'K') {
          that.data.Klist.push(res.data.brand[i])
          that.data.Klist[that.data.Klist.length - 1].class = 'brand_cell'
          that.data.allList[10].list.push(that.data.Klist[that.data.Klist.length - 1])
        } else if (res.data.brand[i].first_name == 'L') {
          that.data.Llist.push(res.data.brand[i])
          that.data.Llist[that.data.Llist.length - 1].class = 'brand_cell'
          that.data.allList[11].list.push(that.data.Llist[that.data.Llist.length - 1])
        } else if (res.data.brand[i].first_name == 'M') {
          that.data.Mlist.push(res.data.brand[i])
          that.data.Mlist[that.data.Mlist.length - 1].class = 'brand_cell'
          that.data.allList[12].list.push(that.data.Mlist[that.data.Mlist.length - 1])
        } else if (res.data.brand[i].first_name == 'N') {
          that.data.Nlist.push(res.data.brand[i])
          that.data.Nlist[that.data.Nlist.length - 1].class = 'brand_cell'
          that.data.allList[13].list.push(that.data.Nlist[that.data.Nlist.length - 1])
        } else if (res.data.brand[i].first_name == 'O') {
          that.data.Olist.push(res.data.brand[i])
          that.data.Olist[that.data.Olist.length - 1].class = 'brand_cell'
          that.data.allList[14].list.push(that.data.Olist[that.data.Olist.length - 1])
        } else if (res.data.brand[i].first_name == 'P') {
          that.data.Plist.push(res.data.brand[i])
          that.data.Plist[that.data.Plist.length - 1].class = 'brand_cell'
          that.data.allList[15].list.push(that.data.Plist[that.data.Plist.length - 1])
        } else if (res.data.brand[i].first_name == 'Q') {
          that.data.Qlist.push(res.data.brand[i])
          that.data.Qlist[that.data.Qlist.length - 1].class = 'brand_cell'
          that.data.allList[16].list.push(that.data.Qlist[that.data.Qlist.length - 1])
        } else if (res.data.brand[i].first_name == 'R') {
          that.data.Rlist.push(res.data.brand[i])
          that.data.Rlist[that.data.Rlist.length - 1].class = 'brand_cell'
          that.data.allList[17].list.push(that.data.Rlist[that.data.Rlist.length - 1])
        } else if (res.data.brand[i].first_name == 'S') {
          that.data.Slist.push(res.data.brand[i])
          that.data.Slist[that.data.Slist.length - 1].class = 'brand_cell'
          that.data.allList[18].list.push(that.data.Slist[that.data.Slist.length - 1])
        } else if (res.data.brand[i].first_name == 'T') {
          that.data.Tlist.push(res.data.brand[i])
          that.data.Tlist[that.data.Tlist.length - 1].class = 'brand_cell'
          that.data.allList[19].list.push(that.data.Tlist[that.data.Tlist.length - 1])
        } else if (res.data.brand[i].first_name == 'V') {
          that.data.Vlist.push(res.data.brand[i])
          that.data.Vlist[that.data.Vlist.length - 1].class = 'brand_cell'
          that.data.allList[20].list.push(that.data.Vlist[that.data.Vlist.length - 1])
        } else if (res.data.brand[i].first_name == 'W') {
          that.data.Wlist.push(res.data.brand[i])
          that.data.Wlist[that.data.Wlist.length - 1].class = 'brand_cell'
          that.data.allList[21].list.push(that.data.Wlist[that.data.Wlist.length - 1])
        } else if (res.data.brand[i].first_name == 'X') {
          that.data.Xlist.push(res.data.brand[i])
          that.data.Xlist[that.data.Xlist.length - 1].class = 'brand_cell'
          that.data.allList[22].list.push(that.data.Xlist[that.data.Xlist.length - 1])
        } else if (res.data.brand[i].first_name == 'Y') {
          that.data.Ylist.push(res.data.brand[i])
          that.data.Ylist[that.data.Ylist.length - 1].class = 'brand_cell'
          that.data.allList[23].list.push(that.data.Ylist[that.data.Ylist.length - 1])
        } else if (res.data.brand[i].first_name == 'Z') {
          that.data.Zlist.push(res.data.brand[i])
          that.data.Zlist[that.data.Zlist.length - 1].class = 'brand_cell'
          that.data.allList[24].list.push(that.data.Zlist[that.data.Zlist.length - 1])
        }

      }
      that.data.allList[0].list[0].class = 'brand_cell active'
      that.setData({
        allList: that.data.allList
      })
      that.data.selectCar = that.data.allList[0].list[0].id
      that.setData({
        selectCarName: that.data.allList[0].list[0].name
      })
      that.data.first_id = that.data.Alist[0].id
      getSeries(that)
    }
  })
}

function getSeries(that) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: test + 'service/index/getBrandService',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        id: that.data.first_id
      },
      success: function(res) {
        console.log(that.data.selectSeries)
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
          series: []
        })

        if (res.data.status == 1) {
          console.log(res.data)
          that.setData({
            loaded: true,
            series: res.data.service
          })
          console.log(that.data.result)
          if (that.data.result.length != 0) {
            for (var i in that.data.series) {
              that.data.series[i].class = 'each_series'
            }
            console.log(that.data.result)

            for (var i in that.data.result) {
              if (that.data.result[i].brand_id == that.data.selectCar) {
                console.log(that.data.selectCar)
                for (var m in that.data.series) {
                  console.log(m)
                  if (that.data.result[i].relation_id == that.data.series[m].id) {
                    console.log(that.data.series[m].name)
                    that.data.series[m].class = 'each_series active_series'
                  }
                }

              }
            }
          } else {
            for (var i in that.data.series) {
              that.data.series[i].class = 'each_series'
            }
          }
          that.setData({
            series: that.data.series
          })
          console.log(that.data.series)
        } else {
          var temp = 'series[' + 0 + ']'
          that.setData({
            [temp]: {
              loaded: true,
              id: false,
              name: '暂无服务商',
              class: 'each_series'
            }
          })
        }
        var animation = wx.createAnimation({
          transformOrigin: "0 0",
          duration: 100,
          timingFunction: "ease-in",
          delay: 0
        })
        that.animation = animation
        animation.opacity(1).step()
        that.setData({
          animationData: animation.export()
        })
        that.setData({
          loaded: true
        })

        resolve(that)
      }
    })
  })

}