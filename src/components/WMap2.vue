<template>
  <div id="wmap2-main">
    <div id="wmap2-title">Châu lục</div>
    <highcharts
      :constructorType="'mapChart'"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
  </div>
</template>

<script>
import { getWCoreMap2 } from "../js/wCoreMap2";

export default {
  name: "WMap2",
  props: ["mainData"],
  data() {
    return {
      chartOptions: {
        chart: {
          map: null,
          height: 200,
        },
        title: {
          text: null,
        },
        lang: {
          zoomIn: "Phóng to",
          zoomOut: "Thu nhỏ",
        },
        mapNavigation: {
          enabled: true,
          enableDoubleClickZoomTo: true,
          buttonOptions: {
            verticalAlign: "bottom",
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
          "rgb(255, 207, 207)",
          "rgb(255, 150, 150)",
          "rgb(255, 92, 92)",
          "rgb(196, 0, 0)",
        ],
        legend: {
          enabled: false,
          // title: {
          //   text: null,
          // },
          // align: "right",
          // verticalAlign: "top",
          // floating: true,
          // layout: "vertical",
          // valueDecimals: 0,
          // symbolRadius: 5,
          // symbolHeight: 14,
          // rtl: true,
          // itemStyle: {
          //   color: "black",
          //   fontWeight: "normal",
          //   fontFamily: "Nunito",
          // },
        },
        colorAxis: {
          dataClassColor: "category",
          dataClasses: [
            { to: 1000000 },
            {
              from: 1000000,
              to: 10000000,
            },
            {
              from: 10000001,
              to: 50000000,
            },
            {
              from: 50000000,
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
              // format: "{point.name}",
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
              '</span></br><div class="d-divider"></div><div class="d-flex"><div class="d1">Nhiễm</div><div class="d2">' +
              this.point.value.toLocaleString() +
              "</div></div>" +
              '<div class="d-flex"><div class="d1">Tử vong</div><div class="d2">' +
              this.point.value2.toLocaleString() +
              "</div></div>" +
              '<div class="d-flex"><div class="d1">Khỏi</div><div class="d2">' +
              this.point.value1.toLocaleString() +
              "</div></div>"
            );
          },
        },
      },
    };
  },
  mounted() {
    this.chartOptions.chart.map = getWCoreMap2();
  },
  watch: {
    mainData: function(mainData) {
      let data = [];

      mainData.some((element) => {
        if (element.country === "Châu Á") {
          data.push({
            "hc-key": "as",
            value: Number(element.total_cases.replaceAll(".", "")),
            value1: Number(element.total_recovered.replaceAll(".", "")),
            value2: Number(element.total_deaths.replaceAll(".", "")),
          });
        }
        if (element.country === "Châu Âu") {
          data.push({
            "hc-key": "eu",
            value: Number(element.total_cases.replaceAll(".", "")),
            value1: Number(element.total_recovered.replaceAll(".", "")),
            value2: Number(element.total_deaths.replaceAll(".", "")),
          });
        }
        if (element.country === "Châu Phi") {
          data.push({
            "hc-key": "af",
            value: Number(element.total_cases.replaceAll(".", "")),
            value1: Number(element.total_recovered.replaceAll(".", "")),
            value2: Number(element.total_deaths.replaceAll(".", "")),
          });
        }
        if (element.country === "Bắc Mỹ") {
          data.push({
            "hc-key": "na",
            value: Number(element.total_cases.replaceAll(".", "")),
            value1: Number(element.total_recovered.replaceAll(".", "")),
            value2: Number(element.total_deaths.replaceAll(".", "")),
          });
        }
        if (element.country === "Nam Mỹ") {
          data.push({
            "hc-key": "sa",
            value: Number(element.total_cases.replaceAll(".", "")),
            value1: Number(element.total_recovered.replaceAll(".", "")),
            value2: Number(element.total_deaths.replaceAll(".", "")),
          });
        }
        if (element.country === "Oceania") {
          data.push({
            "hc-key": "oc",
            value: Number(element.total_cases.replaceAll(".", "")),
            value1: Number(element.total_recovered.replaceAll(".", "")),
            value2: Number(element.total_deaths.replaceAll(".", "")),
          });
        }

        if (data.length === 6) {
          return true;
        }
      });

      this.chartOptions.series[0].data = data;
    },
  },
};
</script>

<style>
#wmap2-main {
  width: 100%;
  background-color: white;
  font-family: "Nunito", sans-serif;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 15px;
  margin-bottom: 20px;
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

#wmap2-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
}
</style>
