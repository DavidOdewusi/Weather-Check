"use strict";
//////////////////////////////////////////////////////////////
// Quote Slide//
//////////////////////////////////////////////////////////////
const quote1 = document.querySelector(".block-1");
const quote2 = document.querySelector(".block-2");
const quote3 = document.querySelector(".block-3");
const quote = document.querySelectorAll("blockquote");
console.log(quote);
//////////////////////////////////////////////////////////////
setInterval(() => {
  for (let i = 0; i < quote.length; i++) {
    let next = i + 1;
    if (quote[i].className.includes("visible")) {
      setTimeout(() => {
        quote[i].classList.remove("visible");
        quote[i].classList.add("hidden");
        quote[next].classList.add("visible");
        quote[next].classList.remove("hidden");
        console.log(i + " has a slider class and " + next + " is next");
      }, 3000);
    }
    if (i === quote.length - 1) {
      next = 0;
    }
  }
}, 9000);
//////////////////////////////////////////////////////////////

const greet = document.querySelector("h3");
const btn = document.querySelector(".search-btn");
const search = document.querySelector(".search-input");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const time = document.querySelector(".time");
const card = document.querySelectorAll(".card");
const currentState = document.querySelector(".current-state");
const state = document.querySelectorAll(".card p");
const stateTemp = document.querySelectorAll(".card .temp-small");
const body = document.querySelector("body");
const hamburger = document.querySelector(".hambuger");

function changeTheme(img, clr) {
  body.style.backgroundImage = `url(./img/${img}.jpg)`;
  body.style.color = `${clr}`;
  search.style.borderColor = `${clr}`;
  hamburger.style.backgroundColor = `${clr}`;
}

function greeting() {
  const dateStr = String(new Date());
  const date = new Date();
  const dateArr = dateStr.split(" ");
  const timeArr = dateArr[4].split(":");
  const timezone = dateArr[5].split("+");
  const currentTime = `${timeArr[0]}:${timeArr[1]}`;
  time.innerHTML = `${currentTime}<span>${timezone[0]}</span>`;

  if (date.getHours() < 12) {
    greet.innerHTML = `<ion-icon name="sunny" class="icon-greet"></ion-icon> Good Morning`;
  } else if (date.getHours() >= 12 && date.getHours() <= 17) {
    greet.innerHTML = `<ion-icon name="sunny" class="icon-greet"></ion-icon> Good Afternoon`;
  } else if (date.getHours() >= 18 && date.getHours() <= 20) {
    greet.innerHTML = `<ion-icon name="moon" class="icon-greet"></ion-icon> Good Evening`;
  } else if (date.getHours() >= 21 && date.getHours() <= 23) {
    greet.innerHTML = `<ion-icon name="moon" class="icon-greet"></ion-icon> Good Night`;
  }
}
setInterval(() => greeting(), 10000);

function fetchWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=da9780327e3b9e6ebcce68fe3679e6c5&units=metric`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(JSON.stringify(data));
      console.log(data);
      city.textContent = `In ${data.name}, ${data.sys.country}`;
      temp.innerHTML = `${Math.floor(
        data.main.temp
      )}        <sup><sup>o</sup>C</sup>`;

      // fetch(
      //   `https://api.xmltime.com/timeservice?placeid=${data.sys.id}&version=3&out=json&prettyprint=1&accesskey=8QTuc4iipk`
      // )
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((data) => {
      //     console.log(data);
      //   });

      if (data.weather[0].main === "Clouds") {
        changeTheme("cloud", "#000");
      } else if (
        data.weather[0].main === "Rain" ||
        data.weather[0].main === "Drizzle" ||
        data.weather[0].main === "Thunderstorm"
      ) {
        changeTheme("rainy", "#fff");
      } else if (data.weather[0].main === "Snow") {
        changeTheme("snow", "#000");
      } else {
        changeTheme("clear", "#000");
      }

      for (let i = 0; i < card.length; i++) {
        if (card[i].className.includes(data.weather[0].main)) {
          card[i].classList.add("current-state");
          stateTemp[i].innerHTML = `${Math.floor(data.main.temp)}<sup>o</sup>C`;
        } else {
          card[i].classList.remove("current-state");
          stateTemp[i].innerHTML = "-- --";
        }
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Wrong City name");
    });

  search.value = "";
}

btn.addEventListener("click", fetchWeather);
search.addEventListener("keydown", (e) => {
  console.log(`key ${e.key} was pressed`);
  if (e.key === "Enter") {
    fetchWeather();
  }
});
