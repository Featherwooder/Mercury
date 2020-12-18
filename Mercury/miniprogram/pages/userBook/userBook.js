// pages/userBook/userBook.js
Page({

  /**
 * 页面的初始数据
 */
data: {
  list:[
    {listName:'如何开始？',
     item:[{
       content:'点击右下角的图标后，选择创建习惯，在页面中设定习惯日期、图标、名称和介绍，即可在主界面和我的习惯页面进行编辑和打卡',
     }]
    }, 
    {
      listName: '删除和编辑习惯',
      item: [{
        content: '点击右下角的图标后，选择我的习惯，左滑后进入习惯的编辑页面',
      }]
    }, {
      listName: '查看习惯打卡情况',
      item: [{
        content: '进入我的习惯页面后，轻点习惯条，可以进入对应习惯的打卡日历界面，查看打卡的情况',
      }]
    }, {
      listName: '番茄时钟功能',
      item: [{
        content: '点击右下角的图标后，选择专注时间长度进行倒数，其中每次专注时间结束后分配五分钟休息时间',
      }]
    }
  ]
},

//点击最外层列表展开收起
listTap(e){
  console.log('触发了最外层');
  let Index = e.currentTarget.dataset.parentindex,//获取点击的下标值
      list=this.data.list;
  list[Index].show = !list[Index].show || false;//变换其打开、关闭的状态
  if (list[Index].show){//如果点击后是展开状态，则让其他已经展开的列表变为收起状态
    this.packUp(list,Index);
  }

  this.setData({
    list
  });
},

//让所有的展开项，都变为收起
packUp(data,index){
  for (let i = 0, len = data.length; i < len; i++) {//其他最外层列表变为关闭状态
    if(index!=i){
      data[i].show = false;
      for (let j=0;j<data[i].item.length;j++){//其他所有内层也为关闭状态
          data[i].item[j].show=false;
      }
    }
  }
},
onLoad: function (options) {

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