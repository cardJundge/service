function addSubmit(that, e, userIdArc, session_id, moduName, noCar, address,carType,notice){
  console.log(session_id)
  if (e.detail.value.trueName == '') {
    that.setData({
      nameErr: true
    })
    return
  }

  var reg = /^1[3456789]\d{9}$/;
  if (reg.test(e.detail.value.trueMobile)) {
  } else {
    that.setData({
      mobileErr: true
    })
    return
  }
  if(!noCar){
    var reCar = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/
    if (reCar.test(e.detail.value.trueCar)) {
      console.log('ok')
    } else {
      that.setData({
        carNoErr: true
      })
      return
    }
  }
  if (carType) {
    if (!that.data.carData.dataId || e.detail.value.carType == '') {
      console.log('mmp')
      that.setData({
        carTypeErr: true
      })
      return
    }
  }
  if (address){
    if (e.detail.value.address == '') {
      that.setData({
        addressErr: true
      })
      return
    }
}
 
  if (notice) {
    if (that.data.imgPath == '') {
      that.setData({
        noticeErr: true
      })
      return
    }
  }

  that.setData({
    allOver: true
  })

  var test = getApp().globalData.hostName;
  
  that.data.userId = wx.getStorageSync('userid');

  console.log(test + 'service/' + moduName + '/add');
  wx.showNavigationBarLoading() //在标题栏中显示加载
  
}
function cancelRed(that,e){
  if (e.currentTarget.id == 'trueName') {
    that.setData({
      nameErr: false
    })
  } else if (e.currentTarget.id == 'trueMobile') {
    that.setData({
      mobileErr: false
    })
  } else if (e.currentTarget.id == 'trueCar') {
    that.setData({
      carNoErr: false
    })
  } else if (e.currentTarget.id == 'address') {
    that.setData({
      addressErr: false
    })
  } else if (e.currentTarget.id == 'carType') {
    that.setData({
      carTypeErr: false
    })
  }else if (e.currentTarget.id == 'deaddress') {
    that.setData({
      deaddressErr: false
    })
  }
}
module.exports = {
  addSubmit: addSubmit,
  cancelRed: cancelRed
}