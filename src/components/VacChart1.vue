<template>
  <div data-app id="vac-chart1-main">
    <div id="chart-title">Số người đã tiêm vaccine theo ngày</div>
    <div id="chart-subtitle">Tính từ ngày 7/3/2021</div>
    <div id="chart-option">
      <v-btn-toggle v-model="toggle" mandatory>
        <v-btn x-small id="btn-toggle">
          Tất cả
        </v-btn>
        <v-btn x-small id="btn-toggle">
          Tháng qua
        </v-btn>
      </v-btn-toggle>
      <v-select :items="items" v-model="selected" solo dense></v-select>
    </div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import { getAppDate } from "../js/func";

export default {
  name: "VacChart1",
  props: ["mainData"],
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      arrayData1: null,
      arrayData2: null,
      arrayCategory: null,
      toggle: 0,
      items: ["Chưa đủ liều", "Đủ liều"],
      selected: "Chưa đủ liều",
      chartOptions: {
        chart: {
          type: "column",
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
            formatter: function() {
              if (this.value < 1000000) return this.value / 1000 + "K";
              else return this.value / 1000000 + "M";
            },
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
          },
        },
      },
    };
  },
  watch: {
    mainData: function(mainData) {
      let arrayData1 = [];
      let arrayData2 = [];
      let arrayCategory = [];

      let today = getAppDate(2, 2, "/");

      mainData.some((element) => {
        if (element.people_t1_day < 0) {
          arrayData1.push(0);
        } else {
          arrayData1.push(element.people_t1_day);
        }
        if (element.people_t2_day < 0) {
          arrayData2.push(0);
        } else {
          arrayData2.push(element.people_t2_day);
        }
        arrayCategory.push(element.day);

        if (element.day === today) {
          return true;
        }
      });

      this.arrayData1 = arrayData1;
      this.arrayData2 = arrayData2;
      this.arrayCategory = arrayCategory;

      this.chartOptions.series[0].data = arrayData1;
      this.chartOptions.series[0].name =
        "Số người đã tiêm vaccine theo ngày (chưa đủ liều)";
      this.chartOptions.xAxis.categories = arrayCategory;
      this.chartOptions.xAxis.labels.step = 15;
    },
    selected: function(val) {
      switch (val) {
        case "Chưa đủ liều":
          this.chartOptions.series[0].name =
            "Số người đã tiêm vaccine theo ngày (chưa đủ liều)";

          if (this.toggle === 0) {
            this.chartOptions.series[0].data = this.arrayData1;
            this.chartOptions.xAxis.categories = this.arrayCategory;
            this.chartOptions.xAxis.labels.step = 15;
          } else if (this.toggle === 1) {
            this.chartOptions.series[0].data = this.arrayData1.slice(
              this.arrayData1.length - 30
            );
            this.chartOptions.xAxis.categories = this.arrayCategory.slice(
              this.arrayData1.length - 30
            );
            this.chartOptions.xAxis.labels.step = 4;
          }
          break;

        case "Đủ liều":
          this.chartOptions.series[0].name =
            "Số người đã tiêm vaccine theo ngày (đủ liều)";
          if (this.toggle === 0) {
            this.chartOptions.series[0].data = this.arrayData2;
            this.chartOptions.xAxis.categories = this.arrayCategory;
            this.chartOptions.xAxis.labels.step = 15;
          } else if (this.toggle === 1) {
            this.chartOptions.series[0].data = this.arrayData2.slice(
              this.arrayData2.length - 30
            );
            this.chartOptions.xAxis.categories = this.arrayCategory.slice(
              this.arrayData2.length - 30
            );
            this.chartOptions.xAxis.labels.step = 4;
          }
          break;

        default:
          break;
      }
    },
    toggle: function(val) {
      switch (val) {
        case 0:
          this.chartOptions.xAxis.categories = this.arrayCategory;
          this.chartOptions.xAxis.labels.step = 15;

          if (this.selected === "Chưa đủ liều") {
            this.chartOptions.series[0].data = this.arrayData1;
            this.chartOptions.series[0].name =
              "Số người đã tiêm vaccine theo ngày (chưa đủ liều)";
          } else if (this.selected === "Đủ liều") {
            this.chartOptions.series[0].data = this.arrayData2;
            this.chartOptions.series[0].name =
              "Số người đã tiêm vaccine theo ngày (đủ liều)";
          }
          break;

        case 1:
          this.chartOptions.xAxis.categories = this.arrayCategory.slice(
            this.arrayCategory.length - 30
          );
          this.chartOptions.xAxis.labels.step = 4;

          if (this.selected === "Chưa đủ liều") {
            this.chartOptions.series[0].data = this.arrayData1.slice(
              this.arrayData1.length - 30
            );
            this.chartOptions.series[0].name =
              "Số người đã tiêm vaccine theo ngày (chưa đủ liều)";
          } else if (this.selected === "Đủ liều") {
            this.chartOptions.series[0].data = this.arrayData2.slice(
              this.arrayData2.length - 30
            );
            this.chartOptions.series[0].name =
              "Số người đã tiêm vaccine theo ngày (đủ liều)";
          }
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
#vac-chart1-main {
  width: 49%;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Nunito", sans-serif;
  padding: 15px;
}
</style>
