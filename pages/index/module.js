function addProgress(){
  wx.request({
    url: test + 'service/push/schedule',
    method: 'POST',
    data: {
      push_id: that.data.detailId,
      title: e.detail.value.title,
      picture: imgNameArr,
      content: '',

    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
    },// 默认值
    success: function (res) {}
  })
}