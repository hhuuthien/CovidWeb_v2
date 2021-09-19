<template>
  <div id="wlist-main">
    <v-tabs v-model="tab" show-arrows>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <div id="wlist-search">
          <v-text-field
            v-model="keyword"
            label="Tìm kiếm..."
            solo
            dense
            clearable
            prepend-inner-icon="mdi-card-search"
          ></v-text-field>
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
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { beautifyWorldData, stringToSlug } from "../js/func";
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
      keyword: "",
      showEmpty: false,
      tab: 0,
      items: [
        "Thế giới",
        "Châu Á",
        "Châu Âu",
        "Châu Phi",
        "Châu Mỹ",
        "Châu Đại Dương",
      ],
    };
  },
  watch: {
    mainData: function(mainData) {
      this.storeData = beautifyWorldData(mainData);
      this.storeDataCopy = this.storeData;
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
    tab: function() {
      console.log(this.storeDataCopy);
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

#wlist-search {
  padding: 0 8px;
  margin-bottom: 8px;
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

.v-tab {
  padding: 0 8px !important;
  font-size: 0.9rem !important;
  letter-spacing: normal !important;
  min-width: 50px !important;
  font-weight: bolder !important;
}

.v-tab--active {
  color: #262c7c !important;
  background-color: #f4f4ff !important;
}

.v-tabs-bar {
  height: 40px !important;
}

.v-tabs {
  padding: 0 8px !important;
  margin-bottom: 8px !important;
}

.v-tabs-slider-wrapper {
  display: none !important;
}

.v-slide-group__next,
.v-slide-group__prev {
  min-width: 0px !important;
  justify-content: center !important;
}
</style>
