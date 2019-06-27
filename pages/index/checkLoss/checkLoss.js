// pages/index/adminAgency/adminAgency.js
var common = require('../../../pages/common.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    paddingTop: '114px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '任务流',
    ck_tit: 'check',
    sz_tit: '',
    bd_tit: '',
    listAtrr: [],
    listBtrr: [],
    listCtrr: [],
    listAtrr_show: true,
    listBtrr_show: false,
    listCtrr_show: false,
    listAtrr_show: true,
    keywords: '',
    page: 1
  },

  submitFormId: function(e) {
    // console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  check: function() {
    this.setData({
      listAtrr_show: true,
      listBtrr_show: false,
      listCtrr_show: false,
      ck_tit: 'check',
      sz_tit: '',
      bd_tit: '',
      listAtrr: [],
      listBtrr: [],
      listCtrr: [],
      page: 1
    })
    this.getTaskFlowList('0')
  },
  threeRes: function() {
    this.setData({
      listAtrr_show: false,
      listBtrr_show: true,
      listCtrr_show: false,
      ck_tit: '',
      sz_tit: 'sz',
      bd_tit: '',
      listAtrr: [],
      listBtrr: [],
      listCtrr: [],
      page: 1
    })
    this.getTaskFlowList('1')
  },
  targetAdd: function() {
    this.setData({
      listAtrr_show: false,
      listBtrr_show: false,
      listCtrr_show: true,
      ck_tit: '',
      sz_tit: '',
      bd_tit: 'bd',
      listAtrr: [],
      listBtrr: [],
      listCtrr: [],
      page: 1
    })
    this.getTaskFlowList('2')
  },
  cancelSearch: function() {
    this.setData({
      keywords: '',
      page: 1,
      task_id: '',
      keyWordsTemp: '',
      listAtrr: [],
      listBtrr: [],
      listCtrr: [],
      cancelSearchIcon: false,
    })
    this.onShow()

  },
  toChoose: function(e) {
    console.log('查询',e.detail.value)
    this.setData({
      cancelSearchIcon: true,
      listAtrr: [],
      listBtrr: [],
      listCtrr: [],
      keywords: e.detail.value
    })
    this.onShow()

  },
  toAddAgency: function() {
    wx.navigateTo({
      url: 'addcheckLoss/addcheckLoss',
    })
  },
  toDetail: function(e) {
    var listId = e.currentTarget.id
    var category = e.currentTarget.dataset.type
    wx.navigateTo({
      url: 'checkLossDeatail/checkLossDeatail?listId=' + listId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var iphoneReg = /iPhone X/
    this.setData({
      userId: wx.getStorageSync('userid'),
      sessionId: wx.getStorageSync('PHPSESSID')
    })
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
    // this.getTaskFlowList('0')

  },
  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.listAtrr_show) {
      this.getTaskFlowList('0')
    } else if (this.data.listBtrr_show) {
      this.getTaskFlowList('1')
    } else if (this.data.listCtrr_show) {
      this.getTaskFlowList('2')
    }
  },

  // 获取任务流列表
  getTaskFlowList: function(type) {
    //获取列表
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var test = getApp().globalData.hostName;
    var that = this
    that.setData({
      gif: true,
    })
    wx.request({
      url: test + 'service/survey/index',
      method: 'GET',
      data: {
        keywords: that.data.keywords,
        page: that.data.page,
        type: type
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      success: function(res) {
        if (res.data.status == 1) {
          if (res.data.survey.length != 0) {
            for (var i in res.data.survey) {
              if (type == 0) {
                that.data.listAtrr.push(res.data.survey[i])
              } else if (type == 1) {
                that.data.listBtrr.push(res.data.survey[i])
              } else if(type == 2){
                that.data.listCtrr.push(res.data.survey[i])
              }

            }
            that.setData({
              gif: false,
              listAtrr: that.data.listAtrr,
              listBtrr: that.data.listBtrr,
              listCtrr: that.data.listCtrr,
            })
          } else {
            that.setData({
              gif: false,
              moredata: true,
            })
            setTimeout(function() {
              that.setData({
                moredata: false,
              })
            }, 2000)
          }

        } else {
          that.setData({
            gif: false,
            moredata: true,
          })
          setTimeout(function() {
            that.setData({
              moredata: false,
            })
          }, 2000)
        }

      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      listAtrr: [],
      listBtrr: [],
      listCtrr: [],
      keywords: '',
      page: 1
    })

  },


  onPullDownRefresh: function() {
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      gif: true
    })
    if (this.data.listAtrr_show) {
      this.data.page++
      this.getTaskFlowList('0')
    } else if (this.data.listBtrr_show) {
      this.data.page++
      this.getTaskFlowList('1')
    } else if (this.data.listCtrr_show) {
      this.data.page++
      this.getTaskFlowList('2')
    }
  },
})