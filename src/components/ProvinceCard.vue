<template>
  <div id="province-card-main">
    <p id="p1">{{ p1 }}</p>
    <p id="p2">{{ p2 }}</p>
    <p id="p3">{{ p3 }}</p>
    <p id="p4">{{ p4 }}</p>
    <p id="p5">{{ p5 }}</p>
  </div>
</template>

<script>
export default {
  name: "ProvinceCard",
  props: ["p1", "p2", "p3", "p4", "p5"],
};
</script>

<style scoped>
#province-card-main {
  width: 94%;
  height: 38px;
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

#province-card-main:hover {
  background-color: rgb(244, 245, 255);
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s ease;
}

#province-card-main:hover > #p1 {
  font-weight: bold;
}

#province-card-main:hover > #p2 {
  font-weight: bold;
}

#province-card-main:hover > #p3 {
  font-weight: bold;
}

#province-card-main:hover > #p4 {
  font-weight: bold;
}

#province-card-main:hover > #p5 {
  font-weight: bold;
}

#p1 {
  width: 35%;
  font-size: 0.9rem;
}

#p2,
#p3,
#p4,
#p5 {
  font-size: 0.8rem;
  border-radius: 3px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#p2 {
  width: 15%;
  background-color: rgb(255, 241, 241);
  color: rgb(255, 45, 45);
}

#p3 {
  width: 15%;
  background-color: rgb(255, 225, 225);
  color: rgb(255, 45, 45);
}

#p4 {
  width: 15%;
  background-color: rgb(236, 236, 236);
  color: rgb(0, 0, 0);
}

#p5 {
  width: 15%;
  background-color: rgb(218, 218, 218);
  color: rgb(0, 0, 0);
}
</style>
