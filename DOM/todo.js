const todoform = document.querySelector(".js-toDoForm"),
    todoinput = todoform.querySelector("input"),
    todolist = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos= [];    

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todolist.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);                        //parseInt 는 string 을 숫자로 만든다, 내가 누른 li의 id와 일치하지 않으면 그것들을 배열로 cleanToDos 에 저장
    });
    toDos = cleanToDos;
    saveTodOS();
}


function saveTodOS(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function loadtodo(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {            //parsedToDos 의 배열 안에 있는 것들 하나하나를 인자 에 있는 함수를 호출함. toDo 자리에 배열 하나하나 들어가는거임.
        paintTodo(toDo.text);
    })
    }
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoinput.value;
    paintTodo(currentValue);
    todoinput.value="";
}

function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText="X";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todolist.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    }
    toDos.push(toDoObj);
    saveTodOS();
}   

function init(){
    loadtodo();
    todoform.addEventListener("submit", handleSubmit);
}

init();
