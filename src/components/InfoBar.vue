<template>
  <div id="info-main">
    <div id="info-content">
      <div id="info-left">
        <p id="info-p1">TÌNH HÌNH ĐẠI DỊCH COVID-19</p>
        <p id="info-p2">
          Đại dịch Covid-19 do virus SARS-CoV-2 gây ra có trường hợp nhiễm bệnh
          đầu tiên tại Việt Nam vào ngày 23 tháng 1 năm 2020. Các hoạt động khác
          nhau để kiểm soát dịch đã được thực hiện như hạn chế tự do di chuyển
          hay triển khai khai báo y tế. Sức khoẻ con người, kinh tế, xã hội bị
          ảnh hưởng nghiêm trọng bởi đại dịch trên khắp đất nước.
        </p>
        <div id="info-button">
          <v-btn rounded id="info-btn1"
            ><v-icon left> mdi-login-variant </v-icon>ĐĂNG KÍ TIÊM
            VACCINE</v-btn
          >
          <v-btn rounded id="info-btn2"
            ><v-icon left> mdi-medical-bag </v-icon>KHAI BÁO Y TẾ</v-btn
          >
        </div>
      </div>
      <div id="info-right">
        <img src="../assets/mask.png" alt="Mask" />
      </div>
    </div>
    <img src="../assets/v1.png" id="v1" />
    <img src="../assets/v2.png" id="v2" />
    <img src="../assets/v3.png" id="v3" />
    <img src="../assets/v4.png" id="v4" />
    <div id="info-status">
      <div id="card-overview">
        <img src="../assets/vietnam.png" />
        <div id="card-overview-content">
          <p id="coc-1">Số liệu thống kê</p>
          <p id="coc-2">Việt Nam</p>
          <div id="coc-3-wrap">
            <p id="coc-3">•{{ live }}</p>
            <date-picker :data="dataFromFirebase" />
          </div>
        </div>
      </div>
      <div id="card-main" class="card-main-red">
        <div id="card-img">
          <img src="../assets/virus-red.png" />
        </div>
        <div id="card-content">
          <p id="card-content-1">Số ca nhiễm</p>
          <p id="card-content-2">{{ arrayData[0] }}</p>
          <p id="card-content-3">+{{ arrayData[1] }} {{ suffix }}</p>
        </div>
        <detail-bar :data="dataFromFirebase" />
      </div>
      <div id="card-main" class="card-main-green">
        <div id="card-img">
          <img src="../assets/virus-green.png" />
        </div>
        <div id="card-content">
          <p id="card-content-1">Số ca khỏi</p>
          <p id="card-content-2">{{ arrayData[2] }}</p>
          <p id="card-content-3">+{{ arrayData[3] }} {{ suffix }}</p>
        </div>
      </div>
      <div id="card-main" class="card-main-grey">
        <div id="card-img">
          <img src="../assets/virus-grey.png" />
        </div>
        <div id="card-content">
          <p id="card-content-1">Số ca tử vong</p>
          <p id="card-content-2">{{ arrayData[4] }}</p>
          <p id="card-content-3">+{{ arrayData[5] }} {{ suffix }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { getAppDate, getConfig } from "../js/func.js";
import DatePicker from "./DatePicker.vue";
import DetailBar from "./DetailBar.vue";

export default {
  name: "InfoBar",
  components: { DatePicker, DetailBar },
  data() {
    return {
      arrayData: [],
      dataFromFirebase: null,
      live: "",
      suffix: "",
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
      .child("api/vietnamSummary")
      .get()
      .then((snapshot) => {
        let data = snapshot.val();
        this.dataFromFirebase = data;

        if (getAppDate(2, 2, "/") === getAppDate(1, 2, "/")) {
          this.live = "LIVE";
          this.suffix = "hôm nay";
        } else {
          this.live = "HÔM QUA";
          this.suffix = "hôm qua";
        }

        let dataFilter = data.filter(function(e) {
          return e.day === getAppDate(2, 2, "/");
        });

        let temp0 = (dataFilter[0].totalCase + 53).toLocaleString();
        let temp1 = dataFilter[0].newCase.toLocaleString();
        let temp2 = dataFilter[0].totalRecover.toLocaleString();
        let temp3 = dataFilter[0].newRecover.toLocaleString();
        let temp4 = dataFilter[0].totalDeath.toLocaleString();
        let temp5 = dataFilter[0].newDeath.toLocaleString();

        this.arrayData = [temp0, temp1, temp2, temp3, temp4, temp5];
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
:root {
  --size: 400px;
}

#info-main {
  background-color: #262c7c;
  width: 100%;
  height: var(--size);
  font-family: "Nunito", sans-serif;
  position: relative;
}

#info-content {
  width: 85%;
  height: 350px;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#info-right img {
  height: 300px;
}

#info-right img:hover {
  height: 330px;
  transition: 0.5s ease;
  cursor: pointer;
}

#info-right img:not(:hover) {
  transition: 0.5s ease;
}

#info-left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 700px;
}

#info-left #info-p1 {
  color: white;
  font-weight: bold;
  font-size: 1.3rem;
}

#info-left #info-p2 {
  color: whitesmoke;
  margin-top: 20px;
}

#info-button {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

#info-btn1 {
  background-color: whitesmoke;
  margin-right: 10px;
  color: black;
  letter-spacing: normal;
}

#info-btn2 {
  background-color: #f37c7c;
  letter-spacing: normal;
  margin-right: 10px;
  color: white;
}

#v1 {
  position: absolute;
  top: 30%;
  left: -30px;
  height: 80px;
  opacity: 0.1;
}

#v2 {
  position: absolute;
  top: 15%;
  left: 60%;
  height: 70px;
  opacity: 0.1;
}

#v3 {
  position: absolute;
  top: 0;
  right: 0;
  height: 130px;
  opacity: 0.1;
}

#v4 {
  position: absolute;
  bottom: 50px;
  left: 40%;
  height: 140px;
  opacity: 0.1;
}

#info-status {
  width: 85%;
  height: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: absolute;
  top: 350px;
  left: 7.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

/* card */
#card-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100px;
}

#card-img {
  height: 100px;
}

#card-img img {
  height: 100px;
  padding: 25px 10px 25px 0px;
  opacity: 0.7;
}

#card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

#card-content-1 {
  opacity: 0.9;
  font-size: 0.9rem;
}

#card-content-2 {
  font-size: 1.4rem;
  font-weight: 800;
}

#card-content-3 {
  font-size: 0.9rem;
  font-weight: bold;
  opacity: 0.8;
}

#card-overview {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

#card-overview img {
  height: 100px;
  padding: 20px 10px 20px 0px;
}

#card-overview-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

#coc-1 {
  opacity: 0.9;
  font-size: 0.9rem;
}

#coc-2 {
  font-size: 1.4rem;
  font-weight: bold;
}

#coc-3-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

#coc-3 {
  font-size: 0.6rem;
  font-weight: bold;
  background-color: rgba(255, 0, 0, 0.2);
  color: rgb(255, 0, 0);
  padding: 2px 4px;
  border-radius: 3px;
  letter-spacing: 1px;
}
</style>
