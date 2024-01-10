const apiUrl = "http://localhost:4730/todos";
const btnAddTodo = document.querySelector("#btn-add-todo");
const todosList = document.querySelector("#todos-list");

const todos = [];

loadTodos();

btnAddTodo.addEventListener("click", addNewTodo);

todosList.addEventListener("change", updateTodo);

function loadTodos() {
  fetch(apiUrl)
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

async function createTodo(newTodo) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    throw new Error("Error creating new todo:", error);
  }
}

function updateTodo(event) {
  const updatedTodo = event.target.todo;
  const todoId = updatedTodo.id;

  updatedTodo.done = !updatedTodo.done;
}

toggleTodoStatus(todoId, !updatedTodo.done);
//   .then(() => {
//     // Refresh the todos from the API and update the UI
//     loadTodos();
//   })
//   .catch((error) => {
//     console.error("Error updating todo status:", error);
//   });

async function toggleTodoStatus(todoId, newStatus) {
  try {
    const response = await fetch(`${apiUrl}/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({
        completed: newStatus,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    throw new Error("Error updating todo status:", error);
  }
}
