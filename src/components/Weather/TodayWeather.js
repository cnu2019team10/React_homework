import React from 'react';
import Icon from './Icon';

const API_WEATHER = 'http://api.openweathermap.org/data/2.5/weather?APPID=75536a824749c77d655cf1aaa9807a6e&q='; // 현재 날씨를 받아오는 url 주소를 바꿔줍니다

  class TodayWeather extends React.Component {
  state = {
    weather: null
  };

  async componentDidMount() {
     const { cityId } = this.props.match.params;
    //const cityId = 'Daejeon';
    const api = `${API_WEATHER}${cityId}`; //해당 부분도 '/'를 제거 합니다

    const weather = await fetch(api)
      .then(res => res.json())
      .then(data => data);

    this.setState({
      weather
    });
  }

  render() {
    const { cityId } = this.props.match.params;

    const { weather } = this.state;
    if (!weather) {
      return <div>Loading...</div>;
    }

    const celsius = (weather.main.temp - 273.15).toFixed(2); // kelvin to celsius
   // const wind_speed = (weather.wind.speed);
    const weatherMain = weather.weather[0].main;
    const iconId = weather.weather[0].id;

    return (
      <div className="weather-today">
        <h2 className="weather-city">{cityId}</h2>

        <div className="weather-today-meta">
          <h3 className="weather-main">{weatherMain}</h3>
          <div className="weather-temp">{celsius}°</div>
        </div>
        <div className="weather-image">
          <Icon iconId={iconId} />
        </div>
      </div>
    );
  }
}

export default TodayWeather;
