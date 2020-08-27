let date = new Date();
let month = date.getUTCMonth()+1;
let day = date.getUTCDate();
let year = date.getUTCFullYear();
yearMonDay = year + "-" + month + "-" + day; 

class ToDoItem {
    constructor(title, deadline) {
      this.title = title;
      this.startDate = yearMonDay;
      this.deadline = deadline;
    }
  }
  
  class Interface {
    static displayTodos() {
      const todos = LocStore.getTodos();
  
      todos.forEach(
          function(todo){
              Interface.addTodoToList(todo)
        });
    }
  
    static addTodoToList(todo) {
      const list = document.getElementById('to-do-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
              <td>${todo.title}</td>
              <td>${todo.startDate}</td>
              <td>${todo.deadline}</td>
              <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
              <td><a href="#" class="btn btn-info btn-sm done">v</a></td>
          `;
  
      list.appendChild(row);
    }
  
    static doneTodo(el){
      if(el.classList.contains('done')){
        el.parentElement.parentElement.style.textDecoration="line-through"
      }
    }

    //event propagation gives ability to delete not only the first found element
    static deleteTodo(el) {
      if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }

    static clearFields() {
      document.getElementById('title').value = '';
      document.getElementById('deadline').value = '';
    }

  }
  
  //local storage
  
  class LocStore {
    static getTodos() {
      let todos;
      if (localStorage.getItem('todos') === null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem('todos'));
      }
      return todos;
    }
  
    static addTodo(todo) {
      const todos = LocStore.getTodos();
  
      todos.push(todo);
  
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    static removeTodo(title) {
      const todos = LocStore.getTodos();
  
      todos.forEach(function (todo, index) {
        if (todo.title === title) {
          todos.splice(index, 1);
        }
      });
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }
  
  //show todos
  document.addEventListener('DOMContentLoaded', Interface.displayTodos);
  
  //add todo on submit
  document.getElementById('to-do-form').addEventListener('submit', function() {

    //get form values
    const title = document.getElementById('title').value;
    const deadline = document.getElementById('deadline').value;
  
    if (title === '' || deadline === '') {
      alert('Please fill in the form!');
    } else {
      const todo = new ToDoItem(title, deadline);

      Interface.addTodoToList(todo);
        
      LocStore.addTodo(todo)
  
      Interface.clearFields();
    }
  });
  

  document.getElementById('to-do-list').addEventListener('click', function(el) {
  
      Interface.deleteTodo(el.target);

      LocStore.removeTodo(
        el.target.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent
      );
  
  });

  document.getElementById('to-do-list').addEventListener('click', function(el){
    Interface.doneTodo(el.target)
  })
  

  