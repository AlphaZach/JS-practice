/* global $ */
//when the page Document Object Model(DOM) is ready for Javascript
$(document).ready(function(){
  $.getJSON("/api/todos")
  .then(addTodos);
  
  $('#todoInput').keypress(function(event){
    if(event.which == 13){ // the key code for "Ente" is 13
      createTodo();
    }
  });
  
  $('.list').on('click', 'li', function() {
      updateTodo($(this));
  });
  
  $('.list').on('click','span',function(event){ // click on spans of list
    event.stopPropagation(); // stops the bubbling of an event to parent elements
    removeTodo($(this).parent());
  });
  
});

function addTodos(todos) {
  //add todos to page here
  todos.forEach(function(todo){
  addTodo(todo);
  });
}

function addTodo(todo){
  var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
  newTodo.data('id', todo._id); // store the id to data(), a jquery method
  newTodo.data('completed', todo.completed);
  if(todo.completed){
    newTodo.addClass("done");
  }
  $('.list').append(newTodo);
}

function createTodo(){
  var userInput = $('#todoInput').val();
  $.post('/api/todos', {name: userInput})
  .then(function(newTodo){
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err);
  });
}

function removeTodo(todo){
    var clickedId = todo.data('id');
    var deletedUrl = '/api/todos/' + clickedId;
    $.ajax({
      method: 'DELETE',
      url: deletedUrl
    })
    .then(function(data){
      todo.remove();
    });
    
}

function updateTodo(todo){
  var updatedUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone};
  $.ajax({
    method: 'PUT',
    url: updatedUrl,
    data: updateData
  })
  .then(function(updatedTodo){
    todo.toggleClass('done');
    todo.data('completed', isDone);
    console.log(updatedTodo);
  });
}