const apiKey = "d98227c43ddaf8579fb94a8d4d8e8b43"; 
const weatherContainer = document.getElementById("weatherContainer");
let debounceTimeout;
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("search");

async function fetchWeather(query = 'Kathmandu') {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the request was successful (HTTP status 200)
        if (data.cod === 200) {
            displayWeather(data);  // Display weather data if successful
        } else {
            // If the city is not found or any other error in the API response
            console.error("Failed to fetch weather data:", data.message);
            weatherContainer.innerHTML = `<p style="color: red;">Error: ${data.message}. Please check the city name and try again.</p>`;
        }
    } catch (error) {
        // Handle any network or other errors
        console.error("Error fetching weather data:", error);
        weatherContainer.innerHTML = `<p style="color: red;">There was an error fetching the weather data. Please try again later.</p>`;
    }
}


function displayWeather(weatherData) {
    weatherContainer.innerHTML = "";  
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weather-card");

    weatherCard.innerHTML = `
        <h3>Weather in ${weatherData.name}, ${weatherData.sys.country}</h3>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Condition: ${weatherData.weather[0].description}</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    `;

    weatherContainer.appendChild(weatherCard);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
//search 
searchInput.addEventListener("input", function () {
    clearTimeout(debounceTimeout); 
    debounceTimeout = setTimeout(() => {
        const query = searchInput.value.trim();
        if (query) {
            fetchWeather(query);
        }}
)}, 5000); 
//btnnn
    searchButton.addEventListener("click", function () {
    const query = searchInput.value.trim();
    if (query) {
        fetchWeather(query);
    }
});

fetchWeather();
