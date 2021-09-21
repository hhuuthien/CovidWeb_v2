<template>
  <div id="wchart-main">
    <div id="chart-title">Biểu đồ thống kê</div>
    <div id="chart-subtitle">
      Tính từ ngày 22/1/2020
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
    </div>
    <highcharts :options="chartOptions"></highcharts>
    <highcharts :options="chartOptions2"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";

export default {
  name: "WChart",
  props: ["mainData"],
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      chartData: null,
      toggle: 0,
      chartOptions: {
        chart: {
          type: "area",
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
            name: "Tổng số ca nhiễm",
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
            rotation: 90,
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
              return this.value / 1000000 + "M";
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
            name: "Tổng số ca tử vong",
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
            rotation: 90,
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
              return this.value / 1000000 + "M";
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
            color: "#1a1a1c",
            animation: {
              duration: 500,
            },
            fillColor: {
              linearGradient: [0, 0, 0, 300],
              stops: [
                [0, "rgba(80, 80, 87,0.5)"],
                [1, "rgba(255, 255, 255,0.5)"],
              ],
            },
          },
        },
      },
    };
  },
  watch: {
    mainData: function(mainData) {
      this.chartData = mainData;

      this.chartOptions.series[0].name = "Tổng số ca nhiễm";
      this.chartOptions.series[0].data = mainData.total_cases.data;
      this.chartOptions.xAxis.categories = mainData.total_cases.days;

      this.chartOptions2.series[0].name = "Tổng số ca tử vong";
      this.chartOptions2.series[0].data = mainData.total_deaths.data;
      this.chartOptions2.xAxis.categories = mainData.total_deaths.days;
    },
    toggle: function(val) {
      let one = this.chartData.total_cases;
      let two = this.chartData.total_deaths;
      let length = one.data.length;

      switch (val) {
        case 0:
          this.chartOptions.series[0].data = one.data;
          this.chartOptions.xAxis.categories = one.days;
          this.chartOptions2.series[0].data = two.data;
          this.chartOptions2.xAxis.categories = two.days;
          break;
        case 1:
          this.chartOptions.series[0].data = one.data.slice(length - 30);
          this.chartOptions.xAxis.categories = one.days.slice(length - 30);
          this.chartOptions2.series[0].data = two.data.slice(length - 30);
          this.chartOptions2.xAxis.categories = two.days.slice(length - 30);
          break;
        case 2:
          this.chartOptions.series[0].data = one.data.slice(length - 7);
          this.chartOptions.xAxis.categories = one.days.slice(length - 7);
          this.chartOptions2.series[0].data = two.data.slice(length - 7);
          this.chartOptions2.xAxis.categories = two.days.slice(length - 7);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
#wchart-main {
  width: 100%;
  font-family: "Nunito", sans-serif;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
