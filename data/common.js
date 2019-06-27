function formId(that){
  wx.request({
    url: test + 'service/survey/audit',
    method: 'POST',
    data: {
      id: that.data.listId,
      status: 2
    },
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
      console.log(res)
      that.onReady()
    }
  })
}