<template>
  <div id="wfooter-main">
    <p id="f-title">
      TRANG TIN VỀ DỊCH BỆNH VIÊM ĐƯỜNG HÔ HẤP CẤP COVID-19 TRÊN THẾ GIỚI
    </p>
    <p id="f-subtitle1">
      Dữ liệu được cung cấp từ Tổ chức Y tế Thế giới WHO, Viện Đại học Johns
      Hopkins, trang tin điện tử Worldometers và báo điện tử VnExpress
    </p>
    <p id="f-subtitle2">
      Copyright © 2021 - hhuuthien@gmail.com
    </p>
    <img src="../assets/v4.png" id="img1" />
    <img src="../assets/v3.png" id="img2" />
  </div>
</template>

<script>
export default {
  name: "WFooter",
};
</script>

<style scoped>
#wfooter-main {
  width: 100%;
  height: 100px;
  background-color: #262c7c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Nunito", sans-serif;
  position: relative;
}

#f-title {
  color: whitesmoke;
  font-size: 0.8rem;
  font-weight: bold;
}

#f-subtitle1 {
  color: whitesmoke;
  font-size: 0.7rem;
  margin-top: 4px;
}

#f-subtitle2 {
  color: whitesmoke;
  font-size: 0.7rem;
  margin-top: 4px;
}

#img1 {
  position: absolute;
  bottom: 0;
  left: -30px;
  height: 120px;
  opacity: 0.1;
}

#img2 {
  position: absolute;
  top: 0;
  right: 0;
  height: 95px;
  opacity: 0.1;
}
</style>
