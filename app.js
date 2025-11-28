// Global variables
const inputText = document.getElementById('textInput');
const searchBtn = document.querySelector('.search-btn');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp');
const cityName = document.querySelector('.city-name');
const humidityParcent = document.getElementById('humidityParcent');
const windSpeed = document.getElementById('wind-speed-kph');

// API key
const apiKey = 'a762ce72433d45d5aee134651251011';

// Get weather data
const getWeather = async (city) => {
  try {
    // API URL
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    
    // Fetch the data
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error('City not found');
    }
    
    const data = await res.json();
    
    // Update UI
    cityName.textContent = data.location.name;
    temp.textContent = data.current.feelslike_c + '°c';
    weatherIcon.src = data.current.condition.icon;
    humidityParcent.textContent = data.current.humidity + '%';
    windSpeed.textContent = data.current.wind_kph + 'kph';
  } catch (err) {
    alert('Error: failed to find city');
    inputText.value = '';
  }
};

// Click event
searchBtn.addEventListener('click', () => {
  const city = inputText.value.trim();
  
  if (!city) {
    alert('Please enter a city name');
  } else {
    getWeather(city);
  }
});