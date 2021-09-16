<template>
  <div id="chart3-main">
    <div id="chart3-title">Biểu đồ theo tỉnh thành</div>
    <div id="chart3-subtitle">
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
      <v-select
        :items="provinces"
        v-model="defaultSelected"
        solo
        dense
      ></v-select>
    </div>
    <highcharts :options="chartOptions" v-show="showChart"></highcharts>
    <highcharts :options="chartOptions2" v-show="showChart"></highcharts>
    <div id="chart3-nodata" v-show="!showChart">
      Không có dữ liệu ca nhiễm Covid-19 ở địa phương này
    </div>
  </div>
</template>

<script>
import { getAllProvinces } from "../js/province";
import { Chart } from "highcharts-vue";
import csv2json from "csvjson-csv2json";
import { objectToArrayArray3 } from "../js/func";

export default {
  name: "ChartBar3",
  props: ["dataForChart3"],
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      showChart: true,
      provinces: getAllProvinces(),
      defaultSelected: "TP HCM",
      toggle: 0,
      json1: null,
      json2: null,
      one1: null,
      one2: null,
      two1: null,
      two2: null,
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
            color: "#ff2d2d",
            animation: {
              duration: 500,
            },
            fillColor: {
              linearGradient: [0, 0, 0, 300],
              stops: [
                [0, "rgba(255,174,174,0.5)"],
                [1, "rgba(255,255,255,0.5)"],
              ],
            },
          },
        },
      },
      chartOptions2: {
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
            color: "#ff2d2d",
            animation: {
              duration: 500,
            },
            fillColor: {
              linearGradient: [0, 0, 0, 300],
              stops: [
                [0, "rgba(255,174,174,0.5)"],
                [1, "rgba(255,255,255,0.5)"],
              ],
            },
          },
        },
      },
    };
  },
  watch: {
    dataForChart3: function(data) {
      const myjsonOne = csv2json(data.validOne, {
        parseNumbers: true,
        parseJSON: true,
        transpose: true,
      });
      const myjsonTwo = csv2json(data.validTwo, {
        parseNumbers: true,
        parseJSON: true,
        transpose: true,
      });

      this.json1 = myjsonOne;
      this.json2 = myjsonTwo;

      let obj1 = myjsonOne.filter(function(element) {
        return element["Ngày"] === "TP HCM";
      });
      let obj2 = myjsonTwo.filter(function(element) {
        return element["Ngày"] === "TP HCM";
      });

      let result1 = objectToArrayArray3(obj1[0]);
      let result2 = objectToArrayArray3(obj2[0]);

      let one1 = result1.arrayResultData;
      let one2 = result1.arrayResultCategory;
      let two1 = result2.arrayResultData;
      let two2 = result2.arrayResultCategory;
      this.one1 = one1;
      this.one2 = one2;
      this.two1 = two1;
      this.two2 = two2;

      this.chartOptions.series[0].name = "Tổng số ca nhiễm";
      this.chartOptions.series[0].data = one1;
      this.chartOptions.xAxis.categories = one2;
      this.chartOptions.xAxis.labels.step = 10;
      this.chartOptions2.series[0].name = "Số ca nhiễm mới";
      this.chartOptions2.series[0].data = two1;
      this.chartOptions2.xAxis.categories = two2;
      this.chartOptions2.xAxis.labels.step = 10;
    },
    defaultSelected: function(province) {
      let myjsonOne = this.json1;
      let myjsonTwo = this.json2;

      let obj1 = myjsonOne.filter(function(element) {
        return element["Ngày"] === province;
      });
      let obj2 = myjsonTwo.filter(function(element) {
        return element["Ngày"] === province;
      });

      if (obj1.length !== 0 && obj2.length !== 0) {
        this.showChart = true;
        let result1 = objectToArrayArray3(obj1[0]);
        let result2 = objectToArrayArray3(obj2[0]);

        let one1 = result1.arrayResultData;
        let one2 = result1.arrayResultCategory;
        let two1 = result2.arrayResultData;
        let two2 = result2.arrayResultCategory;
        this.one1 = one1;
        this.one2 = one2;
        this.two1 = two1;
        this.two2 = two2;

        switch (this.toggle) {
          case 0:
            this.chartOptions.series[0].name = "Tổng số ca nhiễm";
            this.chartOptions.series[0].data = one1;
            this.chartOptions.xAxis.categories = one2;
            this.chartOptions2.series[0].name = "Số ca nhiễm mới";
            this.chartOptions2.series[0].data = two1;
            this.chartOptions2.xAxis.categories = two2;
            //axis
            this.chartOptions.xAxis.labels.step = 10;
            this.chartOptions2.xAxis.labels.step = 10;
            break;
          case 1:
            this.chartOptions.series[0].name = "Tổng số ca nhiễm";
            this.chartOptions.series[0].data = one1.slice(one1.length - 30);
            this.chartOptions.xAxis.categories = one2.slice(one2.length - 30);
            this.chartOptions2.series[0].name = "Số ca nhiễm mới";
            this.chartOptions2.series[0].data = two1.slice(two1.length - 30);
            this.chartOptions2.xAxis.categories = two2.slice(two2.length - 30);
            //axis
            this.chartOptions.xAxis.labels.step = 5;
            this.chartOptions2.xAxis.labels.step = 5;
            break;
          case 2:
            this.chartOptions.series[0].name = "Tổng số ca nhiễm";
            this.chartOptions.series[0].data = one1.slice(one1.length - 7);
            this.chartOptions.xAxis.categories = one2.slice(one2.length - 7);
            this.chartOptions2.series[0].name = "Số ca nhiễm mới";
            this.chartOptions2.series[0].data = two1.slice(two1.length - 7);
            this.chartOptions2.xAxis.categories = two2.slice(two2.length - 7);
            //axis
            this.chartOptions.xAxis.labels.step = 1;
            this.chartOptions2.xAxis.labels.step = 1;
            break;
          default:
            break;
        }
      } else {
        this.chartOptions.series[0].name = "";
        this.chartOptions.series[0].data = [];
        this.chartOptions.xAxis.categories = [];
        this.chartOptions2.series[0].name = "";
        this.chartOptions2.series[0].data = [];
        this.chartOptions2.xAxis.categories = [];
        this.showChart = false;
      }
    },
    toggle: function(toggleVal) {
      if (this.showChart === true) {
        let one1 = this.one1;
        let one2 = this.one2;
        let two1 = this.two1;
        let two2 = this.two2;
        switch (toggleVal) {
          case 0:
            this.chartOptions.series[0].name = "Tổng số ca nhiễm";
            this.chartOptions.series[0].data = one1;
            this.chartOptions.xAxis.categories = one2;
            this.chartOptions2.series[0].name = "Số ca nhiễm mới";
            this.chartOptions2.series[0].data = two1;
            this.chartOptions2.xAxis.categories = two2;
            //axis
            this.chartOptions.xAxis.labels.step = 10;
            this.chartOptions2.xAxis.labels.step = 10;
            break;
          case 1:
            this.chartOptions.series[0].name = "Tổng số ca nhiễm";
            this.chartOptions.series[0].data = one1.slice(one1.length - 30);
            this.chartOptions.xAxis.categories = one2.slice(one2.length - 30);
            this.chartOptions2.series[0].name = "Số ca nhiễm mới";
            this.chartOptions2.series[0].data = two1.slice(two1.length - 30);
            this.chartOptions2.xAxis.categories = two2.slice(two2.length - 30);
            //axis
            this.chartOptions.xAxis.labels.step = 5;
            this.chartOptions2.xAxis.labels.step = 5;
            break;
          case 2:
            this.chartOptions.series[0].name = "Tổng số ca nhiễm";
            this.chartOptions.series[0].data = one1.slice(one1.length - 7);
            this.chartOptions.xAxis.categories = one2.slice(one2.length - 7);
            this.chartOptions2.series[0].name = "Số ca nhiễm mới";
            this.chartOptions2.series[0].data = two1.slice(two1.length - 7);
            this.chartOptions2.xAxis.categories = two2.slice(two2.length - 7);
            //axis
            this.chartOptions.xAxis.labels.step = 1;
            this.chartOptions2.xAxis.labels.step = 1;
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<style>
#chart3-main {
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 20px;
  font-family: "Nunito", sans-serif;
  padding: 15px;
}

#chart3-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

#chart3-subtitle {
  font-size: 0.7rem;
  margin-bottom: 15px;
}

#chart3-nodata {
  font-size: 0.9rem;
}

.v-select__selection {
  font-size: 0.9rem !important;
}
</style>
