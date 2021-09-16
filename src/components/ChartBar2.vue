<template>
  <div id="chart2-main">
    <div id="chart2-title">Bản đồ vùng dịch</div>
    <div id="chart2-subtitle">
      Tính từ đợt bùng phát dịch lần thứ 4 ngày 27/4/2021
    </div>
    <highcharts
      :constructorType="'mapChart'"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
  </div>
</template>

<script>
import { convertToHCKey } from "../js/func.js";
import { getCoreMap } from "../js/coreMap.js";

export default {
  name: "CharrBar2",
  props: ["dataForMap"],
  data() {
    return {
      chartOptions: {
        chart: {
          map: null,
          height: 590,
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
            { to: 1 },
            {
              from: 1,
              to: 100,
            },
            {
              from: 101,
              to: 500,
            },
            {
              from: 501,
              to: 1000,
            },
            {
              from: 1001,
              to: 10000,
            },
            {
              from: 10000,
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
              '</span></br><div class="d-divider"></div><div class="d-flex"><div class="d1">Hôm nay</div><div class="d2">' +
              this.point.newValue.toLocaleString() +
              '</div></div><div class="d-flex"><div class="d1">Tổng nhiễm</div><div class="d2">' +
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
  mounted() {
    this.chartOptions.chart.map = getCoreMap();
  },
  watch: {
    dataForMap: function(dataForMap) {
      let arrayChart = [];
      dataForMap.forEach((element) => {
        arrayChart.push({
          "hc-key": convertToHCKey(element[0]),
          value: element[2],
          newValue: element[1],
        });
      });
      arrayChart.push(
        {
          "hc-key": "vn-cb",
          value: 0,
          newValue: 0,
        },
        {
          "hc-key": "vn-qdhs",
          value: 0,
          newValue: 0,
        },
        {
          "hc-key": "vn-qdts",
          value: 0,
          newValue: 0,
        }
      );
      this.chartOptions.series[0].data = arrayChart;
    },
  },
};
</script>

<style>
#chart2-main {
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 20px;
  font-family: "Nunito", sans-serif;
  padding: 15px;
}

.highcharts-tooltip .f1 {
  font-size: 0.9rem;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}

.highcharts-tooltip .d-divider {
  background-color: rgb(196, 196, 196);
  width: 180px;
  height: 1px;
  margin: 5px 0;
}

.highcharts-tooltip .d-flex {
  width: 180px;
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

#chart2-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

#chart2-subtitle {
  font-size: 0.7rem;
  margin-bottom: 15px;
}
</style>
