<template>
  <div class="home">
    <!-- I hope you enjoy, please like and follow :) ! -->
    <div class="container" data-weather="sunny">
      <div class="weather-info" >
        <div data-weather-selected="sunny" class="weather-info__icon weather-info__icon--active">
          <i class="fas fa-2x fa-sun">1</i>
        </div>
        <div data-weather-selected="cloudy" class="weather-info__icon">
          <i class="fas fa-2x fa-cloud">2</i>
        </div>
        <div data-weather-selected="rainy" class="weather-info__icon">
          <i class="fas fa-2x fa-cloud-showers-heavy">3</i>
        </div>
        <div data-weather-selected="fog" class="weather-info__icon">
          <i class="fas fa-2x fa-smog">4</i>
        </div>
        <div data-weather-selected="snow" class="weather-info__icon">
          <i class="fas fa-2x fa-snowflake">5</i>
        </div>
      </div>
      <div class="visualisation-container">
        <div class="visualisation-container--sunny">
          <div class="sun">
            <div class="ray_box"></div>
          </div>
        </div>
        <div class="visualisation-container--rainy"></div>
        <div class="visualisation-container--cloudy"></div>
        <div class="visualisation-container--snow"></div>
        <div class="visualisation-container--fog">
          <div class="fog__img fog__img--first"></div>
          <div class="fog__img fog__img--second"></div>
          <div class="fog__img fog__img--third"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
// @ is an alias to /src

export default {
  data() {
  },
  mounted() {
    this.$nextTick(()=>{
      this.initHome();
    })
    setTimeout(()=>{
      clearInterval(window.timer)
        this.$router.openPage('/login')
    },3000)
  },
  methods: {
    initHome() {
      // I hope you enjoy, please like and follow
      let currentWeather = "sunny";
      const markovWeather = {
        sunny: {
          cloudy: 0.02,
          rainy: 0.004,
          fog: 0.001,
          snow: 0.00001
        },
        cloudy: {
          sunny: 0.002,
          rainy: 0.04,
          fog: 0.02,
          snow: 0.003
        },
        rainy: {
          sunny: 0.01,
          cloudy: 0.03,
          fog: 0.005,
          snow: 0.005
        },
        snow: {
          sunny: 0.0001,
          cloudy: 0.004,
          rainy: 0.009,
          fog: 0.006
        },
        fog: {
          sunny: 0.001,
          cloudy: 0.08,
          rainy: 0.02,
          snow: 0.004
        }
      };

      function updateIcons() {
        document.querySelectorAll(".weather-info__icon").forEach(element => {
          element.classList[
            element.attributes["data-weather-selected"].value == currentWeather
              ? "add"
              : "remove"
          ]("weather-info__icon--active");
        });
      }

      function updateUI() {
        updateIcons();
        document
          .querySelector(".container")
          .setAttribute("data-weather", currentWeather);
      }

      function handleTick() {
        let nextOptions = markovWeather[currentWeather];
        currentWeather =
          Object.keys(nextOptions).find(key => {
            return Math.random() < nextOptions[key];
          }) || currentWeather;
        updateUI();
      }

      window.timer = setInterval(handleTick, 500);

      function generateWeatherEffects(target, addClass, amount) {
        let rainContainer = document.querySelector(target);
        for (let i = 0; i < amount; i++) {
          let weatherObject = document.createElement("div");
          weatherObject.classList.add(addClass);
          rainContainer.appendChild(weatherObject);
        }
      }

      generateWeatherEffects(".ray_box", "ray", 20);
      generateWeatherEffects(".visualisation-container--cloudy", "cloud", 40);
      generateWeatherEffects(".visualisation-container--snow", "snow", 100);
      generateWeatherEffects(".visualisation-container--rainy", "rain", 50);

      document.querySelectorAll(".weather-info__icon").forEach(element => {
        console.log(element);
        element.onclick = () => {
          currentWeather = element.attributes["data-weather-selected"].value;
          updateUI();
        };
      });
    }
  }
};
</script>

<style lang="scss">
.home {
  background: #ff99cc;
  height: 100vh;
  img {
    width: 99px;
    height: 99px;
    padding-bottom: 24px;
    padding-top: 240px;
  }
}
// I hope you enjoy, please like and follow
html,
body,
.container {
  height: 100%;
  width: 100%;
  background-color: black;
}

.container {
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.weather-info {
  display: grid;
  position: relative;
  grid-template-columns: repeat(5, 1fr);
  background-color: #182652;
  height: 50px;

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    opacity: 0.2;
    transition: opacity 0.5s;
    cursor: pointer;
    &:hover {
      opacity: 0.4;
    }
    &--active {
      opacity: 1;
    }
  }
}

.visualisation-container {
  height: 100%;
  position: relative;

  > div {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 3s;
    position: absolute;
    overflow: hidden;
  }
}

[data-weather="sunny"] .visualisation-container--sunny {
  background: #2eb5e5;
  opacity: 1;
}

[data-weather="rainy"] .visualisation-container--rainy {
  background: #222222;
  opacity: 1;
}

[data-weather="cloudy"] .visualisation-container--cloudy {
  background: #2eb5e5;
  opacity: 1;
}
[data-weather="fog"] .visualisation-container--fog {
  background: #111;
  opacity: 1;
}

[data-weather="snow"] .visualisation-container--snow {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  opacity: 1;
}

//WEATHER EFFECTS

// rain adapted from : https://codepen.io/jerrylow/pen/KaPvNa
.rain {
  background: white;
  background: linear-gradient(
    to top,
    rgba(222, 205, 205, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  height: 50px;
  position: absolute;
  width: 1px;
}

@for $i from 1 through 50 {
  $top: (random(50) + 50) * 1%;
  $left: random(100) * 1%;
  $opacity: (random(30) + 30) * 0.01;
  $delay: random(20) - 1s;

  .rain:nth-of-type(#{$i}) {
    animation-name: rain-#{$i};
    animation-delay: $delay;
    animation-duration: random(6) + 4s;
    animation-iteration-count: infinite;
    left: $left;
    opacity: $opacity;
    top: -$top;
  }

  @keyframes rain-#{$i} {
    0% {
      left: $left;
      opacity: $opacity;
      top: -$top;
    }
    100% {
      opacity: 0;
      top: $top + 40%;
    }
  }
}

//sun adapted from https://codepen.io/Hackroro/pen/ByrKLZ
.sun {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: white;
  opacity: 0.9;
  box-shadow: 0px 0px 40px 15px white;
}

.ray_box {
  position: absolute;
  margin: auto;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 70px;
  animation: ray_anim 60s linear infinite;
}
.ray {
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  margin-left: 10px;
  border-radius: 80% 80% 0 0;
  position: absolute;
  opacity: 0.1;
  left: 34%;
  transform-origin: left;
}

@for $i from 1 through 20 {
  $rotation: (360deg/10) * $i;
  $width: (random(70) + 80px);
  $height: (random(50) + 5px);
  .ray:nth-of-type(#{$i}) {
    width: $width;
    height: $height;
    top: calc(50% - #{$height/2});
    transform: rotate($rotation);
  }
}

@-webkit-keyframes ray_anim {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

//clouds adapted from: https://codepen.io/Mark_Bowley/pen/xEbuI
.cloud {
  background: #fff;
  background: linear-gradient(to top, #fff 5%, #f1f1f1 100%);
  border-radius: 100px;
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);

  height: 120px;
  position: absolute;
  width: 350px;
}
.cloud:after,
.cloud:before {
  background: #fff;
  content: "";
  position: absolute;
  z-index: -1;
}

.cloud:after {
  border-radius: 100px;
  height: 100px;
  left: 50px;
  top: -50px;
  width: 100px;
}

.cloud:before {
  border-radius: 200px;
  width: 180px;
  height: 180px;
  right: 50px;
  top: -90px;
}

@for $i from 1 through 40 {
  $time: (random(40) + 5s);
  $scale: ((random(100) + 10)/300);
  $top: (-10 + random(100) * 1%);
  .cloud:nth-of-type(#{$i}) {
    animation: animateCloud $time linear infinite;
    transform: scale($scale);
    top: $top;
  }
}

@keyframes animateCloud {
  0% {
    margin-left: -100%;
  }
  100% {
    margin-left: 100%;
  }
}
//fog adapted from https://codepen.io/Ravyre/details/gXawyY
.fog__img {
  position: absolute;

  height: 100vh;
  width: 300vw;
  background-size: contain;
  background-position: center;
  &--first {
    background: url("https://res.cloudinary.com/dkr52htco/image/upload/v1536173269/fog-1.png")
      repeat-x;

    animation: fog-two 210s linear infinite;
  }

  &--second {
    background: url("https://res.cloudinary.com/dkr52htco/image/upload/v1536173269/fog-2.png")
      repeat-x;
    animation: fog-one 120s linear infinite;
    opacity: 0.65;
  }

  &--third {
    background: url("https://res.cloudinary.com/dkr52htco/image/upload/v1536173269/fog-2.png")
      repeat-x;
    animation: fog-three 270s linear infinite;
  }
}

@keyframes fog-one {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-200vw, 0, 0);
  }
}
@keyframes fog-two {
  0% {
    transform: translate3d(-200vw, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fog-three {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-200vw, 0, 0);
  }
}

// snow taken from https://codepen.io/kyaw-wonna/pen/KKwymVp
@function random_range($min, $max) {
  $rand: random();
  $random_range: $min + floor($rand * (($max - $min) + 1));
  @return $random_range;
}

.snow {
  $total: 100;
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;

  @for $i from 1 through $total {
    $random-x: random(1000000) * 0.0001vw;
    $random-offset: random_range(-100000, 100000) * 0.00005vw;
    $random-x-end: $random-x + $random-offset;
    $random-x-end-yoyo: $random-x + ($random-offset / 2);
    $random-yoyo-time: random_range(30000, 80000) / 100000;
    $random-yoyo-y: $random-yoyo-time * 100vh;
    $random-scale: random(10000) * 0.0002;
    $fall-duration: random_range(5, 20) * 1s;
    $fall-delay: random(30) * -1s;

    &:nth-child(#{$i}) {
      opacity: random(10000) * 0.0001;
      transform: translate($random-x, -10px) scale($random-scale);
      animation: fall-#{$i} $fall-duration $fall-delay linear infinite;
    }

    @keyframes fall-#{$i} {
      #{percentage($random-yoyo-time)} {
        transform: translate($random-x-end, $random-yoyo-y) scale($random-scale);
      }

      to {
        transform: translate($random-x-end-yoyo, 100vh) scale($random-scale);
      }
    }
  }
}
</style>
