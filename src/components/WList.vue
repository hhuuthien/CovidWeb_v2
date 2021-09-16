<template>
  <div id="wlist-main">
    <country-card
      v-for="country in storeData"
      :key="country.id"
      :p1="country.country"
      :p2="country.total_cases"
      :p3="country.total_deaths"
      :p4="country.total_recovered"
    />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { getConfig, beautifyWorldData } from "../js/func";
import CountryCard from "./CountryCard.vue";

export default {
  name: "WList",
  components: { CountryCard },
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
  width: 85%;
  font-family: "Nunito", sans-serif;
  margin: auto;
}
</style>
