<template>
  <div id="wmap-main">
    <highcharts
      :constructorType="'mapChart'"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
  </div>
</template>

<script>
import { getWCoreMap } from "../js/wCoreMap";

export default {
  name: "WMap",
  props: ["mainData"],
  data() {
    return {
      chartOptions: {
        chart: {
          map: null,
          height: 400,
        },
        title: {
          text: null,
        },
        mapNavigation: {
          enabled: true,
          enableDoubleClickZoomTo: true,
          buttonOptions: {
            verticalAlign: "top",
            align: "left",
            theme: {
              r: 5, //radius
              fill: "white",
            },
          },
          buttons: {
            zoomIn: {
              style: {
                fontFamily: "Nunito",
              },
            },
            zoomOut: {
              style: {
                fontFamily: "Nunito",
              },
            },
          },
        },
        colors: [
          "rgb(245, 245, 245)",
          "rgb(255, 232, 232)",
          "rgb(255, 207, 207)",
          "rgb(255, 150, 150)",
          "rgb(255, 92, 92)",
          "rgb(196, 0, 0)",
        ],
        legend: {
          title: {
            text: null,
          },
          align: "right",
          verticalAlign: "top",
          floating: true,
          layout: "vertical",
          valueDecimals: 0,
          symbolRadius: 5,
          symbolHeight: 14,
          rtl: true,
          itemStyle: {
            color: "black",
            fontWeight: "normal",
            fontFamily: "Nunito",
          },
        },
        colorAxis: {
          dataClassColor: "category",
          dataClasses: [
            { to: 1000 },
            {
              from: 1000,
              to: 10000,
            },
            {
              from: 10001,
              to: 100000,
            },
            {
              from: 100001,
              to: 1000000,
            },
            {
              from: 1000001,
              to: 10000000,
            },
            {
              from: 10000000,
            },
          ],
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "Covid-19",
            states: {
              hover: {
                color: "#262c7c",
              },
            },
            dataLabels: {
              enabled: false,
              format: "{point.name}",
            },
            data: [],
          },
        ],
        tooltip: {
          borderRadius: 10,
          useHTML: true,
          formatter: function() {
            return (
              '<span class="f1">' +
              this.point.name +
              '</span></br><div class="d-divider"></div><div class="d-flex"><div class="d1">Tổng nhiễm</div><div class="d2">' +
              this.point.value.toLocaleString() +
              "</div></div>"
            );
          },
        },
        lang: {
          zoomIn: "Phóng to",
          zoomOut: "Thu nhỏ",
        },
      },
    };
  },
  watch: {
    mainData: function(mainData) {
      this.chartOptions.series[0].data = mainData;
    },
  },
  mounted() {
    this.chartOptions.chart.map = getWCoreMap();
  },
};
</script>

<style>
#wmap-main {
  width: 100%;
  height: 400px;
  background-color: #262c7c;
  font-family: "Nunito", sans-serif;
}

.highcharts-tooltip .f1 {
  font-size: 0.9rem;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}

.highcharts-tooltip .d-divider {
  background-color: rgb(196, 196, 196);
  width: 230px;
  height: 1px;
  margin: 5px 0;
}

.highcharts-tooltip .d-flex {
  width: 230px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.highcharts-tooltip .d1 {
  font-size: 0.9rem;
  font-family: "Nunito", sans-serif;
}

.highcharts-tooltip .d2 {
  font-size: 0.9rem;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}
</style>
