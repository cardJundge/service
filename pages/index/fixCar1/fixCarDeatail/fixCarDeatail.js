var test = getApp().globalData.hostName;
var detail = require('../../getData/detail.js');
Page({
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '维修详情',
    failArr:[
      { id: 1, content: '客户暂不修车', class:'each_cell',active:false},
      { id: 2, content: '维修时间太长', class: 'each_cell each_cell_right', active: false },
      { id: 3, content: '客户自选其他修理厂', class: 'each_cell', active: false },
      { id: 4, content: '事故垫付金额高', class: 'each_cell each_cell_right', active: false },
      { id: 5, content: '配件无现货', class: 'each_cell', active: false },
    ],
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
    feedback_con:'',
    feedback:1,
    detailId: '',
    listId: '',
    ss: '',
    reason: false,
    steps: [],
    oprationModal: false,
    modal: [false, false, false, false]
  },

  activeTag:function(e){
    var that=this
    console.log(e.currentTarget.id)
    for (let i in that.data.failArr){
      if (that.data.failArr[i].id == e.currentTarget.id){
        that.data.failArr[i].active = true;
   
      }else{
        that.data.failArr[i].active = false;
      }
    }
    that.setData({
      failArr: that.data.failArr
    })
  },
  tofix: function () {
    wx.navigateTo({
      url: '../../checkLoss/fix/fix?listId=' + this.data.listId + '&&module=11',
    })
  },
  feedback_status:function(e){
    var that=this
    this.setData({
      feedback: e.currentTarget.id
    })
    if (e.currentTarget.id==2){
      var animation = wx.createAnimation({
        transformOrigin: "0 0",
        duration: 300,
        timingFunction: "ease-in",
        delay: 0
      })
      that.animation = animation
      animation.height('170px').opacity(1).step()
      that.setData({
        animationData: animation.export()
      })
    }else{
      var animation = wx.createAnimation({
        transformOrigin: "0 0",
        duration: 300,
        timingFunction: "ease-in",
        delay: 0
      })
      that.animation = animation
      animation.height('0px').opacity(0).step()
      that.setData({
        animationData: animation.export()
      })

    }
  },
  feedback:function(e){
    var that=this
   
    var temp1=''
    if (that.data.feedback==2){
      for (let i in that.data.failArr){
        if (that.data.failArr[i].active){
          temp1 += that.data.failArr[i].content+','
        }
      }
      temp1 = temp1.slice(0, temp1.length - 1)
      var content = e.detail.value.con + ',' + temp1 + '。'
    }else{
      var content = e.detail.value.con + '。'
    }
   

    console.log(content)
 
    that.setData({
      ok_btn:true
    })
    wx.showLoading({
      title: '处理中...',
    })
    wx.request({
      url: test + 'service/push/feedback',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
      },// 默认值
      data:{
        id: that.data.listId,
        result: that.data.feedback,
        content: content
      },
      success: function (res) { 
        if(res.data.status==1){
          addProgress(that, content)
        }else{
          wx.showToast({
            title: '反馈失败',
          })
        }
        
      }
    })
  },
  reasonOpen: function () {
    var temp = 'detail.reason'
    this.setData({
      [temp]: true
    })

  },
  showGetCar: function (e) {
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
  unpassReason: function (e) {
    detail.unpassReason(e, this, this.data.listId, this.data.sessionId, 'push')
  },
  cancelClaim: function () {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.cancelModal'
    this.setData({
      [temp1]: true,
      [temp]: false
    })

  },
  openImg: function (e) {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.id] // 需要预览的图片http链接列表
    })
  },
  confirmCancel: function () {
    detail.confirmCancel(this, this.data.listId, this.data.sessionId, 'push')

  },
  noCancel: function () {
    var temp = 'detail.cancelModal'
    this.setData({
      [temp]: false
    })
  },
  toDelete: function () {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.deleteMODAL';
    this.setData({
      [temp1]: true,
      [temp]: false
    })
  },
  confirmDelete: function () {
    detail.confirmDelete(this, this.data.listId, this.data.sessionId, 'push')

  },
  cancelDeleteModal: function () {
    var temp = 'detail.deleteMODAL'
    this.setData({
      [temp]: false,
    })
  },
  toEdit: function () {
    this.setData({
      oprationModal: false
    })
    wx.navigateTo({
      url: '../editFixCar/editFixCar?module=' + this.data.detailId,
    })
  },
  link: function (e) {
    wx.setStorageSync('freshFlag', false)
    var phonenumber = e.currentTarget.dataset.num;
    wx.makePhoneCall({
      phoneNumber: phonenumber //仅为示例，并非真实的电话号码
    })
  },
  toSelectPeople: function () {
    var pageModule = 0
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: false
    })
    wx.navigateTo({
      url: '../../allot/allot?module=' + this.data.detailId + '&moduleis=2',
    })
  },
  closeOprationModal: function (e) {
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: false
    })
  },

  stopBubble: function () {
  },
  openModal: function () {
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: true
    })
  },
  closeModal: function () {
    var temp1 = 'detail.check';
    this.setData({
      [temp1]: false
    })
  },
  checkModal: function () {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.check';
    this.setData({
      [temp]: false,
      [temp1]: true
    })
  },
  openImg1: function (e) {
    wx.setStorageSync('freshFlag', false)
    var that = this
    var allImgTemp = [];
    for (var j in this.data.allImg) {
      var eachTemp = test + 'uploads/work/' + this.data.allImg[j].path
      allImgTemp.push(eachTemp)

    }
    var picId = e.currentTarget.id;
    console.log(picId)
    for (var i in this.data.allImg) {
      if (this.data.allImg[i].imgId == picId) {
        var a = test + 'uploads/work/' + this.data.allImg[i].path
        console.log(a)
        wx.previewImage({
          current: a, // 当前显示图片的http链接
          urls: allImgTemp// 需要预览的图片http链接列表
        })
        return
      }
    }
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
    var bean = options.listId;
    this.setData({
      listId: bean,
      hostName: test,
    })
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
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
    detail.getDetail(this, this.data.sessionId, this.data.listId, 'push', 11)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var temp = wx.getStorageSync('freshFlag')
    if (temp){
      this.onReady()
     
    }else{
      
    }
    wx.removeStorageSync('freshFlag')
   
    
  },
  checkPass: function () {
    var that = this
    detail.checkPass(that, that.data.listId, this.data.sessionId, 'push')
  },
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  addPro:function(){
    wx.navigateTo({
      url: '../../addProgress/addProgress?detailId=' + this.data.detailId + '&moduleis=2', 
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
function addProgress(that,con1){
  var title=''
  if(that.data.feedback==1){
    title='反馈结果：推修成功'
  } else if (that.data.feedback == 2){
    title = '反馈结果：推修失败'
  } else if (that.data.feedback == 3) {
    title = '反馈结果：不确定'
    that.setData({
      feedback: 1,
      ok_btn:false
    })
  }
  wx.request({
    url: test + 'service/push/schedule',
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
    },// 默认值
    data: {
      case_id: that.data.listId,
      title: title,
      content:con1,
      picture:'',
      type:2
    },
    success: function (res) {
      wx.hideLoading()
      wx.showToast({
        title: '反馈成功',
        duration: 500
      })
      that.setData({
        feedback_con:''
      })

      setTimeout(function () {

        that.onReady()
      }, 500)
    }
  })
}