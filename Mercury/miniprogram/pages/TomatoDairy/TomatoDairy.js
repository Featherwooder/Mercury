// pages/calender/calender.js

var util=require('../../util/util');//调用util中的获取时间函数

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    tomatos:[],
    date: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    let that = this
    console.log(app.globalData.openid + options.date)
    this.setData({
      date : options.date
    })
    
    const db=wx.cloud.database()
    db.collection('tomato').doc(app.globalData.openid + options.date).get({
      success: function(res) {
      // 输出 [{ "title": "The Catcher in the Rye", ... }]
      console.log(res.data.tomatos)
      that.setData({
        tomatos : res.data.tomatos
    })
     }
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

  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
})