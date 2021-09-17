<template>
  <div id="wlist-main">
    <country-card-header />
    <country-card
      v-for="country in storeData"
      :key="country.id"
      :p1="country.country"
      :p2="country.total_cases"
      :p22="country.new_cases"
      :p3="country.total_recovered"
      :p4="country.total_deaths"
      :p44="country.new_deaths"
    />
  </div>
</template>

<script>
import { beautifyWorldData } from "../js/func";
import CountryCard from "./CountryCard.vue";
import CountryCardHeader from "./CountryCardHeader.vue";

export default {
  name: "WList",
  components: { CountryCard, CountryCardHeader },
  props: ["mainData"],
  data() {
    return {
      storeData: null,
    };
  },
  watch: {
    mainData: function(mainData) {
      this.storeData = beautifyWorldData(mainData);
    },
  },
};
</script>

<style scoped>
#wlist-main {
  width: 68%;
  font-family: "Nunito", sans-serif;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 15px;
}
</style>
