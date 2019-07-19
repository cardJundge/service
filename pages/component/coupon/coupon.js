// 优惠券
var app = getApp()
Component({
  properties: {
    show: Boolean,
    couponId: Number,
    couponNum: String
  },
  data: {
    sessionId: wx.getStorageSync('PHPSESSID')
  },
  methods: {
    hideModal: function (e) {
      this.setData({
        show: false
      })
    },
    orderConfirm: function(e) {
      this.setData({
        show: false
      })
      this.data.sessionId = wx.getStorageSync('PHPSESSID')
      wx.request({
        url: app.globalData.hostName + 'service/index/confirmCoupon',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Cookie': 'PHPSESSID=' + this.data.sessionId
        },// 默认值
        data: {
          coupon_id: this.data.couponId
        },
        success: (res)=>{
          app.globalData.coupon = ''
          if(res.data.status == 1) {
            wx.showToast({
              title: '豆子已入账，前往账户钱包查看...',
              duration: 2000,
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        }
      })
      
    }
  }
})
