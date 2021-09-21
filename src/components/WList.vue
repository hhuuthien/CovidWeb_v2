<template>
  <div data-app id="wlist-main">
    <div id="wlist-option">
      <div id="wlist-option-select">
        <div id="wos1">
          <v-select :items="itemsTime" v-model="tabTime" solo dense></v-select>
        </div>
        <div id="wos2">
          <v-select :items="items" v-model="tab" solo dense></v-select>
        </div>
      </div>
      <div id="wlist-option-search">
        <v-text-field
          v-model="keyword"
          label="Tìm kiếm..."
          solo
          dense
          clearable
          prepend-inner-icon="mdi-card-search"
          autocomplete="off"
        ></v-text-field>
      </div>
    </div>

    <country-card-header />
    <country-card-empty v-show="showEmpty" />

    <country-card
      v-for="country in storeData"
      :key="country.id"
      :p1="country.country"
      :p2="country.total_cases"
      :p22="country.new_cases"
      :p3="country.total_recovered"
      :p4="country.total_deaths"
      :p44="country.new_deaths"
      :index="storeDataCopy.indexOf(country) + 1"
    />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { beautifyWorldData, getConfig, stringToSlug } from "../js/func";
import CountryCard from "./CountryCard.vue";
import CountryCardEmpty from "./CountryCardEmpty.vue";
import CountryCardHeader from "./CountryCardHeader.vue";

export default {
  name: "WList",
  components: { CountryCard, CountryCardHeader, CountryCardEmpty },
  props: ["mainData"],
  data() {
    return {
      storeData: null,
      storeDataCopy: null,
      rootData: null,
      keyword: "",
      showEmpty: false,
      tab: "Thế giới",
      items: [
        "Thế giới",
        "Châu Á",
        "Châu Âu",
        "Châu Phi",
        "Châu Mỹ",
        "Châu Đại Dương",
      ],
      tabTime: "Hôm nay",
      itemsTime: ["Hôm nay", "Hôm qua"],
    };
  },
  watch: {
    mainData: function(mainData) {
      this.rootData = beautifyWorldData(mainData);
      this.storeData = this.rootData;
      this.storeDataCopy = this.rootData;
    },
    keyword: function(val) {
      if (val !== "" && val !== null) {
        this.storeData = this.storeDataCopy.filter(function(e) {
          return (
            e.country.startsWith(val) ||
            e.country.toLowerCase().startsWith(val) ||
            stringToSlug(e.country).startsWith(val)
          );
        });

        if (this.storeData.length === 0) {
          this.showEmpty = true;
        } else {
          this.showEmpty = false;
        }
      } else {
        this.storeData = this.storeDataCopy;
        this.showEmpty = false;
      }
    },
    tab: function(val) {
      switch (val) {
        case "Thế giới":
          this.storeDataCopy = this.rootData;
          break;
        case "Châu Á":
          this.storeDataCopy = this.rootData.filter(function(element) {
            return element.continent === "a";
          });
          break;
        case "Châu Âu":
          this.storeDataCopy = this.rootData.filter(function(element) {
            return element.continent === "au";
          });
          break;
        case "Châu Phi":
          this.storeDataCopy = this.rootData.filter(function(element) {
            return element.continent === "phi";
          });
          break;
        case "Châu Mỹ":
          this.storeDataCopy = this.rootData.filter(function(element) {
            return element.continent === "bmy" || element.continent === "nmy";
          });
          break;
        case "Châu Đại Dương":
          this.storeDataCopy = this.rootData.filter(function(element) {
            return element.continent === "dd";
          });
          break;
        default:
          break;
      }

      this.storeData = this.storeDataCopy;
      this.keyword = null;
    },
    tabTime: function(val) {
      this.tab = "Thế giới";
      this.keyword = null;
      switch (val) {
        case "Hôm nay": {
          this.rootData = beautifyWorldData(this.mainData);
          this.storeData = this.rootData;
          this.storeDataCopy = this.rootData;
          break;
        }
        case "Hôm qua": {
          let date = new Date();
          date.setDate(date.getDate() - 1);
          let x =
            date.getFullYear() +
            "i" +
            (date.getMonth() + 1) +
            "i" +
            date.getDate();

          if (!firebase.apps.length) {
            firebase.initializeApp(getConfig());
          } else {
            firebase.app();
          }

          firebase
            .database()
            .ref()
            .child("apiWorld")
            .child(x)
            .orderByKey()
            .limitToLast(1)
            .get()
            .then((snapshot) => {
              if (snapshot.exists()) {
                let tableCountry = Object.values(snapshot.val())[0].worldSummary
                  .data[0].table_country;

                this.rootData = beautifyWorldData(tableCountry);
                this.storeData = this.rootData;
                this.storeDataCopy = this.rootData;
              } else {
                console.error("Không có dữ liệu");
              }
            })
            .catch((error) => {
              console.error(error);
            });
          break;
        }
        default:
          break;
      }
    },
  },
};
</script>

<style>
#wlist-main {
  width: 68%;
  font-family: "Nunito", sans-serif;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 15px 10px;
}

#wlist-option {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 8px;
}

#wlist-option-select {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

#wos1 {
  width: 120px;
  margin-right: 10px;
}

#wos2 {
  width: 190px;
}

#wlist-option-search {
  width: 190px;
}

.v-input__prepend-inner {
  padding-right: 5px !important;
}

.v-text-field__details {
  display: none !important;
}

.v-input__slot {
  margin: 0px !important;
}

#input-12 {
  font-size: 0.9rem !important;
}

.v-label {
  font-size: 0.9rem !important;
}
</style>
