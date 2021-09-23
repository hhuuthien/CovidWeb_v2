<template>
  <div id="vacinfo-main">
    <div id="info-content">
      <div id="info-left">
        <p id="info-p1">VACCINE COVID-19</p>
        <p id="info-p2">
          Cùng với những biện pháp xét nghiệm và phòng chống dịch hiệu quả,
          vaccine là công cụ quan trọng giúp kiểm soát đại dịch Covid-19. Một số
          loại vaccine như Astra Zeneca, Pfizer, Moderna, ... đã vượt qua quá
          trình kiểm duyệt nghiêm ngặt của nhiều cơ quan quản lý nhà nước trên
          thế giới và bắt đầu được tiêm chủng rộng rãi. Tại Việt Nam, vaccine đã
          và đang được tiêm cho toàn bộ người dân trên 18 tuổi.
        </p>
        <div id="info-button">
          <v-btn rounded id="info-btn1"
            ><v-icon left> mdi-medical-bag </v-icon>ĐĂNG KÍ TIÊM VACCINE</v-btn
          >
        </div>
      </div>
      <div id="info-right">
        <img src="../assets/vaccine.png" alt="Vaccine" />
      </div>
    </div>
    <img src="../assets/v1.png" id="v1" />
    <img src="../assets/v2.png" id="v2" />
    <img src="../assets/v3.png" id="v3" />
    <!-- <img src="../assets/v4.png" id="v4" /> -->
    <div id="info-status">
      <div id="card-main" class="card-main-red">
        <div id="card-img">
          <img src="../assets/vaccine-dose.png" />
        </div>
        <div id="card-content">
          <p id="card-content-1">Tổng số người đã tiêm</p>
          <p id="card-content-2">{{ arrayData[0] }}</p>
          <p id="card-content-3">{{ arrayData[1] }}% dân số</p>
        </div>
      </div>
      <div id="card-main" class="card-main-green">
        <div id="card-img">
          <img src="../assets/dose1.png" />
        </div>
        <div id="card-content">
          <p id="card-content-1">Tiêm chưa đủ liều</p>
          <p id="card-content-2">{{ arrayData[2] }}</p>
          <p id="card-content-3">{{ arrayData[3] }}% dân số</p>
        </div>
      </div>
      <div id="card-main" class="card-main-grey">
        <div id="card-img">
          <img src="../assets/dose2.png" />
        </div>
        <div id="card-content">
          <p id="card-content-1">Tiêm đủ liều</p>
          <p id="card-content-2">{{ arrayData[4] }}</p>
          <p id="card-content-3">{{ arrayData[5] }}% dân số</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VacInfoBar",
  props: ["mainData"],
  data() {
    return {
      arrayData: [0, 0, 0, 0, 0, 0],
    };
  },
  watch: {
    mainData: function(mainData) {
      let vietnamPopulation = 96500000;

      let temp0 = mainData.totalPeople.toLocaleString();
      let temp1 = ((mainData.totalPeople / vietnamPopulation) * 100).toFixed(1);
      let temp2 = mainData.people_t1.toLocaleString();
      let temp3 = ((mainData.people_t1 / vietnamPopulation) * 100).toFixed(1);
      let temp4 = mainData.people_t2.toLocaleString();
      let temp5 = ((mainData.people_t2 / vietnamPopulation) * 100).toFixed(1);

      this.arrayData = [temp0, temp1, temp2, temp3, temp4, temp5];
    },
  },
};
</script>

<style>
:root {
  --size: 400px;
}

#vacinfo-main {
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
  height: 250px;
}

#info-right img:hover {
  height: 280px;
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

/* #v4 {
  position: absolute;
  bottom: 50px;
  left: 40%;
  height: 140px;
  opacity: 0.1;
} */

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
