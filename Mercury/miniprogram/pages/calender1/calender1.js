// pages/Calendar/Calendar.js
//打卡日历页面

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    habits: [{
      id: 0,
      title: "",
      remark: "",
      img: "",
      checktimes: [],
      week: {},
      checked: false,
      display: false
    }, ],
    selected: [

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = parseInt(options.chang_id)
    // console.log(options)
    var habits = wx.getStorageSync("habits") || [];
    let selected = this.data.selected
    console.log(habits[id].checktimes)
    var i = 0
    console.log(habits[id].checktimes.length)
    for (i = 0; i < habits[id].checktimes.length; i++) {
      var tmp = {
        date: habits[id].checktimes[i]
      }
      selected.push(tmp)
    }
    console.log(selected)
    this.setData({
      id: id,
      habits,
      selected
    })
  },
  /**
   * 日历是否被打开
   */
  bindselect(e) {

  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {

  }
})