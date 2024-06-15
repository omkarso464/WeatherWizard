document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const searchButton = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');

    searchButton.addEventListener('click', () => {
        const APIKey = 'bc6bd1e6e9a8ca286396cb67077abe99';
        const city = document.querySelector('.search-box input').value.trim();
        console.log(`City: ${city}`);
        if (city === '') {
            console.log('No city entered');
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                console.log(json);

                const image = document.querySelector('.weather img');
                const temperature = document.querySelector('.weather .temperature');
                const description = document.querySelector('.weather .description');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud1.png';
                        break;
                    case 'Mist':
                        image.src = 'images/mist.png';
                        break;
                    case 'Haze':
                        image.src = 'images/haze.png';
                        break;
                    default:
                        image.src = 'images/cloud.png';
                }

                temperature.textContent = `${json.main.temp}°C`;
                description.textContent = `${json.weather[0].description}`;
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
            });
    });
});
