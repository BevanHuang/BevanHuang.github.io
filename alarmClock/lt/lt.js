var multiple = 1;
var time = document.getElementById("time"); // 获取显示时间的节点
var showMultiple = document.getElementById("showMultiple"); // 获取显示时间的节点
var text = document.createTextNode(multiple);
showMultiple.appendChild(text);
tSpeedUp = 0;
tDecelerate = 0;

$(function resetTime() {
  $('.reset').on('click' ,function() {
    clearInterval(tSpeedUp);
    clearInterval(tDecelerate);
    multiple = 1;
    $('#showMultiple').text(multiple);
    t = setInterval("showTime(multiple)", 1000);
  });
});

var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();


function showTime(mul){
  var date = new Date();
  // console.log(mul);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  hours = addZero(hours);
  minutes = addZero(minutes);
  seconds = addZero(seconds);
  time.innerHTML = hours + ":" + minutes + ":" + seconds;
}
t = setInterval("showTime(multiple)", 1000);

// 时间加快
function getFastTime(mul){
  seconds = seconds + 1 * mul;

  if(seconds >= 60){
    minutes = Math.floor(seconds / 60) + minutes;
    seconds = seconds % 60;
  }
  if(minutes >= 60){
    hours = Math.floor(minutes / 60) + hours;
    minutes = minutes % 60;
  }
  if(hours >= 24){
    hours = hours % 24;
  }
  // hours = addZero(hours);
  // minutes = addZero(minutes);
  // seconds = addZero(seconds);
  // 不用在时间前面加 0 了。加了会出bug。目前不知道什么情况
  time.innerHTML = hours + ":" + minutes + ":" + seconds;
}

// 时间减慢
function getSlowTime(mul){
  if(mul > 1){
    seconds = seconds + 1 * mul;
    if(seconds >= 60){
      minutes = Math.floor(seconds / 60) + minutes;
      seconds = seconds % 60;
    }
    if(minutes >= 60){
      hours = Math.floor(minutes / 60) + hours;
      minutes = minutes % 60;
    }
    if(hours >= 24){
      hours = hours % 24;
    } else if(seconds > 0 && seconds < 60){
      minutes = minutes + Math.ceil(seconds / 60); //减少的分钟数
    }
  } else if(multiple == 0){
    alert("The World!!!");
    clearInterval(tDecelerate);
  } else if(multiple < 0){
    seconds = seconds + (1 * mul);
    if(seconds < 0){
      minutes = minutes - Math.ceil(Math.abs(seconds) / 60); //减少的分钟数
      seconds = seconds % 60 + 60;  // 显示的秒钟数
      if(minutes < 0) {
        hours = hours - Math.ceil(Math.abs(minutes) / 60); //减少的小时数
        minutes = minutes % + 60;  // 显示的分钟数
      }
      if(hours < 0){
        hours = (hours + 24) % 24;
      }
    }
  }
  // hours = addZero(hours);
  // minutes = addZero(minutes);
  // seconds = addZero(seconds);
  // 不用在时间前面加 0 了。加了会出bug。目前不知道什么情况
  time.innerHTML = hours + ":" + minutes + ":" + seconds;
}


// 点击 + 执行的函数
function speedUp() {
  // 点击 + 时，每次增加 1
  multiple++;

  // 改变倍数
  var text = document.createTextNode(multiple);
  showMultiple.replaceChild(text, showMultiple.firstChild);

  clearInterval(t);
  clearInterval(tSpeedUp);
  clearInterval(tDecelerate);
  tSpeedUp = setInterval("getFastTime(multiple)", 1000);
  // clearInterval(tSpeedUp);
}

// 点击 - 执行的函数
function decelerate() {
  // 点击 - 时，每次减少 1
    multiple--;

  // 改变倍数
  var text = document.createTextNode(multiple);
  showMultiple.replaceChild(text, showMultiple.firstChild);

  clearInterval(t);
  clearInterval(tSpeedUp);
  clearInterval(tDecelerate);
  tDecelerate = setInterval("getSlowTime(multiple)", 1000);
  // clearInterval(tDecelerate);
}

function addZero(addzero) {
  if (addzero < 10 && addZero != "00") {
    addzero = "0" + addzero;
  }
  return addzero;
}
