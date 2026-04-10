require('dotenv').config();
const readline = require('readline');
const { getWeather } = require('./weatherService');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askCity() {
    rl.question("\nEnter a city name (or type 'exit' to quit): ", async (city) => {

        if (!city.trim()) {
            console.log("⚠️ Please enter a valid city.");
            return askCity();
        }

        if (city.toLowerCase() === 'exit') {
            console.log("👋 Goodbye!");
            rl.close();
            return;
        }

        try {
            const weather = await getWeather(city);

            console.log(`\n📍 City: ${weather.city}`);
            console.log(`🌡️  Temperature: ${weather.temperature}°C`);
            console.log(`☁️  Condition: ${weather.condition}`);
            console.log(`💧 Humidity: ${weather.humidity}%`);
            console.log(`💨 Wind Speed: ${weather.windSpeed} m/s`);

        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

        askCity(); // loop again
    });
}

askCity();