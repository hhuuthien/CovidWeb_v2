<template>
  <div id="news-card-main" :class="isHigh ? 'h170' : 'h150'">
    <img id="news-image" :src="image" :class="isHigh ? 'h170' : 'h150'" />
    <div
      id="news-overlay"
      @click="click_news"
      :class="isHigh ? 'h170' : 'h150'"
    ></div>
    <p id="news-title" @click="click_news">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "NewsCard",
  props: ["title", "image", "link", "isHigh"],
  methods: {
    click_news: function() {
      let c = confirm("Xem nội dung này trên báo VnExpress?");
      if (c == true) {
        window.open(this.link);
      }
    },
  },
};
</script>

<style scoped>
.h170 {
  height: 170px;
}

.h150 {
  height: 150px;
}

#news-card-main {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
}

#news-image {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

#news-overlay {
  width: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  position: absolute;
  top: 0;
  left: 0;
}

#news-title {
  position: absolute;
  bottom: 0;
  left: 0;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 10px;
}

#news-card-main:hover {
  cursor: pointer;
}

#news-card-main:hover > #news-image {
  transform: scale(1.2);
  transition: 0.5s ease;
}

#news-card-main:not(:hover) > #news-image {
  transform: scale(1);
  transition: 0.5s ease;
}
</style>
