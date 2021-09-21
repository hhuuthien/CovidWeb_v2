<template>
  <div id="country-card-main">
    <p id="p0">{{ index }}</p>
    <p id="p1">{{ p1 }}</p>
    <p id="p2">{{ p2 }}</p>
    <p id="p22">{{ p22 }}</p>
    <p id="p3">{{ p3 }}</p>
    <p id="p4">{{ p4 }}</p>
    <p id="p44">{{ p44 }}</p>
  </div>
</template>

<script>
export default {
  name: "CountryCard",
  props: ["p1", "p2", "p22", "p3", "p4", "p44", "index"],
};
</script>

<style scoped>
#country-card-main {
  width: 100%;
  height: 32px;
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
}

#country-card-main:hover > #p2 {
  font-weight: bold;
}

#country-card-main:hover > #p22 {
  font-weight: bold;
}

#country-card-main:hover > #p3 {
  font-weight: bold;
}

#country-card-main:hover > #p4 {
  font-weight: bold;
}

#country-card-main:hover > #p44 {
  font-weight: bold;
}

#p0 {
  width: 3%;
  font-size: 0.7rem;
}

#p1 {
  width: 28%;
  font-size: 0.8rem;
  /* text-overflow css */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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
  width: 15%;
  background-color: rgb(255, 241, 241);
  color: rgb(255, 45, 45);
}

#p22 {
  width: 10%;
  background-color: rgb(255, 241, 241);
  color: rgb(255, 45, 45);
}

#p3 {
  width: 15%;
  background-color: rgb(236, 255, 242);
  color: rgb(0, 165, 55);
}

#p4 {
  width: 15%;
  background-color: rgb(236, 236, 236);
  color: rgb(0, 0, 0);
}

#p44 {
  width: 10%;
  background-color: rgb(236, 236, 236);
  color: rgb(0, 0, 0);
}
</style>
