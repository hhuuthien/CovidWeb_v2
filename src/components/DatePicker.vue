<template>
  <div data-app id="data-app">
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-icon id="icon-history" small v-bind="attrs" v-on="on"
          >mdi-history</v-icon
        >
      </template>

      <div id="dialog">
        <v-date-picker
          id="dialog1"
          width="360px"
          v-model="picker"
          color="#262c7c"
          show-adjacent-months
          locale="vi-VN"
          :first-day-of-week="1"
          :month-format="getMonthFormat"
          :header-date-format="getHeaderDateFormat"
          :title-date-format="getTitleDateFormat"
          min="2021-04-27"
          :max="maxPicker"
        ></v-date-picker>
        <div id="dialog2">
          <p id="dp1"></p>
          <div id="dp2" v-show="dpShow">
            <div id="card-overview-picker">
              <img src="../assets/vietnam.png" />
              <div id="card-overview-content">
                <p id="coc-1">Số liệu thống kê</p>
                <p id="coc-2">Việt Nam</p>
                <div id="coc-3-wrap">
                  <p id="coc-3">•ĐẾN NGÀY {{ theday }}</p>
                </div>
              </div>
            </div>
            <div id="card-main-picker">
              <div id="card-img">
                <img src="../assets/virus-red.png" />
              </div>
              <div id="card-content">
                <p id="card-content-1">Số ca nhiễm</p>
                <p id="card-content-2">{{ arrayData[0] }}</p>
                <p id="card-content-3">+{{ arrayData[1] }}</p>
              </div>
            </div>
            <div id="card-main-picker">
              <div id="card-img">
                <img src="../assets/virus-green.png" />
              </div>
              <div id="card-content">
                <p id="card-content-1">Số ca khỏi</p>
                <p id="card-content-2">{{ arrayData[2] }}</p>
                <p id="card-content-3">+{{ arrayData[3] }}</p>
              </div>
            </div>
            <div id="card-main-picker">
              <div id="card-img">
                <img src="../assets/virus-grey.png" />
              </div>
              <div id="card-content">
                <p id="card-content-1">Số ca tử vong</p>
                <p id="card-content-2">{{ arrayData[4] }}</p>
                <p id="card-content-3">+{{ arrayData[5] }}</p>
              </div>
            </div>
          </div>
          <div id="dp3" v-show="!dpShow">
            <img src="../assets/vietnam.png" />
            <p>
              Dữ liệu ngày hôm nay chưa được công bố bởi Bộ Y tế. Hãy xem dữ
              liệu cũ hoặc vui lòng chờ đến 18 giờ!
            </p>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { getAppDate } from "../js/func";

export default {
  name: "DatePicker",
  props: ["data"],
  data() {
    return {
      dialog: false,
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      maxPicker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10), //today
      theday: "HÔM NAY",
      thedata: null,
      arrayData: [],
      dpShow: false,
    };
  },
  methods: {
    getMonthFormat(isoDate) {
      return "Tháng " + isoDate.toString().substring(5, 7);
    },
    getHeaderDateFormat(isoDate) {
      if (isoDate.length === 7) {
        return (
          "Tháng " +
          isoDate.toString().substring(5, 7) +
          " năm " +
          isoDate.toString().substring(0, 4)
        );
      } else {
        return isoDate;
      }
    },
    getTitleDateFormat(isoDate) {
      let temp = new Date(isoDate).toString().substring(0, 3);
      let day = "";
      switch (temp) {
        case "Mon":
          day = "Thứ hai";
          break;
        case "Tue":
          day = "Thứ ba";
          break;
        case "Wed":
          day = "Thứ tư";
          break;
        case "Thu":
          day = "Thứ năm";
          break;
        case "Fri":
          day = "Thứ sáu";
          break;
        case "Sat":
          day = "Thứ bảy";
          break;
        case "Sun":
          day = "Chủ nhật";
          break;
      }
      let date = isoDate.toString().substring(8, 10);
      let month = isoDate.toString().substring(5, 7);
      let year = isoDate.toString().substring(0, 4);
      return day + ", ngày " + date + " tháng " + month + " năm " + year;
    },
  },
  watch: {
    picker: function(val) {
      let temp1 = val.toString().substring(8, 10);
      let temp2 = val.toString().substring(5, 7);
      if (temp1.startsWith("0")) {
        temp1 = temp1.substring(1, 2);
      }
      if (temp2.startsWith("0")) {
        temp2 = temp2.substring(1, 2);
      }
      this.theday = `${temp1}/${temp2}`;
    },
    data: function(data) {
      this.thedata = data;
      //first work
      let dataFilter = this.thedata.filter(function(e) {
        return e.day === getAppDate(1, 2, "/");
      });

      let temp0 = (dataFilter[0].totalCase + 53).toLocaleString();
      let temp1 = dataFilter[0].newCase.toLocaleString();
      let temp2 = dataFilter[0].totalRecover.toLocaleString();
      let temp3 = dataFilter[0].newRecover.toLocaleString();
      let temp4 = dataFilter[0].totalDeath.toLocaleString();
      let temp5 = dataFilter[0].newDeath.toLocaleString();

      this.arrayData = [temp0, temp1, temp2, temp3, temp4, temp5];
    },
    theday: function(day) {
      if (day !== getAppDate(1, 2, "/")) {
        this.dpShow = true;
      } else {
        if (getAppDate(2, 2, "/") !== getAppDate(1, 2, "/")) {
          //no new data
          this.dpShow = false;
        } else {
          this.dpShow = true;
        }
      }

      let dataFilter = this.thedata.filter(function(e) {
        return e.day === day;
      });

      let temp0 = (dataFilter[0].totalCase + 53).toLocaleString();
      let temp1 = dataFilter[0].newCase.toLocaleString();
      let temp2 = dataFilter[0].totalRecover.toLocaleString();
      let temp3 = dataFilter[0].newRecover.toLocaleString();
      let temp4 = dataFilter[0].totalDeath.toLocaleString();
      let temp5 = dataFilter[0].newDeath.toLocaleString();

      this.arrayData = [temp0, temp1, temp2, temp3, temp4, temp5];
    },
  },
  mounted() {
    if (getAppDate(2, 2, "/") !== getAppDate(1, 2, "/")) {
      //no new data
      this.dpShow = false;
    } else {
      this.dpShow = true;
    }
  },
};
</script>

<style>
#data-app {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#icon-history {
  margin-left: 5px;
}

#icon-history:hover {
  cursor: pointer;
  color: #f37c7c;
}

.v-date-picker-title__date {
  font-size: 16px !important;
}

#dialog {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#dialog1 {
  width: 360px;
}

#dialog2 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

#dp1 {
  height: 70px;
  background-color: #262c7c;
}

#card-main-picker {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
}

#card-overview-picker {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
}

#dp3 {
  height: 288px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 100px;
}

@media only screen and (max-width: 1000px) {
  #dp2 {
    height: 288px;
    background-color: white;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    padding: 40px 0px;
  }
}

@media only screen and (min-width: 1001px) {
  #dp2 {
    height: 288px;
    background-color: white;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    padding: 40px 0px;
  }

  #card-overview-picker {
    grid-column-start: 1;
    grid-column-end: 4;
  }

  .v-dialog {
    width: 70% !important;
  }
}
</style>
