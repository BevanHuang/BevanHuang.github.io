var h, m, s; // 设置全局变量
var tempString;
var count = 0;
var input = new Array(3);
var AlarmList = new Array();
var music = document.getElementById("music");
var focus = document.getElementById("hours");
var rightBar = document.getElementsByClassName("right");  // 获取right节点
var showAC = document.getElementsByClassName("showAlarmList");
var showButton = document.getElementById("show");
var CloseShowButton = document.getElementById("closeShow");
var firstSpan = document.getElementsByClassName("firstSpan");
var secondSpan = document.getElementsByClassName("secondSpan");
var ul = document.getElementById("ul");

function startTime(){
  // 获取时间
  var now =  new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  //加上0
  hours = addZero(hours);
  minutes = addZero(minutes);
  seconds = addZero(seconds);

  // 获取放置时间的 span 元素，并把时间显示
  var time = document.getElementById("time");
  time.innerHTML = hours + " : " + minutes + " : " + seconds;

  t = setTimeout('startTime()', 500);   // 返回一个 ID（数字），可以将这个ID传递给 clearTimeout() 来取消执行

  // h = 20; ????


  for (var i = 0; i < AlarmList.length; i++) {
    if(AlarmList[i].hours==hours && AlarmList[i].minutes==minutes && AlarmList[i].seconds==seconds){
      alert("闹钟响了！");
      music.play();
    }
  }
}

// 点击添加闹钟后执行
function addAlarmClock() {
  input[0] = addZero(document.getElementById("hours").value);
  input[1] = addZero(document.getElementById("minutes").value);
  input[2] = addZero(document.getElementById("seconds").value);
  if(input[0] == "" || input[1] == "" || input[2] == ""){
    alert("输入不能为空");
    return 0;
  }
  AlarmList[count] = new AlarmObject(input[0], input[1], input[2]);
  count++;
  rightBar[0].style.display = "none";
  alert("闹钟添加成功");
  var i = AlarmList.length - 1;
  addNode(i);
  computedLT(i);
  for (var i = 0; i < AlarmList.length; i++) {
    tempString = AlarmList[i].hours + ":" + AlarmList[i].minutes + ":" + AlarmList[i].seconds;
    firstSpan[i].innerHTML = tempString;
  }
}

function computedLT(i){
  // 获取时间
  var now =  new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  //加上0
  hours = addZero(hours);
  minutes = addZero(minutes);
  seconds = addZero(seconds);

  /*    计算剩余时间     */
  var leftH = AlarmList[i].hours;
  var leftM = AlarmList[i].minutes;
  var leftS = AlarmList[i].seconds;
  var leftTime = "";

  // 从秒开始算
  if(leftS - seconds >= 0) {
    leftS = leftS - seconds;
    computedMinutes();
  } else if(leftS - seconds < 0) {
    leftS = leftS - seconds + 60;
    minutes++;
    computedMinutes();
  }
  // 剩余时间计算完成

  leftTime = leftTime + leftS + " 秒后响铃";  // 拼接字符串完成
  alert(leftTime);

  var LT = document.createTextNode(leftTime);
  // secondSpan[i].appendChild(LT); // 插入span
  LT = "";
  leftTime = "";

  function computedMinutes(){
    // minutes
    if(leftM - minutes >= 0) {
      leftM = leftM - minutes;
    } else if(leftM - minutes < 0) {
      leftM = leftM - minutes + 60;
      hours++;
      computedHours();
    }
    leftTime = leftTime + leftM + " 分钟 ";
  }

  function computedHours(){
    // hours
    if(leftH - hours >= 0) {
      leftH = leftH - hours;
    } else if(leftH - hours < 0) {
      leftH = leftH - hours + 24;
    }
    leftTime = leftTime + leftH + " 小时 ";
  }
  /*    计算剩余时间     */
}

// 存放闹钟时间的对象
function AlarmObject(hours, minutes, seconds) {
  this.hours = hours;
  this.minutes = minutes;
  this.seconds = seconds;
}

// 弹出设置闹钟的界面
function setAlarmClock (){
  rightBar[0].style.display = "block";
  // setTimeout(function () {
  //   rightBar.style.opacity = 1;
  // },100);
  focus.focus();
}

// 展示已经设置好的闹钟
function showAlarmClock() {
  ul.style.display = "block";
  show.style.display = "none";
  CloseShowButton.style.display = "block";
}

function closeShowAlarmClock() {
  ul.style.display = "none";
  show.style.display = "block";
  CloseShowButton.style.display = "none";
}


function addZero(i) {
  if (i < 10 && i != 0) {
    i = "0" + i;
  }
  return i;
}

function addNode(i) {
  var li = document.createElement("li");
  ul.appendChild(li);
  var div = document.createElement("div");
  div.className = "showAlarmList";
  li.appendChild(div);
  var span1 = document.createElement("span");
  span1.className = "firstSpan";
  var span2 = document.createElement("span");
  span2.className = "secondSpan";
  var a = document.createElement("a");
  a.className = "closeAlarmClock";
  div.appendChild(span1);
  div.appendChild(span2);
  div.appendChild(a);
  var text = document.createTextNode("关闭闹钟");
  a.appendChild(text);
  a.onclick = function() {
    alert("抱歉。暂时不开放关闭闹钟功能！")
  }
  // 暂时不开放关闭闹钟功能
  // a.onclick = function() {
  //   var aLi = ul.children;
  //   var removeDivSon = div.children;
  //   var removeLiSon = li.children;
  //   div.removeChild(removeDivSon[0]);
  //   div.removeChild(removeDivSon[1]);
  //   // div.removeChild(removeDivSon[2]);
  //   li.removeChild(removeLiSon[0]);
  //   ul.removeChild(aLi[i]);
  // }
}

// 限制输入
function numH(obj){
  if(parseInt(obj.value) > 23 || parseInt(obj.value) < 0){
    obj.value = "";
  }
  var indexOf = obj.value.toString().indexOf(".");
  if(indexOf >= 0) {
    var arr = obj.value.split(".");
    arr.length--;
    obj.value = arr.join("");
  }
  obj.value = obj.value.replace(/[^\d]/g,""); //清除"数字"和"."以外的字符
  obj.value = obj.value.replace(/^0/g,""); //清除"数字"和"."以外的字符
}
function numMAndS(obj){
  if(parseInt(obj.value) > 59 || parseInt(obj.value) < 0){
    obj.value = "";
  }
  var indexOf = obj.value.toString().indexOf(".");
  if(indexOf >= 0) {
    var arr = obj.value.split(".");
    arr.length--;
    obj.value = arr.join("");
  }
  obj.value = obj.value.replace(/[^\d]/g,""); //清除"数字"和"."以外的字符
  obj.value = obj.value.replace(/^0/g,""); //清除"数字"和"."以外的字符
}
// 限制输入
