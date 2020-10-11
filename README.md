# Жизненный цикл компонента. Хук useEffect

```JavaScript
navigator.geolocation.getCurrentPosition(position => {
        const url = `http://api.openweathermap.org/data/2.5/weather?APPID=7b5cbb6bb21d0fc862c3b47a3b967ddf&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
        fetch(url)
        .then(r => r.json())
        .then(json => {
            showWeather(json);
        });
});

function showWeather(w) {
    const h2 = document.createElement("h2");
    h2.innerHTML = w.name;
    const img = document.createElement("img");
    img.src = "http://openweathermap.org/img/wn/" + w.weather[0].icon + "@2x.png";
    $("div").append(h2,img);  
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    console.log();
    td1.innerHTML = w.main.temp;
    const td2 = document.createElement("td");
    td2.innerHTML = w.main.pressure;
    const td3 = document.createElement("td");
    td3.innerHTML = w.main.humidity;
    const td4 = document.createElement("td");
    td4.innerHTML = w.wind.speed;
    tr.append(td1, td2, td3, td4);
    $("tbody").append(tr);
}
```

```javascript
function Weather() {
  const [name,
    setName] = useState('');
  const [img,
    setImg] = useState('img');
  const [temp,
    setTemp] = useState('');
  const [press,
    setPress] = useState('');
  const [humid,
    setHumid] = useState('');
  const [wind,
    setWind] = useState('');

  useEffect(() => {
    navigator
      .geolocation
      .getCurrentPosition(position => {
        const url = `http://api.openweathermap.org/data/2.5/weather?APPID=7b5cbb6bb21d0fc862c3b47a3b967ddf&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
        fetch(url)
          .then(r => r.json())
          .then(json => {
            setImg("http://openweathermap.org/img/wn/" + json.weather[0].icon + "@2x.png");
            setName(json.name);
            setTemp(json.main.temp);
            setPress(json.main.pressure);
            setHumid(json.main.humidity);
            setWind(json.wind.speed);
          });
      });
  });

  return (
    <div className='App-header'>
      <h2>{name}</h2>
      <img src={img} alt='weather'/>
      <table>
        <tr>
          <th>Температура</th>
          <th>Давление</th>
          <th>Влажность</th>
          <th>Скорость ветра</th>
        </tr>
        <tr>
          <td>{temp}</td>
          <td>{press}</td>
          <td>{humid}</td>
          <td>{wind}</td>
        </tr>
      </table>
    </div>
  );
}
```