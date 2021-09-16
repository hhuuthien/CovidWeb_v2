<template>
  <div id="news-main">
    <div id="news-title">Tin tức</div>
    <div id="news-news">
      <news-card
        v-for="news in newsData"
        :key="news.id"
        :title="news.title"
        :image="news.thumbnail_url"
        :link="news.share_url"
      />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { getConfig, shuffleArray } from "../js/func";
import NewsCard from "./NewsCard.vue";

export default {
  name: "News",
  components: { NewsCard },
  data() {
    return {
      newsData: [],
    };
  },
  mounted() {
    if (!firebase.apps.length) {
      firebase.initializeApp(getConfig());
    } else {
      firebase.app();
    }

    firebase
      .database()
      .ref()
      .child("api/vietnamNews")
      .get()
      .then((snapshot) => {
        let data = snapshot.val().data["1004765"].data;
        let dataFilter = data.filter(function(element) {
          return !(
            element.title.includes("Số liệu") ||
            element.title.includes("ca Covid-19")
          );
        });
        let dataShuffle = shuffleArray(dataFilter);
        this.newsData = dataShuffle.slice(0, 6);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
#news-main {
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Nunito", sans-serif;
  padding: 15px;
  margin-bottom: 20px;
}

#news-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

#news-news {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 15px;
  row-gap: 15px;
}
</style>
