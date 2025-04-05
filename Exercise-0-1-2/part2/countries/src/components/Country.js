import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        const capital = country.capital
        const api_key = process.env.REACT_APP_OPENWEATHER_API_KEY
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
            .then(response => {
                const apiWeather = response.data
                setWeather([apiWeather])
            }).catch(error => {
                console.log(error)
            })
    })

    if (weather.length > 0) {
        const currentWeather = weather[0]

        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital: {country.capital}</p>
                <p>area: {country.area}</p>
                <h2>languages:</h2>
                <ul>
                    {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
                </ul>
                <div>
                    <img alt={country.name.common} src={country.flags.png}></img>
                </div>
                <h2>Weather in {country.capital}</h2>
                <p>temp: {currentWeather.main['temp']} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}></img>
                <p>wind: {currentWeather.wind['speed']} m/s</p>
            </div>
        )
    }
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h2>languages:</h2>
            <ul>
                {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
            </ul>
            <div>
                <img alt={country.name.common} src={country.flags.png}></img>
            </div>
        </div>
    )

}

export default Country