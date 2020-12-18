// pages/Calendar/Calendar.js
//打卡日历页面

Page({
 /**
   * 页面的初始数据
   */
  data: {
    selected: [
      {
        date: '2020-12-21'
      }, {
        date: '2020-12-02'
      },{
        date: '2018-5-24'
      },{
        date: '2018-5-25'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },
  /**
  * 日历是否被打开
  */
  bindselect(e) {
    console.log(e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    let time = e.detail;
    console.log(time)

  }
})