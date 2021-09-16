<template>
  <div id="mainvn-main">
    <info-bar />
    <div id="mainvn-main-below">
      <province-bar
        @dataForMap="transferData"
        @dataForChart3="transferData2"
        @loading_status="loaded"
      />
      <div id="mainvn-sub">
        <chart-bar-2 :dataForMap="dataForMap" />
        <chart-bar />
        <chart-bar-3 :dataForChart3="dataForChart3" />
        <news />
        <contact />
      </div>
    </div>
    <footer-bar />

    <transition name="fade">
      <div id="loading-vn" v-show="show_loading">
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
import ChartBar from "./ChartBar.vue";
import ChartBar2 from "./ChartBar2.vue";
import ChartBar3 from "./ChartBar3.vue";
import InfoBar from "./InfoBar.vue";
import ProvinceBar from "./ProvinceBar.vue";
import News from "./News.vue";
import Contact from "./Contact.vue";
import FooterBar from "./FooterBar.vue";

export default {
  name: "MainVN",
  components: {
    InfoBar,
    ProvinceBar,
    ChartBar,
    ChartBar2,
    ChartBar3,
    News,
    Contact,
    FooterBar,
  },
  data() {
    return {
      dataForMap: null,
      dataForChart3: null,
      show_loading: true,
    };
  },
  methods: {
    transferData: function(data) {
      this.dataForMap = data;
    },
    transferData2: function(data) {
      this.dataForChart3 = data;
    },
    loaded: function(val) {
      if (val === "finished") {
        this.show_loading = false;
      }
    },
    topFunc: function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
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
  },
};
</script>

<style scoped>
#mainvn-main-below {
  width: 85%;
  margin: auto;
  margin-top: 75px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

#mainvn-sub {
  width: 58%;
  margin-bottom: 25px;
}

#loading-vn {
  position: fixed;
  top: 0;
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
</style>
