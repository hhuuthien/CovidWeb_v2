import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
//
import Highcharts from "highcharts";
import Maps from "highcharts/modules/map";
import HighchartsVue from "highcharts-vue";

Vue.config.productionTip = false;

Maps(Highcharts);
Vue.use(HighchartsVue);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
