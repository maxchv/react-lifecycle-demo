import React, {useState, useEffect} from 'react';
import './App.css';

function Weather(props) {
  const [region,
    setRegion] = useState('');
  const [temp,
    setTemp] = useState('');
  const [press,
    setPress] = useState('');
  const [humid,
    setHumid] = useState('');
  const [wind,
    setWind] = useState('');
  const [img,
    setImg] = useState('');
  
  // componentDidMount, componentDidUpdate
  // componentWillUnmount
  useEffect(() => {
    console.log("Effect");
    loadWeather();
    return function clear() {
      console.log('Clear some data');
    }
  }, []);

  const loadWeather = () => {
    navigator
      .geolocation
      .getCurrentPosition(position => {
        const url = `http://api.openweathermap.org/data/2.5/weather?APPID=7b5cbb6bb21d0fc862c3b47a3b967ddf&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
        fetch(url)
          .then(r => r.json())
          .then(json => {
            showWeather(json);
          });
      });
  }

  const showWeather = (json) => {
    console.dir(json);
    setRegion(json.name);
    setImg("http://openweathermap.org/img/wn/" + json.weather[0].icon + "@2x.png");
    setTemp(json.main.temp);
    setPress(json.main.pressure);
    setHumid(json.main.humidity);
    setWind(json.wind.speed);
  }

  return (
    <div className='App-header'>
      <h2>{region}</h2>
      <img src={img} alt='weather'/>
      <table>
        <thead>
          <tr>
            <th>Температура</th>
            <th>Давление</th>
            <th>Влажность</th>
            <th>Скорость ветра</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{temp}</td>
            <td>{press}</td>
            <td>{humid}</td>
            <td>{wind}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={loadWeather}>Load</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Weather/>
    </div>
  );
}

export default App;
