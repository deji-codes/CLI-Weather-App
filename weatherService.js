const axios = require('axios');

require('dotenv').config();
const API_KEY = process.env.API_KEY;


if (!API_KEY) {
    console.error("API key is missing! Please add it to your .env file.");
    process.exit(1);
}

async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        return {
            city: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].main,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        };
    } catch (error) {
    if (error.response) {
        const code = error.response.data.cod;
        const message = error.response.data.message;

        // 🔍 Handle specific cases
        if (code === "404") {
            throw new Error("❌ City not found. Please enter a valid city.");
        }

        if (code === 401) {
            throw new Error("❌ Invalid API key. Check your API key.");
        }

        // fallback (other API errors)
        throw new Error(`❌ ${message}`);
    } else {
        throw new Error("❌ Network error. Please check your internet connection.");
    }
}
}

module.exports = { getWeather };