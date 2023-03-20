const searchBar = document.querySelector(".searchBar")
const searchBtn = document.querySelector(".searchBtn")
const mainCard = document.querySelector(".mainCard")
mainCard.style.display = "none"
const cityName = document.querySelector(".cityName")
const currentImg = document.querySelector(".currentImg")
const weatherInfo = document.querySelector(".weatherInfo")
const temp = document.querySelector(".temp")
const hum = document.querySelector(".hum")
const speed = document.querySelector(".speed")
const forecsastSection = document.querySelector(".forecastSection")
const forecast = document.querySelectorAll(".forecast")



function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=bcfa316ac4a92e2dc57b89b031e757b9&units=imperial`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            mainCard.style.display = "block"
            console.log(data)
            cityName.innerHTML = data.name
            currentImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            temp.innerHTML = "Temp: " + Math.floor(data.main.temp) + `&#176F`
            hum.innerHTML = "Humidity: " + Math.floor(data.main.humidity) + "%" 
            speed.innerHTML = "Wind Speed: " + Math.floor(data.wind.speed) + "mph"

        })
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=` + city + `&appid=bcfa316ac4a92e2dc57b89b031e757b9&units=imperial`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            // let forecast = document.getElementById("forecastSection")
            console.log(data)
            for(let i = 0; i < forecast.length; i++) {
                const index = i * 8 + 4
                let mainCard = document.createElement("div") 
                mainCard.classList.add("mainCard")       
                let weatherInfo = document.createElement('ul')
                weatherInfo.classList.add('weatherInfo')
                let temp = document.createElement("li")
                temp.classList.add("temp")
                temp.innerHTML =  "Temp: " + Math.floor(data.list[index].main.temp)+ `&#176F;`
                weatherInfo.appendChild(temp)
                let humidity = document.createElement("li")
                humidity.classList.add("hum")
                humidity.innerHTML = "humidity: " + data.list[index].main.humidity+ "&percnt;"
                weatherInfo.appendChild(humidity)
                let speed = document.createElement("li")
                speed.innerHTML = "wind speed: " + Math.floor(data.list[index].wind.speed)+ `mph`
                weatherInfo.appendChild(speed)
                mainCard.appendChild(weatherInfo)
                forecast[index] =mainCard
            }
        })
}

searchBtn.addEventListener("click", function () {
    const searchInput = searchBar.value

    getWeather(searchInput)
})