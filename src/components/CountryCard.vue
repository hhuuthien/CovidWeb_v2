<template>
  <div id="country-card-main">
    <p id="p1">{{ p1 }}</p>
    <p id="p2">{{ p2 }}</p>
    <p id="p3">{{ p3 }}</p>
    <p id="p4">{{ p4 }}</p>
  </div>
</template>

<script>
export default {
  name: "CountryCard",
  props: ["p1", "p2", "p3", "p4"],
};
</script>

<style scoped>
#country-card-main {
  width: 100%;
  height: 38px;
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

#country-card-main:hover {
  background-color: rgb(244, 245, 255);
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s ease;
}

#country-card-main:hover > #p1 {
  font-weight: bold;
  transition: 0.3s ease;
}

#p1 {
  width: 35%;
  font-size: 0.9rem;
}

#p2,
#p3,
#p4 {
  font-size: 0.8rem;
  border-radius: 3px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#p2 {
  width: 20%;
  background-color: rgb(255, 241, 241);
  color: rgb(255, 45, 45);
}

#p3 {
  width: 20%;
  background-color: rgb(255, 225, 225);
  color: rgb(255, 45, 45);
}

#p4 {
  width: 20%;
  background-color: rgb(236, 236, 236);
  color: rgb(0, 0, 0);
}
</style>
