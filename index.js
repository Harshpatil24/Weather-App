const apiKey = "5e49ac3c5e07b4e6e367102228f7da7f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";/*"https://api.openweathermap.org/data/2.5/weather?units=metric&q=" ;*/ 

const searchBox = document.querySelector("#city-input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status == 404 || !response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }
        
        const data = await response.json();

        if (!data.main || !data.weather) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerText = data.main.humidity + "%";
        document.querySelector(".wind").innerText = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                weatherIcon.src = "images/default.png"; // Default icon for other weather conditions
        }

        document.querySelector(".Weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Error fetching the weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
