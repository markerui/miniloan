function formatTime(date) {
  var date = new Date(date);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function setStatus(value){
  switch (value) {
      case 1:
          return '待收款';
          break;
      case 3:
          return '已付款';
          break;
      case 5:
          return '已取消';
          break;
      default:
          break;
  }
}

module.exports = {
  formatTime: formatTime,
  setStatus: setStatus 
}
