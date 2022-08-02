import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import "../src/Components/Style.css";
import RefComp from "./Components/RefComp";
// import { obj } from "./Components/data";

function App() {
  const [cityChange, setCityChange] = useState("");
  const [country, setCountry] = useState("");
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);

  const handlecityChange = (e) => {
    setCityChange(e.target.value);
  };

  const getweatherData = async () => {
    const response = await axios.post(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityChange}&appid=53f311d869c05c242c722ce469f2fa5c`
    );
    console.log(response);
    setCountry(response.data.city.country);
    setCityName(response.data.city.name);
    setData(response.data.list[0]); 
  };
 

  const date = data && data.dt_txt;
  const temprature = data && Math.floor(data.main.temp - 273.5) + `\xB0` + "C";
  const humidity = data && data.main.humidity;
  const pressure = data && data.main.pressure;
  const visibility = data && data.visibility / 1000;
  const wind = data && data.wind.speed;
  const description = data && data.weather[0].description;

  useEffect(()=>{
    cityChange === " " && setData(null)
  },[cityChange])

  return (
    
    <div className="text-center">
      <div className="card-layout ">
        <h1 className="weather-heading">Know Your Weather</h1>
        <div className=" d-flex input-field ">
          <label className="mt-1">
            Enter City{" "}
            <span>
              {" "}
              <i className="fa-solid fa-angle-right mx-1 arrow-icon"></i>
            </span>{" "}
          </label>
          <input
            type="search"
            className="w-25 input-btn"
            value={cityChange}
            onChange={(e) => handlecityChange(e)}
          />
          &nbsp;
          <button onClick={getweatherData} className="search-btn">
            search
          </button>
        </div>

      {data && <>
       <div className="date">{date}</div>

        <div className="row d-flex">
          <h4 className="city">
            {cityName}
            <div className="country mx-2">{country}</div>
            <div className="devider"></div>
            <i className="fa-solid fa-cloud-sun-rain mx-3 icon" id="icon"></i>
            <h3 className="">{temprature} </h3>
          </h4>
        </div>

        <div className="box-border d-flex">
          <div className="feels-like">
            Feels like {temprature}
            <br></br>
            {description}
          </div>
          <div className="list-content">
            <div>humidity : {humidity} %</div>
            <div>pressure : {pressure} hpa</div>
            <div> visibility: {visibility} Kms</div>
            <div> wind : {wind} m/s</div>
          </div>
        </div>
        </>}
      </div>
      <RefComp/>
    </div>
  );
}

export default App;
