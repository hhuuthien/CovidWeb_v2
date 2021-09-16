<template>
  <div id="wlist-main">
    <country-card-header />
    <country-card
      v-for="country in storeData"
      :key="country.id"
      :p1="country.country"
      :p2="country.total_cases"
      :p3="country.total_recovered === '' ? '0' : country.total_recovered"
      :p4="country.total_deaths === '' ? '0' : country.total_deaths"
    />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { getConfig, beautifyWorldData } from "../js/func";
import CountryCard from "./CountryCard.vue";
import CountryCardHeader from "./CountryCardHeader.vue";

export default {
  name: "WList",
  components: { CountryCard, CountryCardHeader },
  data() {
    return {
      storeData: null,
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
      .child("api/worldSummary")
      .get()
      .then((snapshot) => {
        let myData = (this.storeData = beautifyWorldData(
          snapshot.val().data[0].table_country
        ));
        this.storeData = myData;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
#wlist-main {
  width: 50%;
  font-family: "Nunito", sans-serif;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 15px;
}
</style>
