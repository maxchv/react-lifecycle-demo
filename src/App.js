import React, {Component} from 'react';
import './App.css';

class Weather extends Component {

  constructor(props) {
    super(props);
    console.log('Constructor');
    this.loadWeather = this
      .loadWeather
      .bind(this);
    this.showWeather = this.showWeather.bind(this);
    this.state = {
      region: '',
      temp: '',
      press: '',
      humid: '',
      wind: '',
      img: ''
    }
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  // componentWillMount() {   console.log('Component Will Mount') }

  componentDidMount() {
    console.log("Component Did Mount");
    this.loadWeather();
  }

  // componentWillUpdate() {   console.log("Component will update"); }

  componentDidUpdate() {
    console.log("Component did update");
  }

  loadWeather() {
    navigator
      .geolocation
      .getCurrentPosition(position => {
        const url = `http://api.openweathermap.org/data/2.5/weather?APPID=7b5cbb6bb21d0fc862c3b47a3b967ddf&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
        fetch(url)
          .then(r => r.json())
          .then(json => {
            this.showWeather(json);
          });
      });
  }

  showWeather(json) {
    console.dir(json);
    this.setState({
      region: json.name,
      temp: json.main.temp,
      press: json.main.pressure,
      humid: json.main.humidity,
      wind: json.wind.speed,
      img: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png` 
    });
  }

  render() {
    console.log('Component render()')
    return (
      <div className='App-header'>
        <h2>{this.state.region}</h2>
        <img src={this.state.img} alt='weather'/>
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
              <td>{this.state.temp}</td>
              <td>{this.state.press}</td>
              <td>{this.state.humid}</td>
              <td>{this.state.wind}</td>
            </tr>
          </tbody>
        </table>
        {/* <button onClick={this.loadWeather}>Load</button> */}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Weather/>
    </div>
  );
}

export default App;
