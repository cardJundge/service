// pages/index/mine/myCar/AddmyCar/AddmyCar.js
var test = getApp().globalData.hostName;
Page({
  data: {
    marginTop:'64px',
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '关联品牌',
    series: [],
    show_all:true,
    toViewModal: 'A',
    selectCar: '',
    selectCarName: '',
    selectSeries: '',
    selectSeriesName: '',
    allList: [
      { id: 'A', list: [] },
      { id: 'B', list: [] },
      { id: 'C', list: [] },
      { id: 'D', list: [] },
      { id: 'E', list: [] },
      { id: 'F', list: [] },
      { id: 'G', list: [] },
      { id: 'H', list: [] },
      { id: 'I', list: [] },
      { id: 'J', list: [] },
      { id: 'K', list: [] },
      { id: 'L', list: [] },
      { id: 'M', list: [] },
      { id: 'N', list: [] },
      { id: 'O', list: [] },
      { id: 'P', list: [] },
      { id: 'Q', list: [] },
      { id: 'R', list: [] },
      { id: 'S', list: [] },
      { id: 'T', list: [] },
      { id: 'V', list: [] },
      { id: 'W', list: [] },
      { id: 'X', list: [] },
      { id: 'Y', list: [] },
      { id: 'Z', list: [] },

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
  onLoad: function (options) {
    this.data.userId = wx.getStorageSync('userid')
    this.setData({
      hostName: test
    })
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        marginTop:'90px',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
  },
  showAll:function(){
    this.setData({
      show_all: !this.data.show_all
    })
  },
  formSubmit:function(e){
    var that=this
    if (e.detail.value.brandIds.length==0){
      wx.showModal({
        content: '请至少选择一个品牌',
      })
      return
    }
    console.log(typeof e.detail.value.brandIds)
    var moudlestr='';
    for (var t in e.detail.value.brandIds) {
      if (t == e.detail.value.brandIds.length - 1) {
        moudlestr += e.detail.value.brandIds[t]
      } else {
        moudlestr += e.detail.value.brandIds[t] + ','
      }
    }
    console.log(moudlestr)
    wx.request({
      url: test + 'service/index/setBrand',
      method: 'POST',
      data:{
        brand: moudlestr
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '添加成功',
          duration:500
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },500)
        
      

      }
    })
  },
  onReady: function () {
    var that = this;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    var systemHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      systemHeight: systemHeight + 'px',
      systemHeightC: (systemHeight - 20) + 'px'
    })
    wx.request({
      url: test + 'service/index/brands',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
      },
      success: function (res) {
        console.log(res.data.brand)
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
          let promise = new Promise(function (resolve, reject) {
            resolve(that)
          })
          promise.then(getBrand).then(function (brand){
            console.log(brand)
            for (var i in res.data.brand) {
              if (res.data.brand[i].first_name == 'A') {
                that.data.Alist.push(res.data.brand[i])
                for (var t in brand){
                  if (brand[t].id == res.data.brand[i].id){ 
                    that.data.Alist[that.data.Alist.length - 1].own = true 
                  }
                }
                that.data.allList[0].list.push(that.data.Alist[that.data.Alist.length - 1])
              } else if (res.data.brand[i].first_name == 'B') {
                that.data.Blist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Blist[that.data.Blist.length - 1].own = true;
                  }
                }
                that.data.allList[1].list.push(that.data.Blist[that.data.Blist.length - 1])
              } else if (res.data.brand[i].first_name == 'C') {
                that.data.Clist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Clist[that.data.Clist.length - 1].own = true;
                  }
                }
               
                that.data.allList[2].list.push(that.data.Clist[that.data.Clist.length - 1])
              } else if (res.data.brand[i].first_name == 'D') {
                that.data.Dlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Dlist[that.data.Dlist.length - 1].own = true;
                  }
                }
                that.data.allList[3].list.push(that.data.Dlist[that.data.Dlist.length - 1])
              } else if (res.data.brand[i].first_name == 'E') {
                that.data.Elist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Elist[that.data.Elist.length - 1].own = true;
                  }
                }
                that.data.allList[4].list.push(that.data.Elist[that.data.Elist.length - 1])
              } else if (res.data.brand[i].first_name == 'F') {
                that.data.Flist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Flist[that.data.Flist.length - 1].own = true;
                  }
                }
                that.data.allList[5].list.push(that.data.Flist[that.data.Flist.length - 1])
              } else if (res.data.brand[i].first_name == 'G') {
                that.data.Glist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Glist[that.data.Glist.length - 1].own = true;
                  }
                }
                that.data.allList[6].list.push(that.data.Glist[that.data.Glist.length - 1])
              } else if (res.data.brand[i].first_name == 'H') {
                that.data.Hlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Hlist[that.data.Hlist.length - 1].own = true;
                  }
                }
                that.data.allList[7].list.push(that.data.Hlist[that.data.Hlist.length - 1])
              } else if (res.data.brand[i].first_name == 'I') {
                that.data.Ilist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Ilist[that.data.Ilist.length - 1].own = true;
                  }
                }
                that.data.allList[8].list.push(that.data.Ilist[that.data.Ilist.length - 1])
              } else if (res.data.brand[i].first_name == 'J') {
                that.data.Jlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Jlist[that.data.Jlist.length - 1].own = true;
                  }
                }
                that.data.allList[9].list.push(that.data.Jlist[that.data.Jlist.length - 1])
              } else if (res.data.brand[i].first_name == 'K') {
                that.data.Klist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Klist[that.data.Klist.length - 1].own = true;
                  }
                }
                that.data.allList[10].list.push(that.data.Klist[that.data.Klist.length - 1])
              } else if (res.data.brand[i].first_name == 'L') {
                that.data.Llist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Llist[that.data.Llist.length - 1].own = true;
                  }
                }
                
                that.data.allList[11].list.push(that.data.Llist[that.data.Llist.length - 1])
              } else if (res.data.brand[i].first_name == 'M') {
                that.data.Mlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Mlist[that.data.Mlist.length - 1].own = true;
                  }
                }
                that.data.allList[12].list.push(that.data.Mlist[that.data.Mlist.length - 1])
              } else if (res.data.brand[i].first_name == 'N') {
                that.data.Nlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Nlist[that.data.Nlist.length - 1].own = true;
                  }
                }
                that.data.allList[13].list.push(that.data.Nlist[that.data.Nlist.length - 1])
              } else if (res.data.brand[i].first_name == 'O') {
                that.data.Olist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Olist[that.data.Olist.length - 1].own = true;
                  }
                }
                that.data.allList[14].list.push(that.data.Olist[that.data.Olist.length - 1])
              } else if (res.data.brand[i].first_name == 'P') {
                that.data.Plist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Plist[that.data.Plist.length - 1].own = true;
                  }
                }
                that.data.allList[15].list.push(that.data.Plist[that.data.Plist.length - 1])
              } else if (res.data.brand[i].first_name == 'Q') {
                that.data.Qlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Qlist[that.data.Qlist.length - 1].own = true;
                  }
                }
                that.data.allList[16].list.push(that.data.Qlist[that.data.Qlist.length - 1])
              } else if (res.data.brand[i].first_name == 'R') {
                that.data.Rlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Rlist[that.data.Rlist.length - 1].own = true;
                  }
                }
                that.data.allList[17].list.push(that.data.Rlist[that.data.Rlist.length - 1])
              } else if (res.data.brand[i].first_name == 'S') {
                that.data.Slist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Slist[that.data.Slist.length - 1].own = true;
                  }
                }
                that.data.allList[18].list.push(that.data.Slist[that.data.Slist.length - 1])
              } else if (res.data.brand[i].first_name == 'T') {
                that.data.Tlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Tlist[that.data.Tlist.length - 1].own = true;
                  }
                }
                that.data.allList[19].list.push(that.data.Tlist[that.data.Tlist.length - 1])
              } else if (res.data.brand[i].first_name == 'V') {
                that.data.Vlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Vlist[that.data.Vlist.length - 1].own = true;
                  }
                }
                
                that.data.allList[20].list.push(that.data.Vlist[that.data.Vlist.length - 1])
              } else if (res.data.brand[i].first_name == 'W') {
                that.data.Wlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Wlist[that.data.Wlist.length - 1].own = true;
                  }
                }
                that.data.allList[21].list.push(that.data.Wlist[that.data.Wlist.length - 1])
              } else if (res.data.brand[i].first_name == 'X') {
                that.data.Xlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Xlist[that.data.Xlist.length - 1].own = true;
                  }
                }
                that.data.allList[22].list.push(that.data.Xlist[that.data.Xlist.length - 1])
              } else if (res.data.brand[i].first_name == 'Y') {
                that.data.Ylist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Ylist[that.data.Ylist.length - 1].own = true;
                  }
                }
                that.data.allList[23].list.push(that.data.Ylist[that.data.Ylist.length - 1])
              } else if (res.data.brand[i].first_name == 'Z') {
                that.data.Zlist.push(res.data.brand[i])
                for (var t in brand) {
                  if (brand[t].id == res.data.brand[i].id) {
                    that.data.Zlist[that.data.Zlist.length - 1].own = true;
                  }
                }
                that.data.allList[24].list.push(that.data.Zlist[that.data.Zlist.length - 1])
              }

            }
            that.data.allList[0].list[0].class = 'brand_cell'
            that.setData({
              allList: that.data.allList
            })
            that.data.selectCar = that.data.allList[0].list[0].id
            that.setData({
              selectCarName: that.data.allList[0].list[0].name
            })
            console.log(that.data.allList)
            var first_id = that.data.Alist[0].id
            that.setData({
              allList: that.data.allList
            })
         
            that.setData({
              loaded:true
            })

          })
      

      }
    })
  },
  onShow: function () {
  },
  toView: function (e) {
    var that = this
    this.setData({
      animation: true,
      toViewModal: e.currentTarget.id
    })
    setTimeout(function () {
      that.setData({
        animation: false,
      })
    }, 500)
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  }
})
function getBrand(that) {
  return new Promise((resolve, reject) => {
  wx.request({
    url: test + 'service/index/getBrand',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
    },
    data: {
      id: that.data.userId
    },
    success: function (res) {
      console.log(res.data.brand)
      resolve(res.data.brand)
      that.setData({
        brand: res.data.brand
      })
    },
  })
  })
}
