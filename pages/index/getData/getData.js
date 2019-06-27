var test = getApp().globalData.hostName;
function getList(that, moduName, session_id, page, keywords,moduNumber) {
  wx.request({
    url: test + 'service/' + moduName + '/index',
    method: 'GET',
    data: {
      keywords: that.data.keywords,
      page: that.data.page
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
    },// 默认值
    success: function (res) {
      console.log(res)
      var dataType = typeof res.data
      // console.log(dataType)
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
      // console.log(res)
      var temp1 = 'allData.gif';
      var temp2 = 'allData.moredata'
      if (res.data.status == 1) {
        wx.hideLoading()
        if (moduNumber == 1) {
          if (res.data.claims.length != 0) {
            for (var i in res.data.claims) {
              that.data.allData.listAtrr.push(res.data.claims[i])
            }
            var temp = 'allData.listAtrr'
            that.setData({
              [temp1]: false,
              [temp]: that.data.allData.listAtrr
            })
          } else {
            that.setData({
              [temp1]: false,
              [temp2]: true,
            })
            setTimeout(function () {
              that.setData({
                [temp2]: false,
              })
            }, 2000)
          }
        }else if (moduNumber == 2) {
          if (res.data.maintain.length != 0) {
            for (var i in res.data.maintain) {
              that.data.allData.listAtrr.push(res.data.maintain[i])
            }
            var temp = 'allData.listAtrr'
            that.setData({
              [temp1]: false,
              [temp]: that.data.allData.listAtrr
            })
          } else {
            that.setData({
              [temp1]: false,
              [temp2]: true,
            })
            setTimeout(function () {
              that.setData({
                [temp2]: false,
              })
            }, 2000)
          }
        }else if (moduNumber == 3) {
          if (res.data.yearbook.length != 0) {
            for (var i in res.data.yearbook) {
              that.data.allData.listAtrr.push(res.data.yearbook[i])
            }
            var temp = 'allData.listAtrr'
            that.setData({
              [temp1]: false,
              [temp]: that.data.allData.listAtrr
            })
          } else {
            that.setData({
              [temp1]: false,
              [temp2]: true,
            })
            setTimeout(function () {
              that.setData({
                [temp2]: false,
              })
            }, 2000)
          }
        }else if (moduNumber == 4) {
          if (res.data.trailer.length != 0) {
            for (var i in res.data.trailer) {
              that.data.allData.listAtrr.push(res.data.trailer[i])
            }
            var temp = 'allData.listAtrr'
            that.setData({
              [temp1]: false,
              [temp]: that.data.allData.listAtrr
            })
          } else {
            that.setData({
              [temp1]: false,
              [temp2]: true,
            })
            setTimeout(function () {
              that.setData({
                [temp2]: false,
              })
            }, 2000)
          }
        }else if (moduNumber == 5) {
          if (res.data.rescue.length != 0) {
            for (var i in res.data.rescue) {
              that.data.allData.listAtrr.push(res.data.rescue[i])
            }
            var temp = 'allData.listAtrr'
            that.setData({
              [temp1]: false,
              [temp]: that.data.allData.listAtrr
            })
          } else {
            that.setData({
              [temp1]: false,
              [temp2]: true,
            })
            setTimeout(function () {
              that.setData({
                [temp2]: false,
              })
            }, 2000)
          }
        }else if (moduNumber == 6) {
          if (res.data.accident.length != 0) {
            for (var i in res.
              data.accident) {
              that.data.allData.listAtrr.push(res.data.accident[i])
            }
            var temp = 'allData.listAtrr'
            that.setData({
              [temp1]: false,
              [temp]: that.data.allData.listAtrr
            })
          } else {
            that.setData({
              [temp1]: false,
              [temp2]: true,
            })
            setTimeout(function () {
              that.setData({
                [temp2]: false,
              })
            }, 2000)
          }
        } else if (moduNumber== 7) {
          if (res.data.used.length != 0) {
            for (var i in res.data.used) {
              that.data.allData.listAtrr.push(res.data.used[i])
            }
            var temp = 'allData.listAtrr'
            that.setData({
              [temp1]: false,
              [temp]: that.data.allData.listAtrr
            })
          } else {
            that.setData({
              [temp1]: false,
              [temp2]: true,
            })
            setTimeout(function () {
              that.setData({
                [temp2]: false,
              })
            }, 2000)
          }
        } else if (moduNumber == 8) {
          if (res.data.sale.length != 0) {
            for (var i in res.data.sale) {
              that.data.allData.listAtrr.push(res.data.sale[i])
            }
            var temp = 'allData.listAtrr'
            that.setData({
              [temp1]: false,
              [temp]: that.data.allData.listAtrr
            })
          } else {
            that.setData({
              [temp1]: false,
              [temp2]: true,
            })
            setTimeout(function () {
              that.setData({
                [temp2]: false,
              })
            }, 2000)
          }
        } else if (moduNumber == 10) {
          if (res.data.risk.length != 0) {
            for (var i in res.data.risk) {
              that.data.allData.listAtrr.push(res.data.risk[i])
            }
            var temp = 'allData.listAtrr'
            that.setData({
              [temp1]: false,
              [temp]: that.data.allData.listAtrr
            })
          } else {
            that.setData({
              [temp1]: false,
              [temp2]: true,
            })
            setTimeout(function () {
              that.setData({
                [temp2]: false,
              })
            }, 2000)
          }
        } else if (moduNumber == 11) {
          if (res.data.push.length != 0) {
            for (var i in res.data.push) {
              that.data.allData.listAtrr.push(res.data.push[i])
            }
            var temp = 'allData.listAtrr'
            that.setData({
              [temp1]: false,
              [temp]: that.data.allData.listAtrr
            })
          } else {
            that.setData({
              [temp1]: false,
              [temp2]: true,
            })
            setTimeout(function () {
              that.setData({
                [temp2]: false,
              })
            }, 2000)
          }
        }
      } else {
        wx.hideLoading()
        that.setData({
          [temp1]: false,
          [temp2]: true,
        })
        setTimeout(function () {
          that.setData({
            [temp2]: false,
          })
        }, 2000)
      }
    },
    complete: function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}
module.exports = {
  getList: getList,
}