/*jshint esversion: 6 */

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
const location = search.value;
messageOne.textContent = "Loading...";
messageTwo.textContent = "";

fetch(`/weather?location=${location}`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      messageTwo.textContent = data.error;
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = `It is currently ${data.forecast.currentTemp} degrees with a daily high of ${data.forecast.dailyHigh} degrees and a low of ${data.forecast.dailyLow} degrees. There is a ${data.forecast.percipitation}% chance of rain. ${data.forecast.dataDaily}`;
    }
    
  });
});
});