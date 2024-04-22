document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.input_city');
    const btn = document.querySelector('.search_btn');
    const cityName = document.querySelector('.city_name');
    const degrees = document.querySelector('.degrees_outside');
    const weatherIcon = document.querySelector('.weather_icon');
    const weatherDescription = document.querySelector('.weather_description');
    const date = document.querySelector('.date');
    const body = document.querySelector('body');
    const feelsLike = document.querySelector('.weather_feels_like');
    const dayOneIcon = document.querySelector('.weather_day_one_icon');
    const dayTwoIcon = document.querySelector('.weather_day_two_icon');
    const dayThreeIcon = document.querySelector('.weather_day_three_icon');
    const dayOneMaxTemp = document.querySelector('.weather_day_one_maxtemp');
    const dayTwoMaxTemp = document.querySelector('.weather_day_two_maxtemp');
    const dayThreeMaxTemp = document.querySelector('.weather_day_three_maxtemp');
    const dayOneMinTemp = document.querySelector('.weather_day_one_mintemp');
    const dayTwoMinTemp = document.querySelector('.weather_day_two_mintemp');
    const dayThreeMinTemp = document.querySelector('.weather_day_three_mintemp');
    const dayOneDate = document.querySelector('.weather_day_one_date');
    const dayTwoDate = document.querySelector('.weather_day_two_date');
    const dayThreeDate = document.querySelector('.weather_day_three_date');
    const currentLocationButton = document.querySelector('.footer_container')
    const headerCurrentLocationButton = document.querySelector('.header_current_location_container')

    const keys = {
        weatherApiKey: 'ec74f5f2ff4c4eaa8d4215320241204',
        ipLocationApiKey: 'f8873c03ab9b4a38be495f2083e8db3a'
    }

    const rainyCondition = ['mist', 'patchy rain possible', 'patchy rain nearby', 'patchy light drizzle', 'light drizzle', 'freezing drizzle', 'heavy freezing drizzle',
    'patchy light rain', 'light rain', 'moderate rain at times', 'moderate rain', 'heavy rain at times', 'heavy rain', 'light freezing rain',
    'moderate or heavy freezing rain', 'light rain shower', 'moderate or heavy rain shower', 'torrential rain shower', 'moderate or heavy rain with thunder',
    'patchy light rain with thunder'];
const cloudyCondition = ['partly cloudy', 'cloudy', 'overcast', 'thundery outbreaks possible', 'fog', 'freezing fog'];
const sunnyCondition = ['sunny', 'clear'];
const snowCondition = ['patchy sleet possible', 'patchy snow possible', 'patchy freezing drizzle possible', 'blowing snow', 'blizzard',
    'moderate or heavy sleet', 'patchy light snow', 'light snow', 'patchy moderate snow', 'moderate snow', 'patchy heavy snow', 'heavy snow',
    'ice pellets', 'light sleet showers', 'moderate or heavy sleet showers', 'light snow showers', 'moderate or heavy snow showers',
    'light showers of ice pellets', 'moderate or heavy showers of ice pellets', 'patchy light snow with thunder', 'moderate or heavy snow with thunder'];


    fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${keys.ipLocationApiKey}`)
        .then((response) => response.json())
        .then((data) => {
            const city = data.city.name;
            getWeather(city);
        });

    function getWeather(city) {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${keys.weatherApiKey}&q=${city}&aqi=yes`)
            .then((response) => response.json())


        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${keys.weatherApiKey}&q=${city}&days=3&aqi=yes&alerts=no`)
            .then((response) => response.json())
            .then((data) =>
                display(data));
    }

    btn.addEventListener('click', () => {
        getWeather(input.value)
        input.value = "";
        document.querySelector('.suggestions').style.display = 'none';
    })

    input.addEventListener('keydown', (event) => {
        if (event.key == "Enter") {
            getWeather(input.value);
            input.value = "";
            document.querySelector('.suggestions').style.display = 'none';
        }
    })

    function display(param) {
        console.log(param)
        date.innerHTML = param.location.localtime;
        cityName.innerHTML = `${param.location.name}, ${param.location.country}`;
        degrees.innerHTML = `${param.current.temp_c}°`;
        weatherIcon.src = param.current.condition.icon;
        weatherDescription.innerHTML = param.current.condition.text;
        feelsLike.innerHTML = `Feels like: ${param.current.feelslike_c}°`;
        const weatherDescriptionText = weatherDescription.innerHTML.toLowerCase();

        if (cloudyCondition.includes(weatherDescriptionText)) {
            document.body.style.background = "url('img/backgrounds/cloudy_background.jpg')";
        } else if (sunnyCondition.includes(weatherDescriptionText)) {
            document.body.style.background = "url('img/backgrounds/sunny_background.jpg')";
        } else if (rainyCondition.includes(weatherDescriptionText)) {
            document.body.style.background = "url('img/backgrounds/rainy_background.jpg')";
        } else if (snowCondition.includes(weatherDescriptionText)) {
            document.body.style.background = "url('img/backgrounds/snow_background.jpg')";
        }

        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";

        firstDayDate = param.forecast.forecastday[0].date;
        const [firstDateYear, firstDateMonth, firstDateDay] = firstDayDate.split("-");
        const formattedFirstDate = `${firstDateMonth}.${firstDateDay}`;
        dayOneDate.innerHTML = formattedFirstDate;
        dayOneIcon.src = param.forecast.forecastday[0].day.condition.icon;
        dayOneMinTemp.innerHTML = `min: ${param.forecast.forecastday[0].day.mintemp_c}°`;
        dayOneMaxTemp.innerHTML = `max: ${param.forecast.forecastday[0].day.maxtemp_c}°`;

        secondDayDate = param.forecast.forecastday[1].date;
        const [secondDateYear, secondDateMonth, secondDateDay] = secondDayDate.split("-");
        const formattedSecondtDate = `${secondDateMonth}.${secondDateDay}`;
        dayTwoDate.innerHTML = formattedSecondtDate;
        dayTwoIcon.src = param.forecast.forecastday[1].day.condition.icon;
        dayTwoMinTemp.innerHTML = `min: ${param.forecast.forecastday[1].day.mintemp_c}°`;
        dayTwoMaxTemp.innerHTML = `max: ${param.forecast.forecastday[1].day.maxtemp_c}°`;

        thirdDayDate = param.forecast.forecastday[2].date;
        const [thirdDateYear, thirdDateMonth, thirdDateDay] = secondDayDate.split("-");
        const formattedThirdtDate = `${thirdDateMonth}.${thirdDateDay}`;
        dayThreeDate.innerHTML = formattedThirdtDate;
        dayThreeIcon.src = param.forecast.forecastday[2].day.condition.icon;
        dayThreeMinTemp.innerHTML = `min: ${param.forecast.forecastday[2].day.mintemp_c}°`;
        dayThreeMaxTemp.innerHTML = `max: ${param.forecast.forecastday[2].day.maxtemp_c}°`;

    }

    currentLocationButton.addEventListener('click', getCurrentLocationWeather);
    headerCurrentLocationButton.addEventListener('click', getCurrentLocationWeather);

    function getCurrentLocationWeather() {
        fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${keys.ipLocationApiKey}`)
            .then((response) => response.json())
            .then((data) => {
                const city = data.city.name;
                getWeather(city);
            });
    }

    input.addEventListener('input', function () {
        const cityInput = input.value;

        if (cityInput.length > 1) {
            fetch(`https://api.weatherapi.com/v1/search.json?key=${keys.weatherApiKey}&q=${cityInput}`)
                .then(response => response.json())
                .then(data => {
                    const suggestionsContainer = document.querySelector('.suggestions');
                    suggestionsContainer.innerHTML = '';
                    data.forEach(city => {
                        const div = document.createElement('div');
                        div.textContent = `${city.name}, ${city.country}`;
                        div.onclick = function () {
                            input.value = this.textContent;
                            getWeather(city.name);
                            suggestionsContainer.style.display = 'none';
                            input.value = "";
                        };
                        suggestionsContainer.appendChild(div);
                    });
                    suggestionsContainer.style.display = 'block';
                });
        } else {
            document.querySelector('.suggestions').style.display = 'none';
        }

    });



});
