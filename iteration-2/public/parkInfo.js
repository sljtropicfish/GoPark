//vars and functions for display weather
var apiKey = '10f94b0cb5894b743b1992648c4faa8b';

function callWeather(){
  var req = new XMLHttpRequest();
  var zip = document.getElementsByTagName("weather")[0].attributes[0].value
  req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&units=imperial' + '&appid=' + apiKey, true);
  req.addEventListener('load', function(){
    if(req.status >=200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log(response);
      document.getElementById('parkName').textContent = response.name;
      document.getElementById('weather').textContent = response.weather[0].main;
      document.getElementById('temperature').textContent = response.main.temp + ' ºF';
      document.getElementById('humidity').textContent = response.main.humidity +'%';
    } else {
      console.log('Error: ' + req.statusText);
      document.getElementById('cityResult').textContent ='';      //clear the output
      document.getElementById('weather').textContent = '';
      document.getElementById('temperature').textContent = '';
      document.getElementById('humidity').textContent = '';
    }
  });
  req.send(null);
}

callWeather();
