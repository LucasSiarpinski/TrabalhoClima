const apiKey = "8e12e943a9431a70bb25fa56c882921a";  // chave api
const apiCountryURL = "https://countryflagsapi.com/png/"; //

const cityInput = document.querySelector("#city-input");  //mapear cidade
const searchBtn = document.querySelector("#search");   //mapear o botao
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const temp_minElement = document.querySelector("#temp_min span");
const temp_maxElement = document.querySelector("#temp_max span");

const weatherContainer = document.querySelector("#weather-data");

// funções
const getWeatherData = async (city) => { // async -> metodo assincrono para ele esperar os dados  //função para pegar os dados
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;

};
const showWeatherData = async (city) => {    // função para mostrar os dados
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText =`${data.wind.speed}km/h`;
    temp_minElement.innerText = `Temp minima:${data.main.temp_min}C`;
    temp_maxElement.innerText = `Temp maxima:${data.main.temp_max}C`;

    weatherContainer.classList.remove("hide");
};

//Eventos
searchBtn.addEventListener("click", (e) => {  // acao no click do botao
    e.preventDefault();

    const city = cityInput.value;  // valor 

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {      // acao do botao enter
    if (e.code === "Enter"){
         const city = e.target.value;

         showWeatherData(city);
    }
});