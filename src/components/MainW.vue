<template>
  <div id="mainw-main">
    <w-map />
    <w-info />
    <div id="mainw-below">
      <w-list />
    </div>

    <v-icon id="scrollToTop" @click="topFunc">mdi-arrow-up-circle</v-icon>
  </div>
</template>

<script>
import WInfo from "./WInfo.vue";
import WList from "./WList.vue";
import WMap from "./WMap.vue";

export default {
  name: "MainW",
  components: { WMap, WList, WInfo },
  mounted() {
    let scrollToTop = document.getElementById("scrollToTop");

    window.onscroll = function() {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
      ) {
        scrollToTop.style.visibility = "visible";
      } else {
        scrollToTop.style.visibility = "hidden";
      }
    }
  },
  methods: {
    topFunc: function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style scoped>
#mainw-below {
  width: 85%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 125px;
  margin-bottom: 20px;
}

#scrollToTop {
  visibility: hidden;
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 99;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  color: #262c7c;
  cursor: pointer;
  height: 34px;
  vertical-align: unset !important;
}

#scrollToTop:hover {
  background-color: whitesmoke;
  border-radius: 50px;
  color: #3e1969;
}
</style>
