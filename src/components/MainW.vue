<template>
  <div id="mainw-main">
    <w-map />
    <w-list v-show="false" />
  </div>
</template>

<script>
import WList from "./WList.vue";
import WMap from "./WMap.vue";

export default {
  name: "MainW",
  components: { WMap, WList },
};
</script>

<style scoped></style>
