// pages/index/updateData/updateData.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '商户资料',
    animationData: {},
    loadImg: [],
    imgUrls: [],
    userId: '',
    plusImg: true,
    plusImg2: true,
    userInfor: {},
    imageList: [],
    businessLicense: [],
    userInfor: {}
  },
  backPage:function(){
    wx.navigateBack({
      delta:1
    })
  },
  toBrand: function() {
    wx.navigateTo({
      url: './brand/brand',
    })
  },
  changeImgModal: function() {
    this.setData({
      modalImage: true
    })
  },
  confirmDelete: function(that) {
    wx.showLoading({
      title: '删除中...',
    })
    var that = this
    wx.request({
      url: test + 'service/index/del_logo',
      method: 'POST',
      data: {
        stores: that.data.deleteImg
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
            deleteImage: false
          })
          wx.setStorageSync('imgChange', true)
          wx.showToast({
            title: '删除成功',
            duration: 1000
          })
          setTimeout(function() {
            wx.hideLoading()
            that.onReady()

          }, 500)


        }



      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })

  },
  deleteImg: function(e) {
    var that = this
    console.log(e.currentTarget.id)
    this.setData({
      deleteImage: true
    })
    this.data.deleteImg = e.currentTarget.id

  },
  addImage: function(e) {
    this.setData({
      modalImage: true
    })


  },
  changemg: function() {
    var that = this
    this.setData({
      modalImage: false
    })
    upLoadImg(this)
  },
  canceModal: function() {
    this.setData({
      modalImage: false,
      deleteImage:false
    })
  },
  toService: function() {
    wx.navigateTo({
      url: './service/service',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userType: wx.getStorageSync('type'),
      hostName: test
    })
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
  },
  openPhoto: function() {
    var that = this;
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = that.data.imageList;
        tempFilePaths.push(res.tempFilePaths)
        that.setData({
          imageList: tempFilePaths
        })
        if (that.data.imageList.length == 4) {
          that.setData({
            plusImg: false
          })
        }
      }
    })
  },
  openlicense: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          businessLicense: res.tempFilePaths
        })
        if (that.data.businessLicense.length == 1) {
          that.setData({
            plusImg2: false
          })
        }


      }
    })
  },
  tosubmit: function(e) {
    var that = this

    if (e.detail.value.contact == '') {
      that.setData({
        contactErr: true
      })
      return
    }
    if (e.detail.value.userName == '') {
      that.setData({
        nameErr: true
      })
      return
    }
    // var reg = /^1[345789]\d{9}$/;
    // if (reg.test(e.detail.value.mobile)) {} else {
    //   that.setData({
    //     mobileErr: true
    //   })
    //   return
    // }
    // if (e.detail.value.intro) {
    //   var temp = getLength(e.detail.value.intro)
    //   if (temp > 23) {
    //     that.setData({
    //       introErr1: true
    //     })
    //     return

    //   }
    // }
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: test + 'service/index/setInfo',
      method: 'POST',
      data: {
        id: that.data.userId,
        contact: e.detail.value.contact,
        name: that.data.userInfor.name,
        mobile: e.detail.value.mobile,
        intro: e.detail.value.intro,
        address: e.detail.value.address,
        short_name: e.detail.value.userName,
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
          wx.showToast({
            title: '修改成功',
            duration: 1000
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 500)


        }



      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  cancelRed: function(e) {
    var that = this;
    if (e.currentTarget.id == 'userName') {
      that.setData({
        nameErr: false
      })
    } else if (e.currentTarget.id == 'contact') {
      that.setData({
        contactErr: false
      })
    } else if (e.currentTarget.id == 'mobile') {
      that.setData({
        mobileErr: false
      })
    } else if (e.currentTarget.id == 'intro') {
      that.setData({
        introErr1: false,
        introErr: false
      })
    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    var animation = wx.createAnimation({
      transformOrigin: "0 0",
      duration: 300,
      timingFunction: "ease-in",
      delay: 0
    })
    that.animation = animation
    animation.opacity(0).step()
    that.setData({
      animationData: animation.export()
    })

    this.setData({
      loaded: false,
      loadImg: [],
      imgUrls: [],
      OriginLogo: ''
    })
    this.data.userId = wx.getStorageSync('userid');
    this.data.sessionId = wx.getStorageSync('PHPSESSID')

    var userIdArc = this.data.userId;
    var session_id = that.data.sessionId

    wx.request({
      url: test + 'service/index/info',
      method: 'GET',
      data: {
        id: that.data.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id
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
          if (res.data.service.stores != '') {
            that.data.OriginLogo = res.data.service.stores
            that.setData({
              imgUrls: res.data.service.stores.split(',')
            })
            console.log(that.data.imgUrls)
          } else {

          }



          that.setData({
            loaded: true,
            userInfor: res.data.service
          })
          var animation = wx.createAnimation({
            transformOrigin: "0 0",
            duration: 300,
            timingFunction: "ease-in",
            delay: 0
          })
          that.animation = animation
          animation.opacity(1).step()
          that.setData({
            animationData: animation.export()
          })
        } else {
          wx.showModal({
            title: '请求超时，请重新登录',
            content: '',
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

function getLength(str) {
  ///<summary>获得字符串实际长度，中文2，英文1</summary>  
  ///<param name="str">要获得长度的字符串</param>  
  var realLength = 0,
    len = str.length,
    charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
}

function upLoadImg(that) {
  if (that.data.imgUrls.length == 5) {
    wx.showModal({
      title: '最多可加5张门店图',
      content: '',
    })
    return
  }

  wx.chooseImage({
    count: 5 - that.data.imgUrls.length, // 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
      wx.showLoading({
        title: '上传中...',
      })
      var imgLength = res.tempFilePaths.length
      Promise.all(res.tempFilePaths.map((item, index) =>
        wx.uploadFile({
          url: test + 'service/base/upStores',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.data.sessionId
          },
          filePath: item,
          name: 'stores',
          formData: {
            stores: ''
          },
          success: res => {

            var jsonStr = res.data;
            jsonStr = jsonStr.replace(" ", "");
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
              var jj = JSON.parse(jsonStr);
              res.data = jj
            }
            that.data.loadImg.push(res.data.file_name)
            if (index == 0) {
              if(res.data.status==1){
                wx.setStorageSync('imgChange', true)
                wx.hideLoading()
                setInfor(that)
              }else{
                wx.showToast({
                  title: '上传失败',
                })
              }
             
            }

          }
        }))).then(res => {


      })
    }
  })

}

function setInfor(that) {
  console.log(logo)
  var logo 
  if (that.data.imgUrls.length == 0) {
    logo = that.data.loadImg
  } else {
    logo = that.data.OriginLogo + ',' + that.data.loadImg
  }

  console.log(logo)
  wx.request({
    url: test + 'service/index/setInfo',
    method: 'POST',
    data: {
      id: that.data.userId,
      contact: that.data.userInfor.contact,
      name: that.data.userInfor.name,
      mobile: that.data.userInfor.mobile,
      intro: that.data.userInfor.intro,
      address: that.data.userInfor.address,
      short_name: that.data.userInfor.short_name,
      stores: logo
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
        wx.showToast({
          title: '修改成功',
          duration: 1000
        })
        setTimeout(function() {
          that.onReady()
        }, 500)


      }



    },
    complete: function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}