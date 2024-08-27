window.addEventListener("DOMContentLoaded" ,() => {

    const place = document.querySelector("#weather-place");
    const search = document.querySelector("#search-weather");
    const modale = document.querySelector(".empty-place-modale");
    const closeModale = document.querySelector(".empty-place-modale");
    const closeErrorModale = document.querySelector(".close-error-modale");
    const errorModale = document.querySelector(".error-modale")

    closeErrorModale.addEventListener("click" ,() => {
        errorModale.style.display = "none"
    })

    closeModale.addEventListener("click", () => {
        modale.style.display = "none"
    })

    search.addEventListener("click",() => {
        if(place.value === ""){
            modale.style.display = 'flex'
        }
        else{
            fetchWeatherData(place.value)
            place.value = ""
        }
    })


function Showtime(){
    const timeContainer = document.querySelector(".time")
    timeContainer.innerHTML = "";
    setInterval(() => {
        const time = new Date().toLocaleTimeString()
        timeContainer.innerHTML = time
    },1000)
}
Showtime()
function revealPlace(location){
    const city = document.querySelector(".city")
    const country = document.querySelector(".country")
    const timeZone = document.querySelector(".time-zone")
    city.innerHTML = ""
    country.innerHTML = ""
    timeZone.innerHTML = ""
    city.innerHTML = location.name
    country.innerHTML = location.country
    timeZone.innerHTML = location.tz_id
}
function showCondition(temperature,condition,imageUrl){
    const weatherCondition = document.querySelector(".condition")
    const weatherIcon = document.querySelector(".weather-icon")
    const weatherTemperature = document.querySelector(".temperature")
    weatherCondition.innerHTML = ""
    weatherTemperature.innerHTML = ""
    weatherIcon.src = ""
    weatherCondition.innerHTML = condition
    weatherTemperature.innerHTML = `${temperature}&deg C`
    weatherIcon.src = `${imageUrl}`
}
function showMoreDetails (moreWeatherDetails) {
    console.log(moreWeatherDetails)
    const dewContainer = document.querySelector(".dew").innerHTML = `${moreWeatherDetails.dew}C`
    const feelsLike = document.querySelector(".feels-like").innerHTML = `${moreWeatherDetails.feelsLike}C`
    const windSpeed = document.querySelector(".wind-speed").innerHTML = `${moreWeatherDetails.windSpeed}KPH`
    const heatIndex = document.querySelector(".heat-index").innerHTML = `${moreWeatherDetails.heatIndex}C`
    const humidity = document.querySelector(".humidity").innerHTML = `${moreWeatherDetails.humidity}`
    const uvIndex = document.querySelector(".uv-index").innerHTML = `${moreWeatherDetails.uvIndex}`
    const pressure = document.querySelector(".pressure").innerHTML = `${moreWeatherDetails.pressure}mb`
    const visibility = document.querySelector(".visibility").innerHTML = `${moreWeatherDetails.visibility}KM`
    const windDir = document.querySelector(".wind-dir").innerHTML = `${moreWeatherDetails.windDir}`
    const cloud = document.querySelector(".cloud").innerHTML = `${moreWeatherDetails.cloud}`
}
    async function fetchWeatherData(location){
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=cb86f711e9cd4f5c9e8173234240104&q=${location}&aqi=yes`)
            if(!response.ok){
                console.log("The Response Is Unavailable")
                errorModale.style.display = "flex"
            }
            const data = await response.json()
            console.log(data)
            revealPlace(data.location)
            showCondition(data.current.temp_c,data.current.condition.text,data.current.condition.icon)
            const moreWeatherDetails = {
                dew:data.current.dewpoint_c,
                feelsLike:data.current.feelslike_c,
                windSpeed:data.current.wind_kph,
                humidity:data.current.humidity,
                heatIndex:data.current.heatindex_c,
                uvIndex:data.current.uv,
                pressure:data.current.pressure_mb,
                visibility:data.current.vis_km,
                windDir:data.current.wind_dir,
                cloud:data.current.cloud
            }
            // const airQualityIndex = data.current.air_quality
            showMoreDetails(moreWeatherDetails)
        } catch (error) {
            console.log("Something Went Error",error)
            errorModale.style.display = "flex"
        }
    }

})