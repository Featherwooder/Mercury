const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('.') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function formatTimeTwo(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

const getWeekByDate = dates => {
  let show_day = new Array(7, 1, 2, 3, 4, 5, 6);
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  return show_day[day];
}

module.exports = {
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  getWeekByDate: getWeekByDate
}
