//выбор DOM-элементов.
const input = document.querySelector("input[type='text']");
const ul = document.querySelector(".todos");
const spans = document.getElementsByTagName("span");
const saveButton = document.querySelector(".save");
const clearButton = document.querySelector(".clear");
const pencil = document.querySelector(".pencil");

//Функция удаления по нажатию span.
function deleteTodo() {
  for (let span of spans) {
    span.addEventListener("click", function() {
      span.parentElement.remove();
      event.stopPropagation();
    });
  }
}

//функция загрузки из local storage.
function loadTodo() {
  if (localStorage.getItem("todoList")) {
    ul.innerHTML = localStorage.getItem("todoList");
    deleteTodo();
  }
}

//обработчик события для input - клавиша Enter.
input.addEventListener("keypress", function(keyPressed) {
  if (keyPressed.which === 13) {
    //создание li(span.cross + текст)
    const li = document.createElement("li");
    const icon = document.createElement("span");
    const newTodo = this.value;
    this.value = " ";
    icon.classList.add("cross");
    ul.appendChild(li).append(icon, newTodo);
    deleteTodo();
  }
});

//обработчик события для клика по ul - добавление класса checked для li.
ul.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

//обработчик события для клика по img.pencil - добавление переключателя класса display.
pencil.addEventListener("click", function() {
  input.classList.toggle("display");
});

//обработчик события для клика по button.save - сохранение в local storage.
saveButton.addEventListener("click", function() {
  localStorage.setItem("todoList", ul.innerHTML);
});

//обработчик события для клика по button.clear - удаление всех элементов из ul и очистка local storage.
clearButton.addEventListener("click", function() {
  ul.innerHTML = "";
  localStorage.removeItem("todoList", ul.innerHTML);
});

deleteTodo();

loadTodo();
