// pages/index1/index1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    avatarUrl:""
  },

  handlePreviewImage(){
    wx-wx.previewImage({
      urls:[this.data.avatarUrl] ,
      current: 'current',
    })
  },
  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.avatarUrl= res.userInfo.avatarUrl,
              app.globalData.userInfo= res.userInfo,
              this.setData({
                avatarUrl:res.userInfo.avatarUrl,
                userInfo:res.userInfo
              })
             /* wx-wx.setStorage({
                data: avatarUrl,
                key: 'avatarUrl',
                
              })*/
            }
            
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    console.log(e)
    if (!this.data.logged && e.detail.userInfo) {
      app.globalData.avatarUrl= e.detail.userInfo.avatarUrl,
      app.globalData.userInfo= e.detail.userInfo,
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
      })        
      if(this.data.logged){
        wx.redirectTo({
          url: '/pages/second/second',
        })
      }     
    }
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