// pages/calender/calender.js

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    habits:[
      {
        id: 0,
      title: "",
      remark: "",
      img: "",
      checktimes: [],
      week: {}
      },
     
    ],
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
  chang_habit(e){
    //console.log(e)
    wx.navigateTo({
     url: '../BuildHabit/BuildHabit?chang_id='+e.currentTarget.id
    })
  },
  onLoad: function (options) {
    const habits=wx.getStorageSync('habits')||[]
    console.log(habits)
    this.setData({
      habits
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