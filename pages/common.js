var test = getApp().globalData.hostName;
function getFormId(formId) {
  console.log('公共' + formId)
  if (formId == 'the formId is a mock one' || formId == 'undefined' || formId == undefined || formId == '') {
    return
  }
  if (wx.getStorageSync('PHPSESSID') == '') {
    return
  }
  wx.request({
    url: test + 'service/base/formId',
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID')
    },// 默认值
    data: {
      formId: formId
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


    },
    complete: function () {
    }
  })

}
module.exports = {
  getFormId: getFormId
}