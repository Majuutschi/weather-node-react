import React, { useEffect, useState } from 'react'
import './App.css';
import LoadingIndicator from './LoadingIndicator';


const App = () => {

  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState('');
  const [number, setNumber] = useState(3);

  const handleNext = () => {
    setNumber(number + 1)
  }

  const handleBack = () => {
    setNumber(number - 1)
  }

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

      setWeatherData(postData.timeSeries[number]);
      setDate(postData.timeSeries[number].validTime)
      setIsLoading(false);
      
      console.log(postData)
      console.log(number)

    };

    fetchWeatherDetails()
  }, []);

  
  console.log(number)


  return (
    <div className="App">
      {
        isLoading &&
        <div>
          <LoadingIndicator />
          <p className='loading'>Getting your weather details!</p>
        </div>
        
      }
      {
        !isLoading &&
        <div>
          <div className='weather'>
            <h1>The weather forecast { date.slice(11, 16) } on { date.slice(8, 10) }/{ date.slice(5, 7) } at the Royal Palace in Stockholm</h1>
            <p>Temperature: { weatherData.parameters[10].values[0] } { weatherData.parameters[10].unit }</p>
            <p>Wind: { weatherData.parameters[14].values[0] } {weatherData.parameters[14].unit}</p>
          </div>
          <div className='buttons'>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
        
      }
    </div>
  );
}

export default App