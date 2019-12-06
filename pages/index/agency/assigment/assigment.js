// 分配
var app = getApp()
Page({
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '分配作业员',
    taskId: '',
    keywords: ''
  },
  onLoad: function (options) {
    console.log(options)
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
    this.data.listId = options.listId
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.setData({
      hostName: app.globalData.hostName
    })

    this.getTaskList()
  },

  getTaskList() {
    wx.request({
      url: this.data.hostName + 'service/task/index',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      },
      data: {
        keywords: this.data.keywords
      },
      success: res=> {
        if(res.data.status == 1) {
          this.setData({
            someone: true,
            taskList: res.data.task
          })
        }
      }
    })
  },

  // 添加人员
  addStaff() {
    wx.redirectTo({
      url: '../../../mine/adminPeople/adminPeople',
    })
  },

  taskChange(e) {
    this.data.taskId = e.detail.value
    console.log(this.data.taskId)
  },

  submitAssignment() {
    console.log(this.data.sessionId)
    wx.request({
      url: this.data.hostName + 'service/project/allot',
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      },
      data: {
        id: this.data.listId,
        task_id: this.data.taskId,
      },
      success: res => {
        if (res.data.status == 1) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.msg ? res.data.msg : '操作超时',
          })
        }
      }
    })
  },

  search(e) {
    this.data.keywords = e.detail.value
    console.log(e.detail.value)
  }
})