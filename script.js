const apiKey = "9d216cb6509f56624aa8f75eb86fb0cf"; // Replace with your OpenWeatherMap API key

document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch((error) => {
      document.getElementById("weather-result").textContent = error.message;
    });
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const temperature = main.temp;
  const feelsLike = main.feels_like;
  const description = weather[0].description;
  const humidity = main.humidity;
  const windSpeed = wind.speed;

  document.getElementById("weather-result").innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Feels Like: ${feelsLike}°C</p>
    <p>Condition: ${description}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
}
