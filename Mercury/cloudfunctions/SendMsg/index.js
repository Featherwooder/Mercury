const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
var week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 先取出集合记录总数
  const countResult = await db.collection('habits').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = await db.collection('habits').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  const usr_habits = (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
  const date = new Date().getDay()
  
  const myDate = new Date();
  const Y = myDate.getFullYear();
  const M = myDate.getMonth()+1;
  const D = myDate.getDate();
  const curDay = Y + '-'+ M + '-' + D;
  const results=[]
  try {
    for (var i = 0; i < usr_habits.data.length; i++) { //每个用户
      for (var j = 0; j < usr_habits.data[i].habits.length; j++) { //用户的每个habit
        var habit = usr_habits.data[i].habits[j]
        if (habit.week[week[date]]) {//判断当天的日期是否需要发送提醒
          const result = await cloud.openapi.subscribeMessage.send({
            touser: usr_habits.data[i]._openid,
            page: '/pages/index1/index1',
            lang: 'zh_CN',
            data: {
              thing7: {
                value: habit.title
              },
              thing10: {
                value: habit.remark
              },
              time11: {
                value:  curDay
              },
              thing4: {
                value: '今天记得打卡哦'
              }
            },
            templateId: 'G8PLO681GqSTI1EyEnRoU0Z2OqqUCQEnze-CfbNXhRg',
            miniprogramState: 'developer'
          })
          results.push(result)
        }
      }
    }
    return {
      usr_habits,
      results,
      date
    }
  } catch (err) {
    return err
  }
}