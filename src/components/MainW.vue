<template>
  <div id="mainw-main">
    <w-map />
    <w-info :mainData="tableWorld" />
    <div id="mainw-below">
      <w-list :mainData="tableCountry" />
      <div id="mainw-below-sub">
        <w-chart :mainData="chartData" />
      </div>
    </div>
    <w-footer />

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
</style>
