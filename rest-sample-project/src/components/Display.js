import axios from "axios";
import { useState, useEffect } from "react";

const Display = ({countries}) => {
    console.log("from Display:", countries)
    const countryObject = Array.isArray(countries)? countries[0] : countries
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?"
    const languagesArr = Object.values(countryObject.languages);
    const flag = countryObject.flags.png
    const [lat,lon] = countryObject.latlng
    
    const [fTemp, setfTemp] = useState(null)
    const [weatherCondition, setWeatherCondition] = useState(null)
    const [iconURL, setIconURL] = useState(null)
    
    useEffect(()=>{
        const request = axios.get(`${weatherURL}lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_API_Key}`)
        request.then(response => {
        const weather = response.data.weather[0]
        setfTemp(response.data.main.temp)
        setWeatherCondition(weather.description)
        
        const weatherIconId = weather.icon
        const iconURL = `https://openweathermap.org/img/wn/${weatherIconId}@2x.png`
        setIconURL(iconURL)
    })},[lat, lon])
          
    
    return (
        <div>
          <h1>{countryObject.name.common}</h1>
          <p>capital: {countryObject.capital}</p>
          <p>area: {countryObject.area}</p>
          <h2>Languages</h2>
          <ul>
            {languagesArr.map((lang, key) => <li key={key}>{lang}</li>)}
          </ul>
          <img src={flag} alt="flag"/>

          {fTemp && weatherCondition && iconURL ? (
            <div>
            <h2>Weather in {countryObject.capital}</h2>
            <p>Temperature: {fTemp} Farenheit</p>
            <p>Currently: {weatherCondition}</p>
            <img src={iconURL} alt="weather condition icon" />
            </div>
            ):(<p>fetching weather api info...</p>)
            }
        </div>
      )
}

export default Display