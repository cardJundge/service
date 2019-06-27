var test = getApp().globalData.hostName;
function addProgress(case_id, title,case_type,that){
  console.log(arguments)


  wx.request({
    url: test + 'service/push/schedule',
    method: 'POST',
    data: {
      case_id: case_id,
      title: title,
      picture: '',
      content: '',
      type: case_type
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
     

      } else {
        return
      }
    }
  })
}
module.exports={
  addProgress:addProgress
}