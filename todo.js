const toDos = [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

function addTodo() {
  if (todoInput.value !== "") {
    const newItem = todoInput.value;

    const newTodoObj = {
      text: newItem,
      id: Date.now(),
      check: false,
    };

    todoInput.value = "";
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
  }
}

function paintToDo(newTodoObj) {
  const li = document.createElement("li");
  li.id = newTodoObj.id;

  const span = makeSpan(newTodoObj.text);
  const leftDiv = makeLeftDiv();
  const checkBox = makeCheckBox();

  if (newTodoObj.check === true) {
    checkBox.checked = true;
    span.className = "checked-list-content";
  }

  leftDiv.appendChild(checkBox);
  leftDiv.appendChild(span);

  li.appendChild(leftDiv);

  todoList.appendChild(li);
}

function makeLeftDiv() {
  const div = document.createElement("div");
  div.className = "todo-list-container-left";
  return div;
}

function makeSpan(newItem) {
  const span = document.createElement("span");
  span.innerText = newItem;
  span.className = "list-content";
  return span;
}

function makeCheckBox() {
  const input = document.createElement("input");
  input.className = "check-box";
  input.setAttribute("type", "checkbox");
  input.addEventListener("click", isChecked);
  return input;
}

function isChecked(event) {
  const isCheck = event.target.checked;
  const li = event.target.parentElement.parentElement;
  const span = event.target.parentElement.children[1];

  if (isCheck === true) {
    span.className = "checked-list-content";

    toDos.forEach((toDo) => {
      if (toDo.id === parseInt(li.id)) {
        toDo.check = true;
      }
    });
  } else {
    span.className = "list-content";

    toDos.forEach((toDo) => {
      if (toDo.id === parseInt(li.id)) {
        toDo.check = false;
      }
    });
  }

  saveToDos();
}

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

document.addEventListener("DOMContentLoaded", () => {
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });
});