var h, m, s; // 设置全局变量
var i = 0; // 用于给每个闹钟添加 data-id 便于识别
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
var closeAlarmClock = document.getElementsByClassName("closeAlarmClock"); // 关闭闹钟的 <a> 节点

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
  let addI;
  input[0] = addZero(document.getElementById("hours").value);
  input[1] = addZero(document.getElementById("minutes").value);
  input[2] = addZero(document.getElementById("seconds").value);
  if(input[0] == "" || input[1] == "" || input[2] == ""){
    alert("输入不能为空");
    return 0;
  }

  // 把刚刚添加的时间放入 AlarmList 数组内
  // AlarmList[count] = new AlarmObject(input[0], input[1], input[2]);
  // count++;

  // 添加后隐藏
  rightBar[0].style.display = "none";
  alert("闹钟添加成功");
  i = i + 1;
  addNode(i);
  addArray(i, input[0], input[1], input[2]);
  addI = AlarmList.length - 1;
  computedLT(addI);
  // for (i = 0; i < AlarmList.length; i++) {
  tempString = AlarmList[addI].hours + ":" + AlarmList[addI].minutes + ":" + AlarmList[addI].seconds;
  firstSpan[addI].innerHTML = tempString;
  // addStringForFirstSpan(i);
  // closeAlarmClock[addI].addEventListener("click", closeAlarmClockFn(addI));
  // }
  closeAlarmClockFn(addI);
}
// 添加闹钟时，给数组加入一个新的对象
function addArray(id, hours, minutes, seconds) {
  AlarmList.push({
    id: id,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  });
}
// function addStringForFirstSpan(id) {
//   tempString = AlarmList[addI].hours + ":" + AlarmList[addI].minutes + ":" + AlarmList[addI].seconds;
//   firstSpan[addI].innerHTML = tempString;
//   AlarmList.forEach(function(item) {
//     if(item.id == id) {
//       $('da')
//     }
//   });
// }
function closeAlarmClockFn(addI) {
  // ul.removeChild(ul.children[addI]);
  // AlarmList.splice(addI,1);
  // console.log(AlarmList);
  // console.log(addI);
  // // addI--;
  // AlarmList.length--;
  // console.log(AlarmList);
  $('.closeAlarmClock').on('click', function(event) {
    $(event.target).parents('.li').remove();
    deleteArray(Number($(event.target).parents('.li').data('id')));
  });
  // alert("!");
  // console.log(event.target);
}
function deleteArray(id) {
  AlarmList.forEach(function(item, index) {
    if(item.id == id) {
      AlarmList.splice(index, 1);
    }
  });
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
  console.log('i' + i);
  console.log(AlarmList);
  console.log(AlarmList[i]);
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

  // 用于显示剩余时间，功能未实现，实现后看的有点乱，所以决定不添加
  // var LT = document.createTextNode(leftTime);
  // // secondSpan[i].appendChild(LT); // 插入span
  // LT = "";
  // leftTime = "";

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
function setAlarmClock(){
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
  // 当输入 3 或 4 个字符时，把前面的 0 去掉，并保留后两位
  if(i.length > 2) {
    var arr = i.split('');
    var tempArr = [];
    tempArr.push(arr[arr.length - 2]);
    tempArr.push(arr[arr.length - 1]);
    var result = tempArr.join('');
    return result;
  }
  if (i < 10 && i != 0) {
    i = "0" + i;
  }
  return i;
}

// 创建一个新的 li
function addNode(id) {
  var newNode = $('.li-template').clone(true);
  newNode.removeClass('hidden');
  newNode.removeClass('li-template');
  newNode.attr('data-id', String(id));
  $('#ul').append(newNode);
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
}
// 限制输入
