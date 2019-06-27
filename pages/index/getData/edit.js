var test = getApp().globalData.hostName;
function editShow(that, session_id,moduName,moduNumber){
  wx.setStorageSync('freshFlag', true)
  console.log(test + 'service/' + moduName + '/info/id/' + that.data.listId)
  wx.request({
    url: test + 'service/' + moduName+'/info/id/' + that.data.listId,
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
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
     
      var temp = 'carHost.detail_no'
      if (moduNumber == 1) {
        that.setData({
          carHost: res.data.claim,
          [temp]: res.data.claim.claims_no
        })
        console.log(that.data.carHost)
      }else if (moduNumber == 2) {
        that.setData({
          carHost: res.data.maintain,
          [temp]: res.data.maintain.maintain_no
        })
        console.log(that.data.carHost)
      }else if (moduNumber == 3) {
        that.setData({
          carHost: res.data.yearbook,
          [temp]: res.data.yearbook.yearbook_no
        })
        console.log(that.data.carHost)
      }else if (moduNumber == 4) {
        that.setData({
          carHost: res.data.trailer,
          [temp]: res.data.trailer.trailer_no
        })
        console.log(that.data.carHost)
      }else if (moduNumber == 5) {
        that.setData({
          carHost: res.data.rescue,
          [temp]: res.data.rescue.rescue_no
        })
        console.log(that.data.carHost)
      }else if (moduNumber == 6) {
       that.setData({
         carHost: res.data.accident,
         [temp]: res.data.accident.accident_no
       })
   
      }else if (moduNumber == 7) {
        that.setData({
          carHost: res.data.claim,
          [temp]: res.data.claim.used_no
        })
      }else if (moduNumber == 8) {
        that.setData({
          carHost: res.data.claim,
          [temp]: res.data.claim.sale_no
        })
      } else if (moduNumber == 11) {
        that.setData({
          brandId: res.data.push.brand_id,
          carHost: res.data.push,
          [temp]: res.data.push.push_no
        })
        getBrand(session_id, res.data.push.brand_id, that)
      }

    },
    complete: function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}
function editSubmit(e, that, listId, session_id, moduName, ifCar, moduNumber, ifaddress){
  var temp;
  if (e.detail.value.trueName == '') {
    temp ='carHost.nameErr'
    that.setData({
      [temp]: true
    })
    return
  }
  var reg = /^1[3456789]\d{9}$/;
  if (reg.test(e.detail.value.trueMobile)) {
    console.log('ok')
  } else {
    temp = 'carHost.mobileErr'
    that.setData({
      [temp]: true
    })
    return
  }

  var reCar = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/
  if (ifCar){
    if (reCar.test(e.detail.value.trueCar)) {
      console.log('ok')
    } else {
      temp = 'carHost.carNoErr'
      that.setData({
        [temp]: true
      })
      return
    }
  }else{

  }
  if (ifaddress){
    if (e.detail.value.address == '') {
      temp = 'carHost.addressErr'
      that.setData({
        [temp]: true
      })
      return
    }
  }
  
  that.setData({
    allOver: true
  })
  wx.showLoading({
    title: '操作中...',
  })
  console.log(e.detail.value);
  if (moduNumber == 1) {
    wx.request({
      url: test + 'service/' + moduName + '/edit',
      method: 'POST',
      data: {
        id: listId,
        owner_name: e.detail.value.trueName,
        mobile: e.detail.value.trueMobile,
        car_no: e.detail.value.trueCar,
        remark: e.detail.value.secondinfor ? e.detail.value.secondinfor:'',
        shuttle: e.detail.value.radio,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
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
        if (res.data.status = 1) {
          wx.showToast({
            title: '修改成功',
            duration: 500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 500)

        }

      }
    })
  }else if (moduNumber == 4) {
    wx.request({
      url: test + 'service/' + moduName + '/edit',
      method: 'POST',
      data: {
        id: listId,
        owner_name: e.detail.value.trueName,
        mobile: e.detail.value.trueMobile,
        accident_address: e.detail.value.address,
        car_no: e.detail.value.trueCar,
        remark: e.detail.value.secondinfor ? e.detail.value.secondinfor:'',
        type: e.detail.value.radio
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
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
        if(res.data.status=1){
          wx.showToast({
            title: '修改成功',
            duration:500
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },500)
         
        }else{
          wx.showModal({
            title: '操作超时',
            content: '',
          })
        }
        

      }
    })
  } else if (moduNumber == 3) {
    wx.request({
      url: test + 'service/' + moduName + '/edit',
      method: 'POST',
      data: {
        id: listId,
        owner_name: e.detail.value.trueName,
        mobile: e.detail.value.trueMobile,
        accident_address: e.detail.value.address,
        destination_address: e.detail.value.destination_address,
        car_no: e.detail.value.trueCar,
        remark: e.detail.value.secondinfor ? e.detail.value.secondinfor:''
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
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
        if (res.data.status = 1) {
          wx.showToast({
            title: '修改成功',
            duration: 500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 500)

        } else {
          wx.showModal({
            title: '操作超时',
            content: '',
          })
          
        }


      }
    })
  }
}
function cancelRed(e,that){
  var temp;
  if (e.currentTarget.id == 'trueName') {
    temp ='carHost.nameErr'
    that.setData({
      [temp]: false
    })
  } else if (e.currentTarget.id == 'trueMobile') {
    temp = 'carHost.mobileErr'
    that.setData({
      [temp]: false
    })
  } else if (e.currentTarget.id == 'trueCar') {
    temp = 'carHost.carNoErr'
    that.setData({
      [temp]: false
    })
  } else if (e.currentTarget.id == 'address') {
    temp = 'carHost.addressErr'
    that.setData({
      [temp]: false
    })
  } else if (e.currentTarget.id == 'deaddress') {
    temp = 'carHost.deaddressErr'
    that.setData({
      [temp]: false
    })
  }
}
module.exports={
  editShow:editShow,
  editSubmit: editSubmit,
  cancelRed: cancelRed
}
function getBrand(session_id, id, that) {
  wx.request({
    url: test + 'service/index/brands',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
    },// 默认值
    success: function (res) {
      console.log(res)
      for (var i in res.data.brand) {
        if (res.data.brand[i].id == id) {
          var temp = 'carHost.brandName'
          that.setData({
            [temp]: res.data.brand[i].name
          })
        }

      }
    }
  })
}