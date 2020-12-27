//app.js
App({
  globalData: {
    openid: '',
    userInfo: {},
    avatarUrl: "",
    daytomato: {}
  },
  data: {

  },
  get_auth() {
    wx.requestSubscribeMessage({
      tmplIds: ['G8PLO681GqSTI1EyEnRoU0Z2OqqUCQEnze-CfbNXhRg'],
      success(res) {
        console.log('消息', res)
      },
    })
  },
  onLaunch: function () {
    let that = this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'mercury-3i5av',
        traceUser: true,
      })
    }
    that.getopenid()
  },
  getopenid() {
    let page = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        //console.log(res)
        console.log('openid--', res.result)
        var openid = res.result.openid
        page.globalData.openid = openid
        const db = wx.cloud.database()

        const daytomatos = db.collection('daytomato')
        daytomatos.doc(openid).get({
          success: function (res) {
            // res.data 包含该记录的数据
            //console.log('这里',res.data)
            wx.setStorageSync('daytomato', res.data.daytomatos)
            page.globalData.daytomato = wx.getStorageSync('daytomato')
          }
        })
        const habits = db.collection('habits')
        habits.doc(openid).get({
          success: function (res) {
            wx.setStorageSync('habits', res.data.habits)
          }
        })
      }
    })
  }
})