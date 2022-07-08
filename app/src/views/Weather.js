import React, { useEffect, useState } from 'react';
import { WiCloud, WiCloudy, WiDayCloudy, WiDayCloudyHigh, WiDaySunny, WiDaySunnyOvercast, WiFog, WiHail, WiRain, WiRainWind, WiShowers, WiSleet, WiSnow, WiSnowWind, WiSprinkle, WiThunderstorm } from 'weather-icons-react';
import LoadingIndicator from '../LoadingIndicator';

const Weather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState('');
  const [number, setNumber] = useState(3);
  const [temp, setTemp] = useState('');
  const [wind, setWind] = useState('');
  const [preNumber, setPreNumber] = useState(0);
  const [preCat, setPreCat] = useState('');
  const [iconNumber, setIconNumber] = useState(0);
  const [icon, setIcon] = useState('');
  

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
      setIconNumber(postData.timeSeries[number].parameters[18].values[0]);

      if (number < 6) {
        setTemp(postData.timeSeries[number].parameters[10]);
        setWind(postData.timeSeries[number].parameters[14]);
        setPreNumber(postData.timeSeries[number].parameters[1].values[0]);

      } else if (number === 6) {
        setTemp(postData.timeSeries[number].parameters[0]);
        setWind(postData.timeSeries[number].parameters[4]);
        setPreNumber(postData.timeSeries[number].parameters[15].values[0]);

      } else if (number > 6) {
        setTemp(postData.timeSeries[number].parameters[1]);
        setWind(postData.timeSeries[number].parameters[4]);
        setPreNumber(postData.timeSeries[number].parameters[15].values[0]);

      }

      setIsLoading(false);

      console.log(postData.timeSeries[number].parameters);
      console.log(iconNumber);

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
          default:
            break;
        }
      }

      const weatherIcon = () => { 
        switch (iconNumber) {
          case 1:
            setIcon(<WiDaySunny size={80} />)
            break;
          case 2 :
            setIcon(<WiDaySunnyOvercast size={80} />) 
            break;
          case 3 :
            setIcon(<WiDayCloudy size={80} />)
            break;
          case 4 :
            setIcon(<WiDayCloudyHigh size={80} />)
            break;
          case 5 :
            setIcon(<WiCloudy size={80} />)
            break;
          case 6 :
            setIcon(<WiCloud size={80} />)
            break;
          case 7 :
            setIcon(<WiFog size={80} />)
            break;
          case 8 :
            setIcon(<WiSprinkle size={80} />)
            break;
          case 9 :
            setIcon(<WiRain size={80} />)
            break;
          case 10 :
            setIcon(<WiHail size={80} />)
            break;
          case 11 :
            setIcon(<WiThunderstorm size={80} />)
            break;
          case 12 :
            setIcon(<WiSleet size={80} />)
            break;
          case 13 :
            setIcon(<WiShowers size={80} />)
            break;
          case 14 :
            setIcon(<WiRainWind size={80} />)
            break;
          case 15 :
            setIcon(<WiSnow size={80} />)
            break;
          case 16 :
            setIcon(<WiSnow size={80} />)
            break;
          case 17 :
            setIcon(<WiSnowWind size={80} />)
            break;
          case 18 :
            setIcon(<WiSprinkle size={80} />)
            break;
          case 19 :
            setIcon(<WiRain size={80} />)
            break;
          case 20 :
            setIcon(<WiHail size={80} />)
            break;
          case 21 :
            setIcon(<WiThunderstorm size={80} />)
            break;
          case 22 :
            setIcon(<WiSleet size={80} />)
            break;
          case 23 :
            setIcon(<WiShowers size={80} />)
            break;
          case 24 :
            setIcon(<WiRainWind size={80} />)
            break;
          case 25 :
            setIcon(<WiSnow size={80} />)
            break;
          case 26 :
            setIcon(<WiSnow size={80} />)
            break;
          case 27 :
            setIcon(<WiSnowWind size={80} />)
            break;
          default:
            break;
        }
      }

      weatherIcon();
      pCat();
      
    };

    fetchWeatherDetails();
  }, [number, iconNumber]);
  

  return (
    <div className='weather-view'>
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
            <p>{ icon } </p>
            <p>Temperature: { temp.values[0] } { temp.unit }</p>
            <p>Wind: { wind.values[0] } {wind.unit}</p>
            <p>{ preCat }</p>
          </div>
          <div>
            <div className='buttons'>
              <button onClick={handleBack}>Back</button>
              <button onClick={handleNext}>Next</button>
            </div>
            <div className='favorite-button'>
              <button><i className='fa-solid fa-star'></i> Make favorite</button>
            </div>
          </div>
          
        </div>
        
      }
    </div>
  );
}

export default Weather