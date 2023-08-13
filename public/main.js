const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')

// Fetch weather data from API
const fetchWeather = async (city) => {
  const url = `/api/weather?q=${city}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.cod === '404') {
    alert('City not found')
    return
  }

  if (data.cod === 401) {
    alert('Invalid API Key')
    return
  }

  const displayData = {
    city: data.name,
    temp: data.main.temp,
  }

  addWeatherToDOM(displayData)
}


// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;C</h2>
  `
  cityInput.value = ''

  document.body.className = updateBackground(data.temp)
}

// Update the background based on the temperature
const updateBackground = (temperature) => {
  let temperatureClass = '';

  if (temperature < 0) {
    temperatureClass = 'very-cold';
  } else if (temperature < 10) {
    temperatureClass = 'cold';
  } else if (temperature < 20) {
    temperatureClass = 'cool';
  } else if (temperature < 30) {
    temperatureClass = 'moderate';
  } else if (temperature < 35) {
    temperatureClass = 'warm';
  } else {
    temperatureClass = 'hot';
  }

  return temperatureClass;
}

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (cityInput.value === '') {
    alert('Please enter a city')
  } else {
    fetchWeather(cityInput.value)
  }
})

// Initial fetch
fetchWeather('Ha noi')
