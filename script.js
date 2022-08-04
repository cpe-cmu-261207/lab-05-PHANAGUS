const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  //your code here
  if (inputAdd.value === "") {
    alert("Todo cannot be empty");
  } else {
    addTodo(inputAdd.value, false);
  }
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  //your code here
  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };
  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };

  //append todo to HTML...
  div.appendChild(span);
  doneBtn.style.display = "none";
  deleteBtn.style.display = "none";
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  todoCtn.prepend(div);

  //define buttons event...
  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through") {
      span.style.textDecoration = "";
      completed = true;
    } else {
      span.style.textDecoration = "line-through";
      completed = false;
    }
    saveTodo();
  };

  deleteBtn.onclick = () => {
    div.remove();
    localStorage.removeItem(span.innerText);
    saveTodo();
  };

  inputAdd.value = "";
  saveTodo();
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    //your code here
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    if (todoObj.title !== "\n            Done\n          ") data.push(todoObj);
  }
  //your code here
  const dataStr = JSON.stringify(data);
  localStorage.setItem("todoListData", dataStr);
}

function loadTodo() {
  //your code here
  if (localStorage.length > 0) {
    const dataStr = localStorage.getItem("todoListData");
    const data = JSON.parse(dataStr);
    const dataRv = data.reverse();
    for (const todoObj of dataRv) {
      addTodo(todoObj.title, todoObj.completed);
    }
  }
}

loadTodo();
