// pages/tomatotimer/tomatotimer.js
import Dialog from '../../comments/dist/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  // ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','52','54','55','56','57','58','59'],
  data: {
    multiArray: [
      ['00','05','10','15','20','25','30','35','40','45','50','55','60','65','70','75','80','85','90','95','100','105','110','115','120'],
      ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','52','54','55','56','57','58','59']
    ],
    minback:  [ 
      ['00','05','10','15','20','25','30','35','40','45','50','55','60','65','70','75','80','85','90','95','100','105','110','115','120'],
      ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','52','54','55','56','57','58','59']
     ],
    test : 1,
    multiIndex: [5, 0],
    timer : '',
    min : 25,
    sec : 0,
    countdownNum : '1500',
    circleNum : '100',
    circlesize : 200,
    leftrpx : 163,
    startimg: true,
    startcount: false,
    clockwise : true,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var circlesize = wx.getSystemInfoSync().windowWidth;
    console.log(circlesize)
    this.setData({
      circlesize: 334/750 * circlesize,
      leftrpx: 350/750 * circlesize
    })
  },
  seterror: function () {
    console.log('error')
    wx.showToast({
      title: '专注中，不可修改',
      icon:'none',
      duration: 1000
    })
  },
  test: function () {
    if (this.data.startimg == true && this.data.startcount == false){
      this.setData({
        startcount :true,
        startimg : false,
      })
      this.countdown();
    }
  }, 
  stoptimer: function () {
    let that = this
    wx.showModal({
      content: '确定放弃本次专注吗？',
      success (res) {
        if (res.confirm){
          console.log('确认')
          that.setData({
            test : 0,
            startimg : true,
         })
        } 
      }
    })

  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)  
    this.setData({
      min : (Number)(this.data.multiArray[0][e.detail.value[0]]),
      sec : (Number)(this.data.multiArray[1][e.detail.value[1]]),
      multiIndex: e.detail.value, 
      countdownNum: (Number)(this.data.multiArray[0][e.detail.value[0]]) * 60 + (Number)(this.data.multiArray[1][e.detail.value[1]])
    })
    console.log('min=',this.data.min)
    console.log('sec=',this.data.sec)
    console.log('countdownNum=',this.data.countdownNum)
  },

  countdown : function() {
    let that = this
    let countDownNum = that.data.countdownNum;//获取倒计时初始值
    let Time = this.data.multiIndex;
    let timeArray = this.data.multiArray;
    let timesum = that.data.countdownNum;
    var circlenum = 0;
    //var lastnum = '0';
    var minBack = JSON.parse(JSON.stringify(that.data.minback));
    console.log('开始时：',Time, countDownNum)
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
      that.data.timer = setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来   
        if (countDownNum == 0 || that.data.test == 0) {
          if (that.data.startimg == false){
            if (that.data.clockwise == true){
              console.log('倒计时结束')
              clearInterval(that.data.timer);
              Time = [5, 0]
              that.setData({
                multiArray: minBack,
                startcount: false,
                multiIndex: Time,
                sec : 0,
                min : 25,
                countdownNum : 1500,
                startimg: true,
                test : 1,
                circleNum : 100,
              })           
              console.log('that',that.data)
            }
          }else{//用户按停止之后恢复25分钟
            console.log(that.data)
            clearInterval(that.data.timer); 
            Time = [5, 0]
            that.setData({
              multiArray : minBack,
              startcount: false,
              multiIndex: Time,
              startimg: true,
              min : 25,
              sec : 0,
              countdownNum : 1500,
              circleNum : 100,
              test : 1,
            })
          }
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          // clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
        }else{
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        Time[0] = parseInt(countDownNum / 60);
        Time[1] = countDownNum % 60;
        //lastnum = that.data.multiArray[0][parseInt(Time[0] / 5) + 1];
        //console.log( '当前时间：',Time[0],':',Time[1])
        if (Time[0] < 10) {
          timeArray[0][parseInt(Time[0] / 5) + 1] = '0' + Time[0]
        }else{
          timeArray[0][parseInt(Time[0] / 5) + 1] = Time[0]
        }
        //console.log('timeArray', timeArray)
        Time[0] = parseInt(Time[0] / 5) + 1
        //console.log(Time[0])
        
        circlenum = parseInt(countDownNum / timesum * 100)
        if (countDownNum / timesum * 100 != 0 && circlenum == 0)circlenum = 1 
        //console.log(that.data.clockwise, circlenum)
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        //console.log(lastnum)
        that.setData({
          multiIndex: Time,
          multiArray: timeArray,
          countdownNum: countDownNum,
          circleNum: circlenum
        })}
        //that.data.multiArray[0][Time[0]] = lastnum;
      }, 10)
      //console.log(this.data.timer)
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
  
})
