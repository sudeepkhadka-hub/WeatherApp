const apiKey = "87d58574d2d6be48834a5cfd496de6f6";

const weatherContainer = document.getElementById("weatherContainer");

async function fetchWeather() {
    const query = document.getElementById("searchInput").value;  
    // const category = document.getElementById("categorySelect").value;  
    let url = `https://api.weatherxu.com/v1/weather?city=Kathmandu&country=NP&apiKey=${apiKey}`;

    if (query) {
        url = `https://api.weatherxu.com/v1/weather?city=${query}&country=NP&apiKey=${apiKey}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "success") {
            displayWeather(data);
        } else {
            console.error("Failed to fetch weather data");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeather(weatherData) {
    newsContainer.innerHTML = ""; 
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weather-card");

    weatherCard.innerHTML = `
        <h3>Weather in Kathmandu, Nepal</h3>
        <p>Temperature: ${weatherData.temperature}°C</p>
        <p>Condition: ${weatherData.weather}</p>
        <p>Humidity: ${weatherData.humidity}%</p>
        <p>Wind Speed: ${weatherData.windSpeed} m/s</p>
    `;

    newsContainer.appendChild(weatherCard);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Fetch default weather info on page load
fetchWeather();
