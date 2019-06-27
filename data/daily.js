

function getOutLine(that){
  return new Promise((resolve, reject) => {
  wx.request({
    url: that.data.hostName + 'service/count/index',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
    },// 默认值
    data:{
      task_name: that.data.task_name
    },
    success: function (res) {
     console.log(res)
     var dataType = typeof res.data
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
     if (res.data.status==0){
       return
     }
     if (res.data.status == 1 && that.data.task_search){
       that.setData({
         short_name: that.data.task_name + ' · ',
         task_search:false
       })
     }
     resolve(res)
    }
  })
  })
}
function getDeatail(that){
  console.log(that.data.start_time)
  return new Promise((resolve, reject) => {
    console.log(that.data.start_time)
    wx.request({
      url: that.data.hostName + 'service/count/info',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
      },// 默认值
      data: {
        count_type: that.data.bussinessClasify,
        start_time: that.data.start_time,
        end_time: that.data.end_time,
        module_num: that.data.moduIndexRequest,
        task_name: that.data.task_name,
      },
      success: function (res) {
        console.log(res)
        console.log(that.data.start_time)
        var dataType = typeof res.data
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
        if (res.data.status == 1 && that.data.task_search) {
          that.setData({
            short_name: that.data.task_name + ' · ',
            task_search: false,
            dataNull: false,
            canvasNull: 'block'
          })
        }
       
        resolve(res)
      }
    })
  })
}
module.exports = {
  getDeatail:getDeatail,
  getOutLine: getOutLine
}