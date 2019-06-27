
var lat;
var long;
var adds = {};
var test = getApp().globalData.hostName;
var imgId = 0;
var imgNameArr = [];
var moduleiss;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '添加进度',
    src:'',
    imgRotate:'',
    cameralState:'',
    locationAdress:'',
    textInfor:'',
    deleteImg: true,
    imageArr: [],
    allImgsArr: [],
    cameraBack: 'back',
    flash: {
      auto: true,
      off: false,
      on: false
    },
    falshContrl: false,
    cameraFlasf: 'auto',

  },
  abulmn:function(){
    var that=this
    this.setData({
      picture:false
    })
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var lastPic = res.tempFilePaths[res.tempFilePaths.length - 1];
            wx.showLoading({
              title: '上传中...',
              duration: 10000000
            })
            Promise.all(res.tempFilePaths.map(item => 
            wx.uploadFile({
              url: test + 'service/base/uploads',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
              },
              filePath: item,
              name: 'image',
              formData: {
                address: '',
                name: '',
                task_name: ''
              },
              success: res => {
                console.log(res)
                console.log(item)
               
                var jsonStr = res.data;
                jsonStr = jsonStr.replace(" ", "");
                if (typeof jsonStr != 'object') {
                  jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
                  var jj = JSON.parse(jsonStr);
                  console.log(jj)
                  imgNameArr.push(jj.file_name)
                }
                that.data.allImgsArr.unshift({ path: item, imgId: imgId++})

                if (item == lastPic) {
                  setTimeout(() => {
                    that.setData({
                      allImgsArr: that.data.allImgsArr
                      })
                    console.log('最后一张了')
                    wx.hideLoading()
                    
                  }, 2000)

                }

              }
            }))).then(res => {
              console.log(111)

            })

         
        
      }
    })
  },
  toTakePhoto: function () {
    this.setData({
      picture:false,
      cameral: true
    })
    this.data.textInfor = wx.getStorageSync('textInfor')
    console.log(this.data.textInfor)
    
  },

  switchFlash: function (e) {
    console.log(e);

    this.setData({
      falshContrl: true
    })
  },
  shiftCamera: function () {
    var cameraTemp = this.data.cameraBack;
    if (cameraTemp == 'front') {
      this.setData({
        cameraBack: 'back'
      })

    } else {
      this.setData({
        cameraBack: 'front'
      })
    }
  },
  flashOr: function (e) {
    var that = this
    this.setData({
      falshContrl: false
    })
    var flashId = e.currentTarget.id;
    for (var i in this.data.flash) {

      if (i == flashId) {
        console.log(i)
        var setFalsh = 'flash.' + i
        that.setData({
          [setFalsh]: true,
          cameraFlasf: i
        })
        console.log(this.data.cameraFlasf)

      } else {
        var setFalsh = 'flash.' + i
        that.setData({
          [setFalsh]: false
        })
      }
    }
  },
  takePhoto() {
    var that=this;
    this.setData({
      waiting:true
    })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
console.log(res)
        this.setData({
          src: res.tempImagePath,
          waiting: false
        })

        if (that.data.cameralState == 1) {
          that.setData({
            imgRotate:'leftRotate'
          })
         

        } else if (that.data.cameralState == 2) {
          that.setData({
            imgRotate: 'rightRotate'
          })
        }
       
        
        var imageObj = { path: that.data.src, imgId: imgId++ }
        wx.saveImageToPhotosAlbum({
          filePath: that.data.src,
          success(res) {
            console.log(res)
          }
        })

        

        this.data.imageArr.push(imageObj);
        var imageArrTemp = this.data.imageArr;
        this.setData({
          imageArr: imageArrTemp
        })
        console.log(this.data.imageArr)
      }
    })
  },
  openImg: function (e) {
    var picId = e.currentTarget.id;
    var a=this.data.src
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [a] // 需要预览的图片http链接列表
    })

  },
  toHidden:function(){
    this.setData({
      textTip:false
    })
  },
  deleteImg: function (e) {
    var picId = e.currentTarget.id;
    for (var i in this.data.imageArr) {
      if (this.data.imageArr[i].imgId == picId) {
        this.data.imageArr.splice(i, 1)
        var imageArrTemp = this.data.imageArr;
        this.setData({
          imageArr: imageArrTemp
        })
        return;
      }
    }
  },
  recordText:function(e){
    if (e.detail.value != '') {
      wx.setStorageSync('textInfor', e.detail.value);
      this.setData({
        textInfor: this.data.textInfor
      })
    }
  
  },
  toWarning:function(){
    this.setData({
      textTip:true
    })
  },
  checkText:function(e){
   console.log(e);
   if(e.detail.value!=''){
     this.setData({
       textNotNull:true,
     })
   
   }else{
     this.setData({
       textNotNull: false
     })
   }
  },
  saveInfor:function(e){
    console.log(e)
    wx.setStorageSync('textInfor', e.detail.value);
    var temp = wx.getStorageSync('textInfor')
    this.setData({
      textInfor: temp
    })
  },
  upload: function () {
    var that = this
    console.log(that.data.imageArr)
    wx.showToast({
      title: '上传中',
      icon:'loading',
      duration:100000
    })
    for (var i = 0; i < this.data.imageArr.length; i++) {
      that.setData({
        status: true
      })
      console.log(that.data.imageArr[i])
    
      const uploadTask = wx.uploadFile({
        
        url: test + 'service/base/uploads',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
        },
        filePath: that.data.imageArr[i].path,
        formData: {
          address: '',
          name: '',
          task_name: ''
        },
        name: 'image',
        success: function (res) {
          console.log(res)
          var jsonStr = res.data;
          jsonStr = jsonStr.replace(" ", "");
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
            var jj = JSON.parse(jsonStr);
            res.data = jj;

          }
          if (res.data.status == 1) {
            console.log(res.data.file_name)
            imgNameArr.push(res.data.file_name)
            wx.showToast({
              title: '上传成功',
              duration: 1000
            });
            if (i == that.data.imageArr.length){
              that.setData({
                cameral: false,
                status: false,
                imageArr: [],

            
              })
             wx.hideToast()
              return
            }

          } else {
            wx.showToast({
              title: '上传失败',
              duration: 1000
            });
          }

        }
      })
      uploadTask.onProgressUpdate((res) => {
        console.log('上传进度', res.progress)
        console.log('已经上传的数据长度', res.totalBytesSent)
        console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      })

      
      that.data.allImgsArr.push(that.data.imageArr[i])
      var allImgsArrTemp = that.data.allImgsArr;
      that.setData({
        allImgsArr: allImgsArrTemp
      })
    }
    console.log(imgNameArr)
    
   
  },
  sbmitInfor: function (e) {
    var that = this
    var url=''
    that.setData({
      submitOver:true
    }) 
    console.log(that.data.modueis)

    if (that.data.modueis==100){
      url ='service/order/schedule'
    }else{
      url = 'service/push/schedule'
    }
    wx.request({
      url: test + url,
      method: 'POST',
      data: {
        case_id:that.data.detailId,
        title: e.detail.value.title,
        picture: imgNameArr,
        content: '',
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
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
        if (res.data.status == 1) {
          imgNameArr = []
          wx.showToast({
            title: '添加成功',
            duration: 500
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 500)
          return

        } else {
          wx.showToast({
            title: '提交失败',
            duration: 500
          });
          return
        }
      }
    })
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
    console.log(options)
    this.setData({
      detailId: options.detailId,
      modueis: options.moduleis
    })
    wx.setStorageSync('freshFlag', true)
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        titTop: '90px',
        container: 'containerX',
        nav_cell: "nav_cellX",
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  toTakePhoto1:function(){
    this.setData({
      picture:true
    })
  },
  onReady: function () {
    this.animation = wx.createAnimation()
    
    var that=this
    this.data.serviceName=wx.getStorageSync('service');
    var userName = wx.getStorageSync('userName');
    this.setData({
      userName: userName
    })
    var systemHeight = wx.getSystemInfoSync().windowHeight
    that.setData({
      cameralIf: 'width:100%;height:' + (systemHeight-80) + 'px'
    })

    


    let lastState = 0;
    let lastTime = Date.now();

    wx.startAccelerometer();

    wx.onAccelerometerChange((res) => {
      const now = Date.now();

      // 500ms检测一次
      if (now - lastTime < 500) {
        return;
      }
      lastTime = now;

      let nowState;

      // 57.3 = 180 / Math.PI
      const Roll = Math.atan2(-res.x, Math.sqrt(res.y * res.y + res.z * res.z)) * 57.3;
      const Pitch = Math.atan2(res.y, res.z) * 57.3;

      //console.log('Roll: ' + Roll, 'Pitch: ' + Pitch)

      // 左横屏状态
      if (Roll > 50) {
        if ((Pitch > -180 && Pitch < -60) || (Pitch > 130)) {
          nowState = 1;
        } else {
          nowState = lastState;
        }

      } else if (Roll < -50) {
        if ((Pitch > -180 && Pitch < -60) || (Pitch > 130)) {
          nowState = 2;
        } else {
          nowState = lastState;
        }
      }
      else if ((Roll > 0 && Roll < 30) || (Roll < 0 && Roll > -30)) {
        let absPitch = Math.abs(Pitch);

        // 如果手机平躺，保持原状态不变，40容错率
        if ((absPitch > 140 || absPitch < 40)) {
          nowState = lastState;
        } else if (Pitch < 0) { /*收集竖向正立的情况*/
          nowState = 0;
        } else {
          nowState = lastState;
        }
      }
      else {
        nowState = lastState;
      }

      // 状态变化时，触发
      if (nowState !== lastState) {
        lastState = nowState;
        if (nowState == 1) {
          console.log('change:左横屏');
          that.data.cameralState=1
       
        } else if (nowState == 2) {
          that.data.cameralState = 2
        
        } else {
          that.data.cameralState = 0
          console.log('竖直');

        }
      }
    });





  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    console.log(this.data.sessionId)
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
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
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