// pages/calender/calender.js

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    tomatos:[],
    date: '',
    minDate:new Date(2020, 5, 1).getTime(),
    maxDate:new Date(2021, 5, 1).getTime(),
    count:0,
    show: false,
    showconfirm:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    const db=wx.cloud.database()
    db.collection('tomatos').where({
      publishInfo: {
        country: ''
      }
    }).get({
      success: function(res) {
      // 输出 [{ "title": "The Catcher in the Rye", ... }]
      console.log(res)
     }
    })
    console.log(tomatos)
    this.setData({
      tomatos
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