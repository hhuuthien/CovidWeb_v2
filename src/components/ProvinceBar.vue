<template>
  <div id="province-main">
    <div id="province-search">
      <v-text-field
        v-model="keyword"
        label="Tìm kiếm..."
        solo
        dense
        clearable
        prepend-inner-icon="mdi-card-search"
      ></v-text-field>
    </div>
    <province-card-header @clicked_emit="clicked_emit" />
    <province-card-empty v-show="showEmpty" />
    <province-card
      v-for="i in province"
      :key="i.index"
      :p1="i[0]"
      :p2="i[1].toLocaleString()"
      :p3="i[2].toLocaleString()"
      :p4="i[4].toLocaleString()"
      :p5="i[5].toLocaleString()"
    />
  </div>
</template>

<script>
import ProvinceCard from "./ProvinceCard.vue";
import ProvinceCardHeader from "./ProvinceCardHeader.vue";
import ProvinceCardEmpty from "./ProvinceCardEmpty.vue";
import firebase from "firebase/app";
import "firebase/database";
import {
  getAppDate,
  getConfig,
  mergeArray,
  objectToArrayArray,
} from "../js/func.js";

export default {
  name: "ProvinceBar",
  components: { ProvinceCard, ProvinceCardHeader, ProvinceCardEmpty },
  data() {
    return {
      keyword: "",
      province: [],
      provinceCopy: [],
      showEmpty: false,
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
      .child("api/vietnamProvince")
      .get()
      .then((snapshot) => {
        let data = snapshot.val();
        let dataNew = data.new;
        let dataTotal = data.total;
        let dataDeath = data.death;

        let dataNewFilter = dataNew.filter(function(e) {
          return e["Ngày"] === getAppDate(2, 2, "/");
        });
        let dataTotalFilter = dataTotal.filter(function(e) {
          return e["Ngày"] === getAppDate(2, 2, "/");
        });

        let arrayNew = objectToArrayArray(dataNewFilter[0]);
        let arrayTotal = objectToArrayArray(dataTotalFilter[0]);
        let arrayMerge = mergeArray(arrayNew, arrayTotal, dataDeath);

        function compare(a, b) {
          if (a[1] < b[1]) {
            return 1;
          } else if (a[1] > b[1]) {
            return -1;
          } else return 0;
        }

        this.province = arrayMerge.sort(compare);
        this.provinceCopy = this.province;

        this.$emit("dataForMap", this.province);
        this.$emit("dataForChart3", data.transpose);
        this.$emit("loading_status", "finished");
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    clicked_emit(pWhat) {
      function compare1(a, b) {
        if (a[1] < b[1]) {
          return 1;
        } else if (a[1] > b[1]) {
          return -1;
        } else return 0;
      }
      function compare2(a, b) {
        if (a[2] < b[2]) {
          return 1;
        } else if (a[2] > b[2]) {
          return -1;
        } else return 0;
      }
      function compare4(a, b) {
        if (a[4] < b[4]) {
          return 1;
        } else if (a[4] > b[4]) {
          return -1;
        } else return 0;
      }
      function compare5(a, b) {
        if (a[5] < b[5]) {
          return 1;
        } else if (a[5] > b[5]) {
          return -1;
        } else return 0;
      }
      if (pWhat === "p2") {
        this.province.sort(compare1);
        this.provinceCopy.sort(compare1);
      } else if (pWhat === "p3") {
        this.province.sort(compare2);
        this.provinceCopy.sort(compare2);
      } else if (pWhat === "p4") {
        this.province.sort(compare4);
        this.provinceCopy.sort(compare4);
      } else if (pWhat === "p5") {
        this.province.sort(compare5);
        this.provinceCopy.sort(compare5);
      }
    },
  },
  watch: {
    keyword: function(val) {
      if (val !== "" && val !== null) {
        this.province = this.provinceCopy.filter(function(e) {
          return e[0].startsWith(val) || e[3].startsWith(val);
        });
        if (this.province.length === 0) {
          this.showEmpty = true;
        } else {
          this.showEmpty = false;
        }
      } else {
        this.province = this.provinceCopy;
        this.showEmpty = false;
      }
    },
  },
};
</script>

<style>
#province-main {
  width: 40%;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
  font-family: "Nunito", sans-serif;
  padding: 15px 0;
}

#province-search {
  width: calc(94% - 16px);
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

#input-20 {
  font-size: 0.9rem !important;
}

.v-label {
  font-size: 0.9rem !important;
}
</style>
