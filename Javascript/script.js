const apiUrl = "http://localhost:4730/todos";
const btnAddTodo = document.querySelector("#btn-add-todo");
const todosList = document.querySelector("#todos-list");
const btnDeleteTodo = document.querySelector("#btn-delete-todo");

const todos = [];

loadTodos();

btnDeleteTodo.addEventListener("click", removeTodo);

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
    console.log(todo.description);
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
  createTodo(newTodo);
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
    console.log(response);

    return response.json();
  } catch (error) {
    throw new Error("Error creating new todo:", error);
  }
}

function updateTodo(event) {
  event.preventDefault();
  toggleTodoStatus(event.srcElement.todoObj);
}

async function toggleTodoStatus(todoObj) {
  try {
    const response = await fetch(`${apiUrl}/${todoObj.id}`, {
      method: "PUT",
      body: JSON.stringify({
        description: todoObj.description,
        done: !todoObj.done,
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

function removeTodo(event) {
  event.preventDefault();
  todos.forEach(async (element) => {
    if (element.done) {
      try {
        const response = await fetch(`${apiUrl}/${element.id}`, {
          method: "DELETE",
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
  });
}
