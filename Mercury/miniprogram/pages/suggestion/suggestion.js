const app = getApp()
Page({
  data: {
    id:'',
    username: '用户名',
    userInfo: {},
    sug:"",
    noteNowLen:0,
    noteMaxLen:100
  },
  input_act(e){
    var that=this;
    var value=e.detail.value,len=parseInt(value.length);
    console.log(e)
    that.setData({
      sug:value,
      noteNowLen:len
    })
  },
  Submit(e){
    var that=this
    console.log(e)
    if(that.data.noteNowLen==0)
    {
      wx.showToast({
        title: '您的宝贵意见还没有输入呢',
        icon: 'none'
      })
      return
    }
    wx.showModal({
      title:"确认提交",
      content:"感谢您宝贵的建议，点击确认即可提交",
      success: (result) => {
        if(result.confirm){
            var reqTask = wx.request({
            url: '',
            data: {},
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          });
          
          wx.showToast({
            title: '感谢您的反馈',
            icon: 'loading',
            duration: 1500,
            success:function(){
              setTimeout(function(){
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 500,
                  success:function(){
                    setTimeout(function(){
                      wx.navigateBack({
                        delta: 0,
                      })
                    },500)
                  }
                })
              },1500)
            }
          });
          
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.userInfo,
      username:app.globalData.userInfo.nickName
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