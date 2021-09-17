<template>
  <div id="country-card-header-main">
    <div id="cch1">
      <p id="p1"></p>
      <p id="p2">Số ca nhiễm</p>
      <p id="p22">Mới</p>
      <p id="p3">Số ca khỏi</p>
      <p id="p4">Số ca tử vong</p>
      <p id="p44">Mới</p>
    </div>
    <div id="divider"></div>
  </div>
</template>

<script>
export default {
  name: "CountryCardHeader",
};
</script>

<style scoped>
#divider {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 2px;
}

#country-card-header-main {
  padding: 0 8px;
  position: sticky;
  top: 0;
  background-color: white;
}

#cch1 {
  width: 100%;
  height: 38px;
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#p1 {
  width: 26%;
  font-size: 0.9rem;
}

#p2,
#p22,
#p3,
#p4,
#p44 {
  font-size: 0.8rem;
  border-radius: 3px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#p2 {
  width: 16%;
  background-color: rgb(255, 241, 241);
  color: rgb(255, 45, 45);
}

#p22 {
  width: 11%;
  background-color: rgb(255, 241, 241);
  color: rgb(255, 45, 45);
}

#p3 {
  width: 16%;
  background-color: rgb(236, 255, 242);
  color: rgb(0, 165, 55);
}

#p4 {
  width: 16%;
  background-color: rgb(236, 236, 236);
  color: rgb(0, 0, 0);
}

#p44 {
  width: 11%;
  background-color: rgb(236, 236, 236);
  color: rgb(0, 0, 0);
}

#country-card-header-main:hover {
  cursor: pointer;
}
</style>
