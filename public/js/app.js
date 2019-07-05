/*jshint esversion: 6 */

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
const location = search.value;
messageOne.textContent = "Laden...";
messageTwo.textContent = "";

fetch(`/weather?location=${location}`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      messageTwo.textContent = data.error;
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
      //console.log(data.forecast);
      
    }
    
  });
});
});