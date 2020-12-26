// const { fail } = require("assert");

// pages/tomatotimer/tomatotimer.js
const todaydate = new Date()
const app = getApp()
// const daytomato = app.globalData.daytomato
//var daytomato = wx.getStorageSync('daytomato')||{}
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
    //以下是日志使用变量
    today: new Date().getTime(),
    date: '',
    show: false,
    minDate: new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()).getTime(),
    maxDate: new Date().getTime(),
    showdialog: true,
    tomatotitle:'',
    tomatodo:'',
    tomato: {
      time: '',
      name: '',
      finish:false
    },
    formatter(day) {
      //console.log(daytomato)
      const year = day.date.getFullYear();
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      const datetomato = year + '/' + month + '/' + date
      if (app.globalData.daytomato[datetomato] === true) {
        //console.log(daytomato[datetomato])
        day.type = 'selected'
      }
      if (day.date.getFullYear() === todaydate.getFullYear() && day.date.getMonth() === todaydate.getMonth() && day.date.getDate() === todaydate.getDate() && app.globalData.daytomato[datetomato] === undefined) {
        //如果是今天而且今天没有使用过那就不选中
        day.type = 'null';
      }
      return day;
      /*
      var stordate = wx.getStorageSync('tomato-' + year + '/' + month + '/' + date)
      //console.log(year + '/' + month + '/' + date)
      if (stordate.length != 0) {
        console.log(stordate)
        day.type = 'selected';
      }

      const db=wx.cloud.database()
      const testDB = wx.cloud.database({
        env: 'mercury-3i5av'
      })
      const tomatos=db.collection('tomato')
      tomatos.doc(app.globalData.openid + year + '/' + month + '/' + date).get({
        success: function(res) {
          // res.data 包含该记录的数据
          date.type = 'selected'
          console.log('success',res.data)
        }
      })
      console.log(todaydate) 
      console.log(day.date)&& day.type !== 'selected'
      */
    },

  },

  opencalendar: function () {
    app.get_auth()
    this.setData({ show: true });
    console.log(this.data)
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
    console.log(this.data.date)
    wx.navigateTo({
      url: '../../pages/tomatoLog/tomatoLog' + '?'+ 'date='+ this.data.date
    })
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
    app.get_auth()
    console.log('error')
    wx.showToast({
      title: '专注中，不可修改',
      icon:'none',
      duration: 1000
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      tomatotitle: e.detail.value
    })
  },
  starttimer:function () {
    if (this.data.tomatotitle === '') {
      console.log('测试：',this.data.tomatotitle)
      wx.showToast({
        title: '请输入内容',
        duration:1000,
        icon:'none'
      })
      return;
    }
    this.setData({
      showdialog : true,
    })
    console.log('内容：',this.data.tomatotitle)
    this.setData({
      startcount : true,
      startimg : false,
    })
    this.countdown();
    this.data.tomato.name = this.data.tomatotitle
    this.data.tomato.time = this.data.minback[0][this.data.multiIndex[0]] + ':' + this.data.minback[1][this.data.multiIndex[1]]
    var tomatodo = this.data.tomatotitle
    this.setData({
      tomatodo : tomatodo,
      tomatotitle  : ''
    })
    //存到本地
    /*
    let tomatos = wx.getStorageSync('tomato-date')||[];
    tomatos.push(this.data.tomato)
    console.log(tomatos)
    wx.setStorageSync('tomato-date', tomatos)

    if (this.data.startimg == true && this.data.startcount == false){
      this.setData({
        startcount : true,
        startimg : false,
      })
      this.countdown();
    }
    */
  },
  confirmcountdown: function () {
    app.get_auth()
    this.setData({
      showdialog : false
    })
  },
  cancelcountdown: function () {
    this.setData({
      showdialog : true
    })
  } ,
  stoptimer: function () {
    app.get_auth()
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
  save_daytomato:function(){
    const db=wx.cloud.database()
    const testDB = wx.cloud.database({
      env: 'mercury-3i5av'
    })
    const daytomatos=db.collection('daytomato')
    daytomatos.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: app.globalData.openid,
        daytomatos : app.globalData.daytomato,
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail:function(res) {
        //console.log('测试：',res)
        daytomatos.doc(app.globalData.openid).update({
          data:{
            daytomatos: app.globalData.daytomato
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          },
        })
      }
    })
  },
  countdown : function() {
    var date = new Date().toLocaleDateString()
    app.globalData.daytomato[date]= true
    wx.setStorageSync('daytomato', app.globalData.daytomato)
    this.save_daytomato()
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
      that.data.timer = setInterval(function () {
 
        if (countDownNum == 0 || that.data.test == 0) {
          if (that.data.startimg == false){
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
                tomatotitle: ''
              })           
              that.data.tomato.finish = true

              //上传倒数据库
              const db=wx.cloud.database()
              const testDB = wx.cloud.database({
                env: 'mercury-3i5av'
              })
              const tomatos=db.collection('tomato')
              const _ = db.command
              tomatos.add({
                // data 字段表示需新增的 JSON 数据
                data: {
                  _id: app.globalData.openid + new Date().toLocaleDateString(),
                  tomatos : [that.data.tomato],
                  date: new Date().toLocaleDateString()
                },
                success: function(res) {
                  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                  console.log(res)
                },
                fail:function(res) {
                  //console.log('测试：',res)
                  tomatos.doc(app.globalData.openid + new Date().toLocaleDateString()).update({
                    data:{
                      tomatos: _.push(that.data.tomato)
                    },
                    success: function(res) {
                      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                      console.log(res)
                    },
                  })
                }
              })
              // let tomatos = wx.getStorageSync('tomato-' + new Date().toLocaleDateString())||[];
              // tomatos.push(that.data.tomato)
              // console.log(tomatos)
              // wx.setStorageSync('tomato-' + new Date().toLocaleDateString(), tomatos)

              //console.log('that',that.data)
          }
          else{//用户按停止之后恢复25分钟
            //console.log(that.data)
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
              tomatotitle:''
            })
            that.data.tomato.finish = false
            //上传倒数据库
            const db=wx.cloud.database()
            const testDB = wx.cloud.database({
              env: 'mercury-3i5av'
            })
            const tomatos=db.collection('tomato')
            const _ = db.command
            tomatos.add({
              // data 字段表示需新增的 JSON 数据
              data: {
                _id: app.globalData.openid + new Date().toLocaleDateString(),
                tomatos : [that.data.tomato],
                date: new Date().toLocaleDateString()
              },
              success: function(res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
              },
              fail:function(res) {
                //console.log('测试：',res)
                tomatos.doc(app.globalData.openid + new Date().toLocaleDateString()).update({
                  data:{
                    tomatos: _.push(that.data.tomato)
                  },
                  success: function(res) {
                    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                    console.log(res)
                  },
                })
              }
            })
            // let tomatos = wx.getStorageSync('tomato-' + new Date().toLocaleDateString())||[];
            // tomatos.push(that.data.tomato)
            // console.log(tomatos)
            // wx.setStorageSync('tomato-' + new Date().toLocaleDateString(), tomatos)
          }

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
          circleNum: circlenum,

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
