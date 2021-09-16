<template>
  <div id="contact-main">
    <div id="contact-title">Thông tin liên hệ y tế</div>
    <div id="contact-subtitle">
      Nguồn: Bộ Y tế và CDC các tỉnh thành
    </div>
    <div id="contact-content">
      <div id="contact-content1">
        <div id="contact-block1" class="contact-block" @click="call(1)">
          <p class="contact-block-name">Đường dây nóng</p>
          <p class="contact-block-num">1900 9095</p>
        </div>
        <div id="contact-block2" class="contact-block" @click="call(2)">
          <p class="contact-block-name">Cấp cứu</p>
          <p class="contact-block-num">115</p>
        </div>
        <div id="contact-block3" class="contact-block" @click="call(3)">
          <p class="contact-block-name">Tổng đài tư vấn</p>
          <p class="contact-block-num">1022</p>
        </div>
      </div>
      <div id="contact-content2">
        <div v-for="item in list" :key="item.id" id="contact-province">
          <p id="contact-province-name" @click="openWebsite(item.website)">
            {{ item.province }}
          </p>
          <p
            id="contact-province-num"
            @click="copyHotline(item.hotline, item.province)"
          >
            {{ item.hotline }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCDCInfo } from "../js/province";

export default {
  name: "Contact",
  data() {
    return {
      list: getCDCInfo(),
    };
  },
  methods: {
    copyHotline(num, text) {
      navigator.clipboard.writeText(num);
      alert(
        "Đã copy số điện thoại của CDC " +
          text +
          ". Bạn có thể liên lạc nếu cần thiết."
      );
    },
    openWebsite(web) {
      open(web);
    },
    call(type) {
      switch (type) {
        case 1:
          navigator.clipboard.writeText("19009095");
          alert(
            "Đã copy số điện thoại đường dây nóng 1900 9095. Bạn có thể liên lạc nếu cần thiết."
          );
          break;
        case 2:
          navigator.clipboard.writeText("115");
          alert(
            "Đã copy số điện thoại cấp cứu 115. Bạn có thể liên lạc nếu cần thiết."
          );
          break;
        case 3:
          navigator.clipboard.writeText("1022");
          alert(
            "Đã copy số điện thoại tổng đài tư vấn 1022. Bạn có thể liên lạc nếu cần thiết."
          );
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
#contact-main {
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Nunito", sans-serif;
  font-size: 0.9rem;
  padding: 15px;
}

#contact-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

#contact-subtitle {
  font-size: 0.7rem;
  margin-bottom: 15px;
}

#contact-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

#contact-content1 {
  width: 30%;
}

#contact-content2 {
  width: 68%;
  height: 203px;
  overflow-y: scroll;
  padding-right: 4px;
  /* scrollbar-width: none;
  -ms-overflow-style: none; */
}

/* #contact-content2::-webkit-scrollbar {
  width: 0px;
} */

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: rgb(240, 240, 240);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: rgb(185, 185, 185);
  border-radius: 5px;
}

.contact-block {
  width: 100%;
  background-color: rgb(255, 241, 241);
  border-radius: 5px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 65px;
}

.contact-block:hover {
  background-color: rgb(255, 225, 225);
  cursor: pointer;
  transition: 0.2s ease;
}

#contact-block2,
#contact-block3 {
  margin-top: 4px;
}

.contact-block-num {
  font-size: 1.1rem;
  font-weight: bold;
  color: rgb(204, 0, 0);
}

#contact-province {
  background-color: whitesmoke;
  width: 100%;
  border-radius: 5px;
  padding: 6px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

#contact-province:nth-child(63) {
  margin-bottom: 0px;
}

#contact-province:hover {
  background-color: rgb(230, 230, 230);
  transition: 0.2s ease;
}

#contact-province-num {
  font-weight: bold;
}

#contact-province-num:hover {
  color: rgb(204, 0, 0);
  transition: 0.2s ease;
  cursor: pointer;
}

#contact-province-name:hover {
  color: rgb(204, 0, 0);
  transition: 0.2s ease;
  cursor: pointer;
  font-weight: bold;
}
</style>
