var test = getApp().globalData.hostName;
var detail = require('../../getData/detail.js');
Page({
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '推修详情',
    listArr: [],
    zfdzp1: [],
    zfdzp2: [],
    ckzpp1: [],
    ckzpp2: [],
    ckzpp3: [],
    ckzpp4: [],
    ckzpp5: [],
    ckzpp6: [],
    gydzp1: [],
    gydzp2: [],
    gydzp3: [],
    gydzp4: [],
    gydzp5: [],
    gydzp6: [],
    gydzp7: [],
    gydzp8: [],
    gydzp9: [],
    gydzp10: [],
    detailId: '',
    allImg: [],
    listId: '',
    ss: '',
    reason: false,
    steps: [],
    oprationModal: false,
    modal: [false, false, false, false]
  },
  onLoad: function(options) {
    var bean = options.listId;
    this.setData({
      hostName: test,
      listId: bean,
      sessionId: wx.getStorageSync('PHPSESSID'),
      userId: wx.getStorageSync('userid')
    })
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        titTop: '90px',
        container: 'containerX',
      })
    }

  },
  onShow: function() {
    var temp = wx.getStorageSync('freshFlag')
    if (temp) {
      this.onReady()
    } else {}
    wx.removeStorageSync('freshFlag')
  },
  // 重推
  tofix: function() {
    wx.navigateTo({
      url: '../../checkLoss/fix/fix?listId=' + this.data.listId + '&&module=11',
    })
  },
  tofix1: function() {
    wx.navigateTo({
      url: '../../checkLoss/fix/fix?listId=' + this.data.listId + '&&module=111',
    })
  },
  // 审核不通过
  reasonOpen: function() {
    var temp = 'detail.reason'
    this.setData({
      [temp]: true
    })

  },
  // 查看轨迹
  showGetCar: function(e) {
    var that = this
    var typeTrace;
    if (e.currentTarget.id == 'jieche') {
      for (var i in that.data.scheduleAll) {
        if (that.data.scheduleAll[i].title == '接车') {
          wx.navigateTo({
            url: '../../showTrace/showTrace?trace=' + that.data.scheduleAll[i].pick_path,
          })
        }
      }

    } else {
      typeTrace = '送车'
      for (var i in that.data.scheduleAll) {
        if (that.data.scheduleAll[i].title == '送车') {
          wx.navigateTo({
            url: '../../showTrace/showTrace?trace=' + that.data.scheduleAll[i].give_path,
          })
        }
      }
    }
  },
  // 审核不通过原因填写
  unpassReason: function(e) {
    detail.unpassReason(e, this, this.data.listId, this.data.sessionId, 'push')
  },
  // ？？？
  cancelClaim: function() {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.cancelModal'
    this.setData({
      [temp1]: true,
      [temp]: false
    })

  },
  openImg: function(e) {
    // console.log(e.currentTarget.id)
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.id] // 需要预览的图片http链接列表
    })
  },
  openImg1: function(e) {
    wx.setStorageSync('freshFlag', false)
    var that = this
    var allImgTemp = [];
    for (var j in this.data.allImg) {
      var eachTemp = test + 'uploads/work/' + this.data.allImg[j].path
      allImgTemp.push(eachTemp)

    }
    var picId = e.currentTarget.id;
    // console.log(picId)
    for (var i in this.data.allImg) {
      if (this.data.allImg[i].imgId == picId) {
        var a = test + 'uploads/work/' + this.data.allImg[i].path
        // console.log(a)
        wx.previewImage({
          current: a, // 当前显示图片的http链接
          urls: allImgTemp // 需要预览的图片http链接列表
        })
        return
      }
    }
  },
  // ？？？
  confirmCancel: function() {
    detail.confirmCancel(this, this.data.listId, this.data.sessionId, 'push')

  },
  noCancel: function() {
    var temp = 'detail.cancelModal'
    this.setData({
      [temp]: false
    })
  },
  // 删除
  toDelete: function() {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.deleteMODAL';
    this.setData({
      [temp1]: true,
      [temp]: false
    })
  },
  // 确认删除
  confirmDelete: function() {
    detail.confirmDelete(this, this.data.listId, this.data.sessionId, 'push')

  },
  // 取消删除
  cancelDeleteModal: function() {
    var temp = 'detail.deleteMODAL'
    this.setData({
      [temp]: false,
    })
  },
  // 编辑
  toEdit: function() {
    this.setData({
      oprationModal: false
    })
    wx.navigateTo({
      url: '../editFixCar/editFixCar?module=' + this.data.detailId,
    })
  },
  // 联系电话
  link: function(e) {
    wx.setStorageSync('freshFlag', false)
    var phonenumber = e.currentTarget.dataset.num;
    wx.makePhoneCall({
      phoneNumber: phonenumber //仅为示例，并非真实的电话号码
    })

  },
  // 分配
  toSelectPeople: function() {
    var pageModule = 0
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: false
    })
    wx.navigateTo({
      url: '../../allot/allot?module=' + this.data.detailId + '&moduleis=2',
    })
  },
  // 关闭操作框
  closeOprationModal: function(e) {
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: false
    })
  },

  stopBubble: function() {},
  // 打开操作框
  openModal: function() {
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: true
    })
  },
  // 输入核损金额
  checkMoney: function(e) {
    var that = this
    // console.log(e.detail.value.money)
    if (e.detail.value.money == '') {
      return
    }
    wx.request({
      url: test + 'service/push/set_money',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        id: that.data.listId,
        money: e.detail.value.money
      },
      success: function(res) {
        if (res.data.status == 1) {
          that.onReady()
        }

      }
    })

  },
  closeModal: function() {
    var temp1 = 'detail.check';
    this.setData({
      [temp1]: false
    })
  },
  checkModal: function() {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.check';
    this.setData({
      [temp]: false,
      [temp1]: true
    })
  },
  // 返回上一级页面
  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  checkPass: function() {
    var that = this
    detail.checkPass(that, that.data.listId, this.data.sessionId, 'push')
  },


  // ------ --------- --------- -----------
  onReady: function() {
    var that = this
    that.setData({
      allImg: [],
      zfdzp1: [],
      zfdzp2: [],
      ckzpp1: [],
      ckzpp2: [],
      ckzpp3: [],
      ckzpp4: [],
      ckzpp5: [],
      ckzpp6: [],
      gydzp1: [],
      gydzp2: [],
      gydzp3: [],
      gydzp4: [],
      gydzp5: [],
      gydzp6: [],
      gydzp7: [],
      gydzp8: [],
      gydzp9: [],
      gydzp10: [],
      detail: [],
      oprator: [],
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    detail.getDetail(that, that.data.sessionId, that.data.listId, 'push', 11)
  },

  onPullDownRefresh: function() {
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  }
})