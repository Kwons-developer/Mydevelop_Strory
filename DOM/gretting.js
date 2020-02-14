const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

    const USER_LS = "currentUser",
        SHOWING_CN = "showing";

    
    function saveName(text){
        localStorage.setItem(USER_LS,text);
    }
       
       
    function handleSubmit(event){
        event.preventDefault();                     //input 의 what is your name? 에 입력이라는 이벤트를 하면 프로그램 이벤트를 처리하는데 아무 처리 프로그램이 없다면 기본 처리 방식인 새로고침이 된다. 그래서 preventDefault(); 메소드로 막음.
        const currentValue = input.value;           //input.value 는 인풋에 입력한 값. 
        paintGreeting(currentValue);
        saveName(currentValue);                 
    }

    function askForName(){
        form.classList.add(SHOWING_CN);
        form.addEventListener("submit",handleSubmit);
    }
    
    function paintGreeting(text){
        form.classList.remove(SHOWING_CN);
        greeting.classList.add(SHOWING_CN);
        greeting.innerText = `Hello ${text}`;
    }
    

    function loadName(){
        const currentUser = localStorage.getItem(USER_LS);

        if(currentUser === null){
            askForName();
        }else {
            paintGreeting(currentUser);
        }
    }

    function init(){
        loadName();
    }
    init();
    

  