<template>
  <div data-app id="data-app-more">
    <v-dialog v-model="dialogmore">
      <template v-slot:activator="{ on, attrs }">
        <v-icon small id="icon-showmore" v-bind="attrs" v-on="on"
          >mdi-open-in-new</v-icon
        >
      </template>

      <div id="dialogmore">
        <div id="dialog-d1">
          <div id="dialog-d11">Số ca nhiễm mới</div>
          <div id="dialog-d12">{{ arrayData[0] }}</div>
        </div>
        <div id="dialog-d2">
          <p id="pp">Trong đó:</p>
          <div id="dialog-d21" class="dialog-d2">
            <p>• Số ca nhiễm mới nhập cảnh từ nước ngoài</p>
            <p class="dataNum">{{ arrayData[1] }}</p>
          </div>
          <div id="dialog-d22" class="dialog-d2">
            <p>• Số ca nhiễm mới ghi nhận trong nước</p>
            <p class="dataNum">{{ arrayData[2] }}</p>
          </div>
          <div id="dialog-d23" class="dialog-d2">
            <p class="dataChild">
              ‣ Số ca nhiễm mới trong khu cách ly, phong toả
            </p>
            <p class="dataNum">{{ arrayData[3] }}</p>
          </div>
          <div id="dialog-d24" class="dialog-d2">
            <p class="dataChild">‣ Số ca nhiễm mới trong cộng đồng</p>
            <p class="dataNum">{{ arrayData[4] }}</p>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { getAppDate } from "../js/func";

export default {
  name: "DetailBar",
  props: ["data"],
  data() {
    return {
      dialogmore: false,
      arrayData: [],
    };
  },
  watch: {
    data: function(data) {
      let dataFilter = data.filter(function(e) {
        return e.day === getAppDate(2, 2, "/");
      });

      let temp0 = dataFilter[0].newCase.toLocaleString();
      let temp1 = dataFilter[0].import.toLocaleString();
      let temp2 = dataFilter[0].inCountry.toLocaleString();
      let temp3 = dataFilter[0].blockade.toLocaleString();
      let temp4 = dataFilter[0].community.toLocaleString();

      this.arrayData = [temp0, temp1, temp2, temp3, temp4];
    },
  },
};
</script>

<style scoped>
#icon-showmore:hover {
  cursor: pointer;
  color: #f37c7c;
}

#dialogmore {
  width: 100%;
  height: 180px;
  background-color: rgb(230, 230, 230);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#dialog-d1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  width: 20%;
  height: 90%;
  margin-right: 10px;
}

#dialog-d1:hover {
  background-color: rgb(253, 234, 234);
  cursor: pointer;
  transition: 0.2s ease;
}

#dialog-d11 {
  font-size: 0.9rem;
}

#dialog-d12 {
  font-size: 1.1rem;
  font-weight: 800;
}

#dialog-d2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 77%;
  height: 90%;
  background-color: white;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 0.9rem;
}

.dialog-d2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 0 10px;
}

.dialog-d2:hover {
  background-color: rgb(253, 234, 234);
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s ease;
}

.dataNum {
  font-weight: 700;
}

.dataChild {
  padding-left: 15px;
}

#pp {
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
