// pages/userinfo/userinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '用户名',
    userInfo: {},
    avatarUrl:""
  },
  globalData: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      openid: app.globalData.openid,
      avatarUrl:app.globalData.avatarUrl,
      userInfo:app.globalData.userInfo,
      username:app.globalData.userInfo.nickName
    })
   // console.log(openid)
  },

  user_image_preview(){
    app.get_auth()
    wx-wx.previewImage({
      urls: [this.data.avatarUrl],
      current: 'current',
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})