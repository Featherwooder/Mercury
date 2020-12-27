// pages/calender/calender.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    habits: [{
        id: 0,
        title: "",
        remark: "",
        img: "",
        checktimes: [],
        week: {},
        checked: false,
        display: false
      },

    ],
    date: '',
    minDate: new Date(2020, 5, 1).getTime(),
    maxDate: new Date(2021, 5, 1).getTime(),
    count: 0,
    show: false,
    showconfirm: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  change_habit(e) {
    app.get_auth()
    console.log(e)
    wx.navigateTo({
      url: '../BuildHabit/BuildHabit?chang_id=' + e.currentTarget.id
    })
  },
  delete_habit(e) {
    app.get_auth()
    //console.log(e)
    var habits = this.data.habits
    var id = parseInt(e.currentTarget.id)
    wx.showModal({
      title: "确认删除",
      success: (result) => {
        if (result.confirm) { //保存    
          let index = habits.findIndex(v => v.id === id)
          // console.log(index)
          if (index !== -1) { //如果存在则删除
            habits.splice(index, 1)
          }
          this.setData({
            habits
          })
          wx.setStorageSync("habits", habits);
          const db = wx.cloud.database()
        
          db.collection('habits').add({
            data: {
              _id: app.globalData.openid, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
              habits
            },
            success: function (res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log('cheng',res)
            },
            fail:function(res){
              console.log('shi',res)
              db.collection('habits').doc(app.globalData.openid).update({
                data:{
                  habits
                }
              })
            }
          })
          // 1.获取页面栈(返回一个数组,包含了所有曾经去过的页面)
          var pages = getCurrentPages(); //可以log看看是什么(里面什么都有--)
          console.log(pages)
          // 2. 拿到上一页(数组长度-2就是上一页)
          var beforePage = pages[pages.length - 2];
          // 3. 执行上一页 onLoad 函数(刷新数据)
          // 假设请求后端数据并渲染页面的函数是: getNavGird()
          beforePage.onLoad()
        }
      }
    })
  },
  calendar(e) {

    console.log(e)

    wx.navigateTo({
      url: '../calender1/calender1?chang_id=' + e.currentTarget.id
    })
  },
  calendar(e) {
    //console.log(e)
    console.log(e)

    wx.navigateTo({
      url: '../calender1/calender1?chang_id=' + e.currentTarget.id
    })
  },
  onLoad: function (options) {
    const habits = wx.getStorageSync('habits') || []
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
    // 1.获取页面栈(返回一个数组,包含了所有曾经去过的页面)
    var pages = getCurrentPages(); //可以log看看是什么(里面什么都有--)
    console.log(pages)
    // 2. 拿到上一页(数组长度-2就是上一页)
    var beforePage = pages[pages.length - 2];
    // 3. 执行上一页 onLoad 函数(刷新数据)
    // 假设请求后端数据并渲染页面的函数是: getNavGird()
    beforePage.onLoad()
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
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
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