<template>
  <div id="vactype-main">
    <div id="vactype-title">Số liều vaccine về theo tháng</div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { vaccineTypeFunction } from "../js/func";
import { Chart } from "highcharts-vue";

export default {
  name: "VacType",
  props: ["mainData"],
  components: {
    highcharts: Chart,
  },
  data() {
    return {
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
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: [],
          crosshair: true,
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
        },
        // tooltip: {
        //   formatter: function() {
        //     return this.points.reduce(function(s, point) {
        //       if (point.y != 0) {
        //         return (
        //           s +
        //           "<br/><b>" +
        //           point.series.name +
        //           "</b>: " +
        //           point.y.toLocaleString() +
        //           " liều"
        //         );
        //       } else {
        //         return s;
        //       }
        //     }, "<b>" + this.x + "</b>");
        //   },
        //   shared: true,
        //   useHTML: true,
        // },  chỉnh màu cho hài hoà, css một cái tooltip, tooltip vô từng ô
        plotOptions: {
          column: {
            stacking: "normal",
          },
        },
        series: [
          {
            name: "Astra Zeneca",
            data: [],
            stack: "1",
            color: "#262c7c",
          },
          {
            name: "Pfizer",
            data: [],
            stack: "1",
            color: "#f37c7c",
          },
          {
            name: "Moderna",
            data: [],
            stack: "1",
            color: "#00cbff",
          },
          {
            name: "Sputnik V",
            data: [],
            stack: "1",
            color: "#434348",
          },
          {
            name: "Sinopharm",
            data: [],
            stack: "1",
            color: "#f7a35c",
          },
        ],
      },
    };
  },
  watch: {
    mainData: function(mainData) {
      let dataByMonth = [];
      let arrayMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      arrayMonth.forEach((element) => {
        let dataInThisMonth = [];
        mainData.forEach((e) => {
          if (Number(e.month[1]) === element) {
            dataInThisMonth.push(e);
          }
        });
        if (dataInThisMonth.length !== 0) dataByMonth.push(dataInThisMonth);
      });

      let arrayCategory = [];
      let astrazeneca = [];
      let moderna = [];
      let pfizer = [];
      let sinopharm = [];
      let sputnikv = [];
      let all = [];

      dataByMonth.forEach((element) => {
        arrayCategory.push("Tháng " + element[0].month[1]);
        let x1 = 0;
        let x2 = 0;
        let x3 = 0;
        let x4 = 0;
        let x5 = 0;
        let x6 = 0;
        element.forEach((e) => {
          x1 += vaccineTypeFunction(e.astrazeneca);
          x2 += vaccineTypeFunction(e.moderna);
          x3 += vaccineTypeFunction(e.pfizer);
          x4 += vaccineTypeFunction(e.sinopharm);
          x5 += vaccineTypeFunction(e.sputnikv);
          x6 += vaccineTypeFunction(e.all);
        });
        astrazeneca.push(x1);
        moderna.push(x2);
        pfizer.push(x3);
        sinopharm.push(x4);
        sputnikv.push(x5);
        all.push(x6);
      });

      this.chartOptions.xAxis.categories = arrayCategory;
      this.chartOptions.series[0].data = astrazeneca;
      this.chartOptions.series[1].data = pfizer;
      this.chartOptions.series[2].data = moderna;
      this.chartOptions.series[3].data = sputnikv;
      this.chartOptions.series[4].data = sinopharm;
    },
  },
};
</script>

<style>
#vactype-main {
  width: 49%;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Nunito", sans-serif;
  padding: 15px;
}

#vactype-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 15px;
}
</style>
