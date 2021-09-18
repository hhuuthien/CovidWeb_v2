<template>
  <div id="mainw-main">
    <w-map v-show="!show_loading" />
    <w-info :mainData="tableWorld" v-show="!show_loading" />
    <div id="mainw-below" v-show="!show_loading">
      <w-list :mainData="tableCountry" />
      <div id="mainw-below-sub">
        <w-chart :mainData="chartData" />
      </div>
    </div>
    <w-footer v-show="!show_loading" />

    <transition name="fade">
      <div id="loading-w" v-show="show_loading">
        <div class="sk-folding-cube">
          <div class="sk-cube1 sk-cube"></div>
          <div class="sk-cube2 sk-cube"></div>
          <div class="sk-cube4 sk-cube"></div>
          <div class="sk-cube3 sk-cube"></div>
        </div>
        <p id="loading-title">Đang tải dữ liệu</p>
      </div>
    </transition>

    <v-icon id="scrollToTop" @click="topFunc">mdi-arrow-up-circle</v-icon>
  </div>
</template>

<script>
import WChart from "./WChart.vue";
import WInfo from "./WInfo.vue";
import WList from "./WList.vue";
import WMap from "./WMap.vue";
import WFooter from "./WFooter.vue";

import firebase from "firebase/app";
import "firebase/database";
import { getConfig } from "../js/func";

export default {
  name: "MainW",
  components: { WMap, WList, WInfo, WChart, WFooter },
  data() {
    return {
      chartData: null,
      tableCountry: null,
      tableWorld: null,
      show_loading: true,
    };
  },
  mounted() {
    let scrollToTop = document.getElementById("scrollToTop");

    window.onscroll = function() {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
      ) {
        scrollToTop.style.visibility = "visible";
      } else {
        scrollToTop.style.visibility = "hidden";
      }
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(getConfig());
    } else {
      firebase.app();
    }

    firebase
      .database()
      .ref()
      .child("api/worldSummary")
      .get()
      .then((snapshot) => {
        this.chartData = snapshot.val().data[0].chart;
        this.tableCountry = snapshot.val().data[0].table_country;
        this.tableWorld = snapshot.val().data[0].table_world;

        this.show_loading = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    topFunc: function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style scoped>
#mainw-below {
  width: 85%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 125px;
  margin-bottom: 25px;
}

#mainw-below-sub {
  width: 30%;
}

#scrollToTop {
  visibility: hidden;
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 99;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  color: #262c7c;
  cursor: pointer;
  height: 34px;
  vertical-align: unset !important;
}

#scrollToTop:hover {
  background-color: whitesmoke;
  border-radius: 50px;
  color: #3e1969;
}

#loading-w {
  position: fixed;
  top: 70px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#loading-title {
  color: #333;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: "Nunito", sans-serif;
  margin-top: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sk-folding-cube {
  margin: 20px auto;
  width: 40px;
  height: 40px;
  position: relative;
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}
.sk-folding-cube .sk-cube:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
  animation: sk-foldCubeAngle 2.4s infinite linear both;
  -webkit-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}
.sk-folding-cube .sk-cube2 {
  -webkit-transform: scale(1.1) rotateZ(90deg);
  transform: scale(1.1) rotateZ(90deg);
}
.sk-folding-cube .sk-cube3 {
  -webkit-transform: scale(1.1) rotateZ(180deg);
  transform: scale(1.1) rotateZ(180deg);
}
.sk-folding-cube .sk-cube4 {
  -webkit-transform: scale(1.1) rotateZ(270deg);
  transform: scale(1.1) rotateZ(270deg);
}
.sk-folding-cube .sk-cube2:before {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-folding-cube .sk-cube3:before {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.sk-folding-cube .sk-cube4:before {
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
@-webkit-keyframes sk-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

@keyframes sk-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
