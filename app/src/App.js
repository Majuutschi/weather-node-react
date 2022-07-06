import React, { useEffect, useState } from 'react'
import './App.css';


const App = () => {

  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState([]);
  const [wind, setWind] = useState([]);


  useEffect(() => {

    const fetchWeatherDetails = async () => {
      const response = await fetch(
        `http://localhost:9999/getWeatherInfo/all`,
        {
          method: 'GET',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
          })
        }
      );

      const postData = await response.json();
      setWeatherData(postData.timeSeries[1]);
      setIsLoading(false);
      setTemp(postData.timeSeries[1].parameters[10].values[0]);
      setWind(postData.timeSeries[1].parameters[14].values[0]);
      console.log(postData.timeSeries[1].validTime)
    };

    fetchWeatherDetails()
  }, []);


  return (
    <div className="App">
      {
        isLoading &&
        <p>Getting your weather details!</p>
      }
      {
        !isLoading &&
        <div>
          <h4>The weather forecast for today at the Royal Palace in Stockholm</h4>
          <p>Temperature: {temp} {weatherData.parameters[10].unit}</p>
          <p>Wind: {wind} {weatherData.parameters[14].unit}</p>
        </div>
        
      }
    </div>
  );
}

export default App