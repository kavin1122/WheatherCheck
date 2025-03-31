import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
const API_KEY="55e9b327023a45aea4592327253103";
const API_URL="https://api.openweathermap.org/data/2.5/weather";

function App(){
  const [city, setCity]=useState("Salem");
  const [climtData, setclimtData]=useState(null);
  const inputRef=useRef();

  useEffect(() => {
    inputRef.current.focus();
  },[]);

  const fetchWeather=useCallback(() => {
    fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res)=>res.json())
      .then((data)=>setclimtData(data))
      .catch((err)=>console.error("Failed to check wheather"));
  },[city]);
  return (
    <div className="App">
      <h1>Weather Checker</h1>
      <div className="container">
        <input
          type="text"
          ref={inputRef}
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Check</button>
        {climtData && climtData.main ?(
          <div>
            <h2>{climtData.name}</h2>
            <p>Weather:{climtData.weather[0].description}</p>
            <p>Temperature:{climtData.main.temp}°C</p>
          </div>
        ):null}
      </div>
    </div>
  );
}

export default App;