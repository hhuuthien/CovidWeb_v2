<template>
  <div id="mainvac-main">
    <vac-info-bar :mainData="todayVaccineData" />
    <div id="mainvac-below">
      <div id="mainvac-below1">
        <vac-chart-1 :mainData="vaccineData" />
        <vac-chart-2 :mainData="vaccineData" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { getAppDate, getConfig } from "../js/func.js";

import VacInfoBar from "./VacInfoBar.vue";
import VacChart1 from "./VacChart1.vue";
import VacChart2 from "./VacChart2.vue";

export default {
  name: "MainVac",
  components: { VacInfoBar, VacChart1, VacChart2 },
  data() {
    return {
      vaccineData: null,
      todayVaccineData: null,
    };
  },
  mounted() {
    if (!firebase.apps.length) {
      firebase.initializeApp(getConfig());
    } else {
      firebase.app();
    }

    firebase
      .database()
      .ref()
      .child("apiVaccine/vaccineSummary")
      .get()
      .then((snapshot) => {
        let data = snapshot.val();

        this.todayVaccineData = data.filter(function(e) {
          return e.day === getAppDate(2, 2, "/");
        })[0];

        this.vaccineData = data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
#mainvac-below {
  width: 85%;
  margin: auto;
  margin-top: 75px;
}

#mainvac-below1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
</style>
