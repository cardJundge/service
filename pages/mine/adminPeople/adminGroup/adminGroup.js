// pages/index/adminGroup/adminGroup.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '管理组',
    groupList:[],
    inputActive:[],
    getFocus:[],
    changeValue:''
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad:function(){
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady: function (options) {
    var that=this
    that.setData({
      groupList:[]
    })
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    wx.request({
      url: test + 'service/group/index',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + this.data.sessionId
      },// 默认值
      success: function (res) {
        console.log(res)
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
        that.setData({
          groupList: res.data.group
        })
        
      }
    })

  },
  confirmDelete:function(){
  var that=this
    wx.request({
      url: test + 'service/group/delete',
      method: 'POST',
      data: {
        id: this.data.deleteId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + this.data.sessionId
      },
      success: function (res) {
        console.log(res)
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
        console.log(res)
        that.setData({
          modal:false
        })
        if(res.data.status==1){
          wx.showToast({
            title: '删除成功',
            duration:500
          })
        setTimeout(function(){
          that.onReady()
        },500)
        }else{
          wx.showToast({
            title: '删除失败',
          })
        }
        
      }
    })
  },
  noCancel:function(){
    this.setData({
      modal: false
    })
  },
  toDeleteGroup:function(e){
    this.setData({
      modal:true
    })
   this.data.deleteId= e.currentTarget.id;
  },
  toEdit:function(e){
    var tempId = e.currentTarget.id;
   for (var i in this.data.groupList){
    if (this.data.groupList[i].id == tempId){
      var inputActiveTemp ='inputActive['+i+']'
      var getFocusTemp ='getFocus['+i+']'
      this.setData({
        [inputActiveTemp]: 'inputActive',
        [getFocusTemp]:true
      })
    }else{
      var inputActiveTemp = 'inputActive[' + i + ']';
      var getFocusTemp = 'getFocus[' + i + ']';
      this.setData({
        [inputActiveTemp]: '',
        [getFocusTemp]: false
      })
    }
    }
  },
  edit:function(e){
    var that=this
    var tempId=e.currentTarget.id;
    if (this.data.changeValue==''){
      for (var i in this.data.groupList){
        if (this.data.groupList[i].id == tempId){
          var redInforTemp ='redInfor['+i+']' 
          this.setData({
            [redInforTemp]:true
          })
          
        }else{
          var redInforTemp = 'redInfor[' + i + ']'
          this.setData({
            [redInforTemp]: false
          })
        }
      }
      return
    }else{
      console.log(tempId)
      console.log(that.data.changeValue)
      console.log(encodeURI(that.data.changeValue))
      wx.request({
        url: test + 'service/group/edit',
        method: 'POST',
        data: {
          id: tempId,
          name: that.data.changeValue,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
        },
        success: function (res) {
          console.log(res)
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
          if(res.data.status==1){
            for (var i in that.data.getFocus) {
              var temp = 'getFocus[' + i + ']';
              var inputActiveTemp = 'inputActive[' + i + ']'
              that.setData({
                [temp]: false,
                [inputActiveTemp]: ''
              })
            }
          }else{
            wx.showToast({
              title: '编辑失败',
            })
          }
         
        }
      })
    }

  },
  inputFocus:function(e){
    for (var i in this.data.redInfor){
      var temp ='redInfor['+i+']'
      this.setData({
        [temp]:false
      })
    }
    this.toEdit(e)
  },
  cancel:function(){

    for (var i in this.data.getFocus){
      var redInforTemp ='redInfor['+i+']'
      var getFocusTemp ='getFocus['+i+']'
      var inputActiveTep ='inputActive['+i+']'
      this.setData({
        [redInforTemp]:false,
        [getFocusTemp]:false,
        [inputActiveTep]:''
      })
    }
    console.log(this.data.getFocus)
  },
  getValue:function(e){
      this.data.changeValue = e.detail.value
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
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