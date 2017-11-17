function getWeatherData(query: string) {
  const url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${query})")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

  return fetch(url)
    .then(response => response.json())
    .then(response => response.query.results.channel)
    .catch(error => console.error(error));
}

export default {
  getWeatherData
};
