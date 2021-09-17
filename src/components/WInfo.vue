<template>
  <div id="winfo-main">
    <div id="card-overview">
      <img src="../assets/worldwide2.png" />
      <div id="card-overview-content">
        <p id="coc-1">Số liệu thống kê</p>
        <p id="coc-2">Thế giới</p>
        <p id="coc-3">•LIVE</p>
      </div>
    </div>
    <div id="card-main" class="card-main-red">
      <div id="card-img">
        <img src="../assets/virus-red.png" />
      </div>
      <div id="card-content">
        <p id="card-content-1">Số ca nhiễm</p>
        <p id="card-content-2">{{ arrayData[0] }}</p>
        <p id="card-content-3">{{ arrayData[1] }}</p>
      </div>
    </div>
    <div id="card-main" class="card-main-green">
      <div id="card-img">
        <img src="../assets/virus-green.png" />
      </div>
      <div id="card-content">
        <p id="card-content-1">Số ca khỏi</p>
        <p id="card-content-2">{{ arrayData[2] }}</p>
        <p id="card-content-3">{{ arrayData[3] }}</p>
      </div>
    </div>
    <div id="card-main" class="card-main-grey">
      <div id="card-img">
        <img src="../assets/virus-grey.png" />
      </div>
      <div id="card-content">
        <p id="card-content-1">Số ca tử vong</p>
        <p id="card-content-2">{{ arrayData[4] }}</p>
        <p id="card-content-3">{{ arrayData[5] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WInfo",
  props: ["mainData"],
  data() {
    return {
      arrayData: [0, 0, 0, 0, 0, 0],
    };
  },
  watch: {
    mainData: function(mainData) {
      this.arrayData = [
        mainData.total_cases,
        mainData.new_cases,
        mainData.total_recovered,
        mainData.new_recovered,
        mainData.total_deaths,
        mainData.new_deaths,
      ];
    },
  },
};
</script>

<style scoped>
#winfo-main {
  width: 85%;
  height: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: absolute;
  top: 470px;
  left: 7.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-family: "Nunito", sans-serif;
}
</style>
