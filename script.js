const apiUrl = "http://localhost:4730/todos";
const btnAddTodo = document.querySelector("#btn-add-todo");
const todoList = document.querySelector("#btn-add-todo");

const todo = [];

loadTodos();

btnAddTodo.addEventListener("click", addNewTodo);

todosList.addEventListener("change", updateTodo);

function loadTodos() {
  fetch(url)
    .then((response) => response.json())
    .then((todosFromApi) => {
      todos.push(...todosFromApi);
      renderTodos();
    });
}

function renderTodos() {
  todosList.innerText = "";

  for (const todo of todos) {
    console.log(todo);
    const listElement = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = todo.id;
    checkbox.checked = todo.done;
    checkbox.todoObj = todo;

    const description = document.createElement("label");
    description.htmlFor = checkbox.id;
    description.innerText = todo.description;

    listElement.append(checkbox, description);

    todosList.append(listElement);
  }
}

function addNewTodo(event) {
  event.preventDefault();

  const todoDescription = document.querySelector("#new-todo");

  const newTodo = {
    description: todoDescription.value,
    done: false,
  };

  todos.push(newTodo);
  renderTodos();
}

function updateTodo(event) {
  const updatedTodo = event.target.todo;
  const todoId = updatedTodo.id;

  updatedTodo.done = !updatedTodo.done;
}
