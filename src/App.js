import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState([]);
  const [cityName, setCityName] = useState("Berlin");

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(res => res.json())
      .then((weather) => {
        setWeather(weather)
      })
  }, [cityName])

  if (weather.weather === undefined) {
    return;
  }

  console.log(weather)

  let dateAccountForTimezone = new Date((new Date().getTime()) + weather.timezone * 1000)
  let updatedLocalTime = dateAccountForTimezone.toISOString().match(/\d\d:\d\d/);

  let weatherIconCode = weather.weather[0].icon;
  let userInputCityEl = document.getElementById("cityInput");


  return (
    <div className="App">
      <div className='wrapper'>
        <button onClick={() => setCityName("Leipzig")}>Leipzig</button>
        <button onClick={() => setCityName("München")}>München</button>
        <button onClick={() => setCityName("Wien")}>Wien</button>
        <button onClick={() => setCityName("Hamburg")}>Hamburg</button>
        <br />
        <input className="cityInput" name="cityInput" id='cityInput' type="text" placeholder='city name'></input>
        <button onClick={() => setCityName(userInputCityEl.value)}>Find My City</button>
        <p className='weatherOverview'>{weather.weather[0].description} in {weather.name}</p>
        <img src={`http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`} alt="current weather" />
        <p>Current: {weather.main.temp}°C</p>
        <p>Wind speed: {weather.wind.speed} m/sec</p>
        <p>Local time: {updatedLocalTime}</p>
        <p><a href={`https://www.google.com/maps/place/${weather.coord.lat},${weather.coord.lon}`}>[{weather.coord.lat}, {weather.coord.lon}]</a></p>
      </div>
    </div>
  );
}

export default App;
