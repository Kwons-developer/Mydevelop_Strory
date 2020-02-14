 const weather =document.querySelector(".js-weather");
 
 const API_KEY = "57e19e5bafa0e085ea701358bd6ef420";
 const COORDS = "coords";

 function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return (response.json());
    }).then(function(json){
        const temparature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temparature} @ ${place}`;
    })
 }

 function saveCoords(coordsObj){
    localStorage.setItem("COORDS", JSON.stringify(coordsObj));
 }
 
function handleGeoSucces(position){
    const latitude = position.coords.latitude;                          
    const longitude = position.coords.longitude;
    const coordsObj = {
            latitude,                               //latitude = latitude , longitude = longitude 과 똑같은거임. 객체의 key 와 이름 같게 사용할때.
            longitude
    };
    saveCoords(coordsObj);   
    getWeather(latitude, longitude);                           
}

function handleGeoError() {
    console.log("Cant access geo location");
}

 function askForCoords(){
     navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
 }
 
 function loadCoords(){
     const loadedCoords = localStorage.getItem(COORDS);
     if(loadedCoords === null)
     {
         askForCoords();
     } else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude); 
                
     }
 }



function init(){
    loadCoords();
}
init();