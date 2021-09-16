<template>
  <div id="chart-main">
    <div id="chart-title">Biểu đồ cả nước</div>
    <div id="chart-subtitle">
      Tính từ đợt bùng phát dịch lần thứ 4 ngày 27/4/2021
    </div>
    <div id="chart-option">
      <v-btn-toggle v-model="toggle" mandatory>
        <v-btn x-small id="btn-toggle">
          Tất cả
        </v-btn>
        <v-btn x-small id="btn-toggle">
          Tháng qua
        </v-btn>
        <v-btn x-small id="btn-toggle">
          Tuần qua
        </v-btn>
      </v-btn-toggle>
      <v-select :items="items" v-model="defaultSelected" solo dense></v-select>
    </div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { getConfig, objectToArrayArray2 } from "../js/func";
import csv2json from "csvjson-csv2json";
import { Chart } from "highcharts-vue";

export default {
  name: "ChartBar",
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      defaultSelected: "Số ca nhiễm mới",
      items: ["Số ca nhiễm mới", "Số ca khỏi mới", "Số ca tử vong mới"],
      rawData: null,
      chartData: null,
      toggle: 0,
      chartOptions: {
        chart: {
          type: "area",
          zoomType: "xy",
          height: 300,
          style: {
            fontFamily: "Nunito",
          },
        },
        title: {
          text: null,
        },
        series: [
          {
            data: [],
            name: "",
            animation: {
              duration: 500,
            },
          },
        ],
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: [],
          crosshair: {
            width: 1,
            color: "#cfcfcf",
          },
          labels: {
            step: null,
          },
        },
        yAxis: {
          title: {
            text: null,
          },
          labels: {
            align: "right",
            x: -5,
            y: 5,
            format: "{value:.,0f}",
          },
          showFirstLabel: false,
          crosshair: {
            width: 1,
            color: "#cfcfcf",
          },
        },
        plotOptions: {
          series: {
            color: "#262c7c",
            animation: {
              duration: 500,
            },
            fillColor: {
              linearGradient: [0, 0, 0, 300],
              stops: [
                [0, "rgba(82, 87, 255,0.5)"],
                [1, "rgba(255, 255, 255,0.5)"],
              ],
            },
          },
        },
      },
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
      .child("api/vietnamChart")
      .get()
      .then((snapshot) => {
        let data = snapshot.val();

        const myjson = csv2json(data, {
          parseNumbers: true,
          parseJSON: true,
          transpose: true,
        });
        this.rawData = myjson;

        let newCaseObj = myjson.filter(function(e) {
          return e["NGÀY"] === "new_cases";
        });

        let arrayResult = objectToArrayArray2(newCaseObj[0]);
        this.chartData = arrayResult;
        this.chartOptions.series[0].data = arrayResult.arrayResultData;
        this.chartOptions.series[0].name = "Số ca nhiễm mới";
        this.chartOptions.xAxis.categories = arrayResult.arrayResultCategory;
        this.chartOptions.xAxis.labels.step = 10;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  watch: {
    toggle: function(toggleVal) {
      let one = this.chartData.arrayResultData;
      let two = this.chartData.arrayResultCategory;
      switch (toggleVal) {
        case 0:
          this.chartOptions.series[0].data = one;
          this.chartOptions.xAxis.categories = two;
          this.chartOptions.xAxis.labels.step = 10;
          break;
        case 1:
          this.chartOptions.series[0].data = one.slice(one.length - 30);
          this.chartOptions.xAxis.categories = two.slice(two.length - 30);
          this.chartOptions.xAxis.labels.step = 5;
          break;
        case 2:
          this.chartOptions.series[0].data = one.slice(one.length - 7);
          this.chartOptions.xAxis.categories = two.slice(two.length - 7);
          this.chartOptions.xAxis.labels.step = 1;
          break;
        default:
          break;
      }
    },
    defaultSelected: function(val) {
      let myjson = this.rawData;
      let obj;
      switch (val) {
        case "Số ca nhiễm mới":
          obj = myjson.filter(function(e) {
            return e["NGÀY"] === "new_cases";
          });
          break;
        case "Số ca khỏi mới":
          obj = myjson.filter(function(e) {
            return e["NGÀY"] === "new_recovered";
          });
          break;
        case "Số ca tử vong mới":
          obj = myjson.filter(function(e) {
            return e["NGÀY"] === "new_deaths";
          });
          break;
      }
      let arrayResult = objectToArrayArray2(obj[0]);
      this.chartData = arrayResult;
      this.chartOptions.series[0].name = val;

      let one = arrayResult.arrayResultData;
      let two = arrayResult.arrayResultCategory;
      switch (this.toggle) {
        case 0:
          this.chartOptions.series[0].data = one;
          this.chartOptions.xAxis.categories = two;
          this.chartOptions.xAxis.labels.step = 10;
          break;
        case 1:
          this.chartOptions.series[0].data = one.slice(one.length - 30);
          this.chartOptions.xAxis.categories = two.slice(two.length - 30);
          this.chartOptions.xAxis.labels.step = 5;
          break;
        case 2:
          this.chartOptions.series[0].data = one.slice(one.length - 7);
          this.chartOptions.xAxis.categories = two.slice(two.length - 7);
          this.chartOptions.xAxis.labels.step = 1;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
#chart-main {
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 20px;
  font-family: "Nunito", sans-serif;
  padding: 15px;
}

.v-btn {
  letter-spacing: normal !important;
}

.v-item--active {
  background-color: #262c7c !important;
  color: white !important;
}

#chart-option {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

#chart-option .v-input {
  max-width: 40% !important;
}

#chart-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

#chart-subtitle {
  font-size: 0.7rem;
  margin-bottom: 15px;
}
</style>
