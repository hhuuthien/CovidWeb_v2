<template>
  <div id="country-empty-main">
    Không có dữ liệu
  </div>
</template>

<script>
export default {
  name: "CountryEmpty",
};
</script>

<style scoped>
#country-empty-main {
  width: calc(100% - 16px);
  margin: auto;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  background-color: rgb(255, 225, 225);
  border-radius: 5px;
}
</style>
