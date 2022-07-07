import React, { useEffect, useState } from 'react'
import './App.css';
import LoadingIndicator from './LoadingIndicator';


const App = () => {

  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState('');
  const [number, setNumber] = useState(3);
  const [temp, setTemp] = useState('');
  const [wind, setWind] = useState('');
  const [preNumber, setPrenumber] = useState(0)
  const [preCat, setPreCat] = useState('');

  const handleNext = () => {
    if (number < 73) {
      setNumber(number + 1)
    } else {
      setNumber(number)
    }
  }

  const handleBack = () => {
    if (number > 0) {
      setNumber(number - 1)
    } else {
      setNumber(number)
    }
  }


  useEffect(() => {

    const fetchWeatherDetails = async () => {
      const response = await fetch(
        `http://localhost:9999/getWeather/`,
        {
          method: 'GET',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
          })
        }
      );


      const postData = await response.json();
      setDate(postData.timeSeries[number].validTime);
      setWeatherData(postData.timeSeries[number]);

      if (number < 6) {
        setTemp(postData.timeSeries[number].parameters[10]);
        setWind(postData.timeSeries[number].parameters[14]);
        setPrenumber(postData.timeSeries[number].parameters[1].values[0]);

      } else if (number === 6) {
        setTemp(postData.timeSeries[number].parameters[0]);
        setWind(postData.timeSeries[number].parameters[4]);
        setPrenumber(postData.timeSeries[number].parameters[15].values[0]);


      } else if (number > 6) {
        setTemp(postData.timeSeries[number].parameters[1]);
        setWind(postData.timeSeries[number].parameters[4]);
        setPrenumber(postData.timeSeries[number].parameters[15].values[0]);

      }

      
      setIsLoading(false);

      
      console.log(postData.timeSeries[number].parameters);
      console.log(number);

      const pCat = () => { 
        switch (preNumber) {
          case 0:
            setPreCat('No precipitation')
            break;
          case 1:
            setPreCat('Snow')
            break;
          case 2 :
            setPreCat('Snow and rain') 
            break;
          case 3 :
            setPreCat('Rain')
            break;
          case 4 :
            setPreCat('Drizzle')
            break;
          case 5 :
            setPreCat('Freezing rain')
            break;
          case 6 :
            setPreCat('Freezing drizzle')
            break;
        }
      }


      pCat();

    };

    fetchWeatherDetails();
  }, []);
  
  console.log(number);

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
            <p>Temperature: { temp.values[0] } { temp.unit }</p>
            <p>Wind: { wind.values[0] } {wind.unit}</p>
            <p>{ preCat }</p>
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