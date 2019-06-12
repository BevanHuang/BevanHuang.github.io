var i = 0;
var text = '';
var list = [];

$(function() {
  $('#newTodo').on('keypress', function(event) {
    if(event.keyCode != '13') {
      // 不按下回车什么都不做
    } else {
      console.log("hi");
      i = i + 1;
      text = $(event.target).val();
      addTodo(i);    // 添加一个待办(todo) 节点
      addArray(i, text);    // 添加一个待办(todo)进入 数组
      updateTodosCouts();   // 更新显示的待办(todo)事件的数量
      isHasCompleted();     // 判断 todo 是否已经完成（已经完成）,如果已经完成则只显示已完成的
    }
    deleteTodo();   // 删除 todo
    addBoxForAll(); // 给 all 加 box 类
    editTodo();     // 双击可以编辑 todo
    check();        // todo 完成时，点击 input[type='checkbox'] 按钮时，执行相关操作
  });
});

// 添加一个待办 节点
function addTodo(id) {
  var newTodoValue = $('#newTodo').val();
  $('#newTodo').val('');
  var template_html = $('.todo-li-template').clone(true);
  template_html.find('.todo-name').text(newTodoValue);
  template_html.removeClass('hidden');
  template_html.removeClass('todo-li-template');
  template_html.attr('data-id', String(id));

  $('#list').append(template_html);
}

// 添加一个待办进入 数组
function addArray(id, text) {
  list.push({
    id: id,
    status: 'todo',
    text: text
  });
}

// 更新显示的待办事件的数量
function updateTodosCouts() {
  var num = 0;
  list.forEach(function(item){
    if(item.status == 'todo'){
      num++;
    }
  });
  $('#footer-num').text(num);
}

// 删除 todo
function deleteTodo() {
  $('.destroy').on('click', function(event) {
    $(this).addClass("btn-click");
    setTimeout(function() {
      $(event.target).parents('.todo').remove();
      deleteTodoOfArray(Number($(event.target).parents('.todo').data('id')));
    }, 200);
  });
}

// 从数组中删除 todo
function deleteTodoOfArray(id) {
  list.forEach(function(item, index) {
    if(item.id == id) {
      list.splice(index, 1);
    }
  });
  updateTodosCouts();
}

// 完成时，点击 input[type='checkbox'] 按钮时，执行
function check() {
  $('.toggle').on('click', function(event) {
    if($(event.target).is(':checked')) {
      todoToDone(Number($(event.target).parents('.todo').data('id')), event);
      $(event.target).siblings('.todo-name').addClass('line');
    } else {
      doneToTodo(Number($(event.target).parents('.todo').data('id')));
      $(event.target).siblings('.todo-name').removeClass('line');
    }
    isHasCompleted();
    isHasActive();
  });
}

// 判断 todo 是否已经完成（已经完成）
function isHasCompleted() {
  $('.footbtn li').each(function() {
    if($('.footbtn').find('.box').find('a').attr('id') == 'completed') {
      completedTodo();
    }
  });
}
function completedTodo() {
  $('#list li').each(function(index, element) {
    if($(element).find('.todo-name').hasClass('line')) {
      $(element).show();
    } else {
      $(element).hide();
    }
  });
}

// 判断 todo 是否已经完成（还未完成）
function isHasActive() {
  $('.footbtn li').each(function() {
    if($('.footbtn').find('.box').find('a').attr('id') == 'active') {
      ActiveTodo();
    }
  });
}
function ActiveTodo() {
  $('#list li').each(function(index, element) {
    if($(element).find('.todo-name').hasClass('line')) {
      $(element).hide();
    } else {
      $(element).done();
    }
  });
}

// 在 list 数组里找到 id 为参数的项，把它的 status 改为 done
function todoToDone(id, event) {
  list.forEach(function(item) {
    if(item.id == id) {
      item.status = 'done';
    }
  });
  updateTodosCouts();
}
// 在 list 数组里找到 id 为参数的项，把它的 status 改为 todo
function doneToTodo(id) {
  list.forEach(function(item) {
    if(item.id == id) {
      item.status = 'todo';
    }
  });
  updateTodosCouts();
}

// 双击可以编辑 todo
function editTodo() {
  $('#list').dblclick(function (event) {
    if($(event.target).hasClass('todo-name')) {
      var $newtodos = $(event.target).parents('.todo').find('.newtodos');
      var resetTodos = $(event.target).text();
      $newtodos.removeClass('hidden');
      $newtodos.val(resetTodos);
    }
  });
}

// todo 被编辑时按回车时执行
function alterTodo(event) {
  if(event.keyCode == '13') {
    $(event.target).parents('.todo').find('.todo-name').text($(event.target).val());
    $(event.target).addClass('hidden');
  }
}

// 给 all 加 box 类
function addBoxForAll() {
  $('#all').on('click', function() {
    $('#list li').show();
    $('.footbtn li').removeClass('box');
    $('#all').parent().addClass('box');
  });
}
// 点击 todo 时
$('#active').on('click', function() {
  activeTodos();
  $('.footbtn li').removeClass('box');
  $('#active').parent().addClass('box');
});
function activeTodos() {
  $('#list li').each(function(index, element) {
    if($(element).find('.todo-name').hasClass('line')) {
      $(element).hide();
    } else {
      $(element).show();
    }
  });
}
// 点击 done 时
$('#completed').on('click', function() {
  completedTodos();
  $('.footbtn li').removeClass('box');
  $('#completed').parent().addClass('box');
});
function completedTodos() {
  $('#list li').each(function(index, element) {
    if($(element).find('.todo-name').hasClass('line')) {
      $(element).show();
    } else {
      $(element).hide();
    }
  });
}
