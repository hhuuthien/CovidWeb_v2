<template>
  <div id="province-card-main">
    <div id="province-card-main-title">
      <p id="p1"></p>
      <p id="p2" @click="p2click">
        Nhiễm<br />mới<v-icon small id="p2icon" v-show="iconShow[0]"
          >mdi-chevron-down</v-icon
        >
      </p>
      <p id="p3" @click="p3click">
        Tổng<br />nhiễm<v-icon small id="p3icon" v-show="iconShow[1]"
          >mdi-chevron-down</v-icon
        >
      </p>
      <p id="p4" @click="p4click">
        Tử vong<br />mới<v-icon small id="p4icon" v-show="iconShow[2]"
          >mdi-chevron-down</v-icon
        >
      </p>
      <p id="p5" @click="p5click">
        Tổng<br />tử vong<v-icon small id="p5icon" v-show="iconShow[3]"
          >mdi-chevron-down</v-icon
        >
      </p>
    </div>
    <div id="divider"></div>
  </div>
</template>

<script>
export default {
  name: "ProvinceCardHeader",
  data() {
    return {
      iconShow: [1, 0, 0, 0],
    };
  },
  methods: {
    p2click() {
      this.$emit("clicked_emit", "p2");
      this.iconShow = [1, 0, 0, 0];
    },
    p3click() {
      this.$emit("clicked_emit", "p3");
      this.iconShow = [0, 1, 0, 0];
    },
    p4click() {
      this.$emit("clicked_emit", "p4");
      this.iconShow = [0, 0, 1, 0];
    },
    p5click() {
      this.$emit("clicked_emit", "p5");
      this.iconShow = [0, 0, 0, 1];
    },
  },
};
</script>

<style scoped>
#province-card-main {
  width: 94%;
  height: 71px;
  margin-top: 2px;
  cursor: pointer;
  padding: 0 8px;
  position: sticky;
  top: 0;
  background-color: white;
}

#province-card-main-title {
  height: 68px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#divider {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 2px;
}

p {
  text-align: center;
  line-height: 1.1;
}

#p1 {
  width: 35%;
  height: 60px;
}

#p2,
#p3,
#p4,
#p5 {
  font-size: 0.8rem;
  border-radius: 3px;
  height: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#p2icon,
#p3icon,
#p4icon,
#p5icon {
  position: absolute;
  bottom: 0;
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

#p2icon,
#p3icon {
  color: red;
}

#p4icon,
#p5icon {
  color: black;
}
</style>
