//all imports should be at the top, import config to access the api key
import Config from '../../config.js';

let config = new Config();

const API_KEY = config.getKey();


// create a callback function that inserts the response into the nav div
function grabNav(response) {
  $('header').html(response);
}

// use the .get() method to call the header.html component
$.get('./components/header.html', grabNav);

// create a function for the form when submitted
$('#submit-btn').click(function(e) {
  e.preventDefault();
  let city = $('#city_search').val();

  // store url for call
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`

  // use jquery to send call for the current weather data
  $.get(url, function(response) {
    // console.log(response);

    $('#city_name').text(`${response.name}, ${response.sys.country}`);

    $('#high').html(`${response.main.temp_max.toFixed(0)}&#8457`);
    $('#low').html(`${response.main.temp_min.toFixed(0)}&#8457`);
    $('#forecast').text(`${response.weather[0].main}`);
    $('#humidity').text(`${response.main.humidity.toFixed(0)}%`);
  });

  // show the weather info cards
  $('#weather-info').css('display', 'block');
});

// hide the weather-info section immeditately on load
$('#weather-info').css('display', 'none');
