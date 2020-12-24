// pages/Calendar/Calendar.js
//打卡日历页面

Page({
 /**
   * 页面的初始数据
   */
  data: {
    id:-1,
    times:[],
    habits:[
      {
        id: 0,
      title: "",
      remark: "",
      img: "",
      checktimes: [],
      week: {},
      checked:false,
      display:false
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id= parseInt(options.chang_id)
    console.log(options)
    var habits = wx.getStorageSync("habits") || [];
    var times=[]
    console.log(habits[id].checktimes)
    times=times.concat(habits[id].checktimes)
    this.setData({
      id:id,
      habits,
      times:times
    })
   },
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