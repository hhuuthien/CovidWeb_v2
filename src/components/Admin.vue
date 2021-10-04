<template>
  <div id="admin-main">
    <div id="left-main">
      <button @click="get1">Get Vietnam Summary Data</button>
      <button @click="get2">Get Vietnam Province Data</button>
      <button @click="get3">Get Vietnam Province Death Data</button>
      <button @click="get4">Get Vietnam News</button>
      <button @click="get5">Get World Data</button>
      <button @click="get6">Get Vaccine Data</button>
      <button @click="get7">Get Vaccine To Vietnam</button>
    </div>
    <div id="right-main">
      <p id="console">Waiting ...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase/app";
import "firebase/database";
import csv2json from "csvjson-csv2json";
import { adminGet5Function, getConfig } from "../js/func";

export default {
  name: "Admin",
  mounted() {
    if (!firebase.apps.length) {
      firebase.initializeApp(getConfig());
    } else {
      firebase.app();
    }
  },
  methods: {
    get1() {
      let cText = document.getElementById("console").innerHTML;
      cText = cText + "<br>Function 1 (Get Vietnam Summary Data): STARTED";
      document.getElementById("console").innerHTML = cText;

      const options = {
        method: "GET",
        url:
          "https://vnexpress.net/microservice/sheet/type/covid19_2021_by_day",
      };

      axios
        .request(options)
        .then(function(res) {
          const myjson = csv2json(res.data.toString(), {
            parseNumbers: true,
            parseJSON: true,
          });

          let array = new Array();
          myjson.forEach((element) => {
            let data = {
              day: element["NGÀY"],
              inCountry: element["CỘNG ĐỒNG"],
              fund: element["QUỸ VACCINE (tỷ VNĐ)"],
              blockade: element.blockade,
              city: element.city_by_day,
              community: element.community,
              import: element.imported,
              newCase: element.new_cases,
              newActive: element.new_active,
              newDeath: element.new_deaths,
              newRecover: element.new_recovered,
              totalActive: element.total_active,
              totalCase: element.total_cases_2020,
              totalDeath: element.total_deaths_2020,
              totalRecover: element.total_recovered_2020_25,
              icu: element.ICU_52,
              ecmo: element.ECMO,
            };
            array.push(data);
          });

          // csv --> json (transpose)
          // do not transpose here because there will be an error when uploading to Firebase
          // solution: upload raw data (res.data), then transpose it when downloading or using
          // const myjson2 = csv2json(res.data.toString(), {
          //   parseNumbers: true,
          //   parseJSON: true,
          //   transpose: true,
          // });

          firebase
            .database()
            .ref("api/vietnamSummary")
            .set(array)
            .then(function() {
              let cText = document.getElementById("console").innerHTML;
              cText = cText + "<br>Function 1 (Get Vietnam Summary Data): DONE";
              document.getElementById("console").innerHTML = cText;
            })
            .catch(function(error) {
              let cText = document.getElementById("console").innerHTML;
              cText =
                cText +
                "<br>Function 1 (Get Vietnam Summary Data): ERROR<br>" +
                error;
              document.getElementById("console").innerHTML = cText;
            });

          firebase
            .database()
            .ref("api/vietnamChart")
            .set(res.data.toString())
            .then(function() {
              let cText = document.getElementById("console").innerHTML;
              cText = cText + "<br>Function 1 (Get Vietnam Summary Data): DONE";
              document.getElementById("console").innerHTML = cText;
            })
            .catch(function(error) {
              let cText = document.getElementById("console").innerHTML;
              cText =
                cText +
                "<br>Function 1 (Get Vietnam Summary Data): ERROR<br>" +
                error;
              document.getElementById("console").innerHTML = cText;
            });
        })
        .catch(function(error) {
          let cText = document.getElementById("console").innerHTML;
          cText =
            cText +
            "<br>Function 1 (Get Vietnam Summary Data): ERROR<br>" +
            error;
          document.getElementById("console").innerHTML = cText;
        });
    },
    get2() {
      let cText = document.getElementById("console").innerHTML;
      cText = cText + "<br>Function 2 (Get Vietnam Province Data): STARTED";
      document.getElementById("console").innerHTML = cText;

      const requestOne = axios.get(
        "https://vnexpress.net/microservice/sheet/type/covid19_2021_by_total"
      );
      const requestTwo = axios.get(
        "https://vnexpress.net/microservice/sheet/type/covid19_2021_by_location"
      );

      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0].data;
            const responseTwo = responses[1].data;

            let validOne = responseOne
              .toString()
              .replace(`Châu","","","","","",""`, `Châu"`);
            let validTwo = responseTwo
              .toString()
              .replace(`Châu","","","","","","",""`, `Châu"`);

            const myjsonOne = csv2json(validOne, {
              parseNumbers: true,
              parseJSON: true,
            });
            const myjsonTwo = csv2json(validTwo, {
              parseNumbers: true,
              parseJSON: true,
            });

            firebase
              .database()
              .ref("api/vietnamProvince/total")
              .set(myjsonOne)
              .then(function() {
                let cText = document.getElementById("console").innerHTML;
                cText =
                  cText + "<br>Function 2 (Get Vietnam Province Data): DONE";
                document.getElementById("console").innerHTML = cText;
              })
              .catch(function(error) {
                let cText = document.getElementById("console").innerHTML;
                cText =
                  cText +
                  "<br>Function 2 (Get Vietnam Province Data): ERROR<br>" +
                  error;
                document.getElementById("console").innerHTML = cText;
              });

            firebase
              .database()
              .ref("api/vietnamProvince/new")
              .set(myjsonTwo)
              .then(function() {
                let cText = document.getElementById("console").innerHTML;
                cText =
                  cText + "<br>Function 2 (Get Vietnam Province Data): DONE";
                document.getElementById("console").innerHTML = cText;
              })
              .catch(function(error) {
                let cText = document.getElementById("console").innerHTML;
                cText =
                  cText +
                  "<br>Function 2 (Get Vietnam Province Data): ERROR<br>" +
                  error;
                document.getElementById("console").innerHTML = cText;
              });

            firebase
              .database()
              .ref("api/vietnamProvince/transpose")
              .set({
                validOne: validOne,
                validTwo: validTwo,
              })
              .then(function() {
                let cText = document.getElementById("console").innerHTML;
                cText =
                  cText + "<br>Function 2 (Get Vietnam Province Data): DONE";
                document.getElementById("console").innerHTML = cText;
              })
              .catch(function(error) {
                let cText = document.getElementById("console").innerHTML;
                cText =
                  cText +
                  "<br>Function 2 (Get Vietnam Province Data): ERROR<br>" +
                  error;
                document.getElementById("console").innerHTML = cText;
              });
          })
        )
        .catch((error) => {
          let cText = document.getElementById("console").innerHTML;
          cText =
            cText +
            "<br>Function 2 (Get Vietnam Province Data): ERROR<br>" +
            error;
          document.getElementById("console").innerHTML = cText;
        });
    },
    get3() {
      let cText = document.getElementById("console").innerHTML;
      cText =
        cText + "<br>Function 3 (Get Vietnam Province Death Data): STARTED";
      document.getElementById("console").innerHTML = cText;

      const options = {
        method: "GET",
        url:
          "https://vnexpress.net/microservice/sheet/type/covid19_2021_by_map",
      };

      axios
        .request(options)
        .then(function(res) {
          const myjson = csv2json(res.data.toString(), {
            parseNumbers: true,
            parseJSON: true,
          });

          let array = new Array();
          myjson.forEach((element) => {
            let data = {
              code: element.CODE,
              pop: element["DÂN SỐ (người)"],
              key: element.KEY,
              name1: element["TỈNH THÀNH"],
              name2: element["TỈNH THÀNH BYT"],
              name3: element.ENGLISH,
              deathAll: element["TỔNG VONG 21"],
              deathToday: element["TỬ VONG THEO NGÀY 20"],
              deathYesterday: element["TỬ VONG HÔM QUA 24"],
            };
            array.push(data);
          });

          firebase
            .database()
            .ref("api/vietnamProvince/death")
            .set(array)
            .then(function() {
              let cText = document.getElementById("console").innerHTML;
              cText =
                cText +
                "<br>Function 3 (Get Vietnam Province Death Data): DONE";
              document.getElementById("console").innerHTML = cText;
            })
            .catch(function(error) {
              let cText = document.getElementById("console").innerHTML;
              cText =
                cText +
                "<br>Function 3 (Get Vietnam Province Death Data): ERROR<br>" +
                error;
              document.getElementById("console").innerHTML = cText;
            });
        })
        .catch(function(error) {
          let cText = document.getElementById("console").innerHTML;
          cText =
            cText +
            "<br>Function 3 (Get Vietnam Province Death Data): ERROR<br>" +
            error;
          document.getElementById("console").innerHTML = cText;
        });
    },
    get4() {
      let cText = document.getElementById("console").innerHTML;
      cText = cText + "<br>Function 4 (Get Vietnam News): STARTED";
      document.getElementById("console").innerHTML = cText;

      const options = {
        method: "GET",
        url:
          "https://gw.vnexpress.net/ar/get_rule_2?category_id=1004765&limit=50&page=1&data_select=title,share_url,thumbnail_url,lead",
      };

      axios
        .request(options)
        .then(function(res) {
          firebase
            .database()
            .ref("api/vietnamNews")
            .set(res.data)
            .then(function() {
              let cText = document.getElementById("console").innerHTML;
              cText = cText + "<br>Function 4 (Get Vietnam News): DONE";
              document.getElementById("console").innerHTML = cText;
            })
            .catch(function(error) {
              let cText = document.getElementById("console").innerHTML;
              cText =
                cText + "<br>Function 4 (Get Vietnam News): ERROR<br>" + error;
              document.getElementById("console").innerHTML = cText;
            });
        })
        .catch(function(error) {
          let cText = document.getElementById("console").innerHTML;
          cText =
            cText + "<br>Function 4 (Get Vietnam News): ERROR<br>" + error;
          document.getElementById("console").innerHTML = cText;
        });
    },
    get5() {
      let cText = document.getElementById("console").innerHTML;
      cText = cText + "<br>Function 5 (Get World Data): STARTED";
      document.getElementById("console").innerHTML = cText;

      const options = {
        method: "GET",
        url: "https://gw.vnexpress.net/cr/?name=world_coronavirus",
      };

      let date = new Date();
      let x =
        date.getFullYear() + "i" + (date.getMonth() + 1) + "i" + date.getDate();
      let y1 = date.getHours();
      if (y1.toString().length < 2) {
        y1 = "0" + y1;
      }
      let y2 = date.getMinutes();
      if (y2.toString().length < 2) {
        y2 = "0" + y2;
      }
      let y = y1 + "" + y2;

      axios
        .request(options)
        .then(function(res) {
          firebase
            .database()
            .ref("apiWorld")
            .child(x)
            .child(y)
            .child("worldSummary")
            .set(res.data.data)
            .then(function() {
              let cText = document.getElementById("console").innerHTML;
              cText = cText + "<br>Function 5 (Get World Data): DONE";
              document.getElementById("console").innerHTML = cText;
            })
            .catch(function(error) {
              let cText = document.getElementById("console").innerHTML;
              cText =
                cText + "<br>Function 5 (Get World Data): ERROR<br>" + error;
              document.getElementById("console").innerHTML = cText;
            });

          let data = res.data.data.data[0].table_country;
          let arrayMap = adminGet5Function(data);

          firebase
            .database()
            .ref("apiWorld")
            .child(x)
            .child(y)
            .child("worldMap")
            .set(arrayMap)
            .then(function() {
              let cText = document.getElementById("console").innerHTML;
              cText = cText + "<br>Function 5 (Get World Data): DONE";
              document.getElementById("console").innerHTML = cText;
            })
            .catch(function(error) {
              let cText = document.getElementById("console").innerHTML;
              cText =
                cText + "<br>Function 5 (Get World Data): ERROR<br>" + error;
              document.getElementById("console").innerHTML = cText;
            });
        })
        .catch(function(error) {
          let cText = document.getElementById("console").innerHTML;
          cText = cText + "<br>Function 5 (Get World Data): ERROR<br>" + error;
          document.getElementById("console").innerHTML = cText;
        });
    },
    get6() {
      let cText = document.getElementById("console").innerHTML;
      cText = cText + "<br>Function 6 (Get Vaccine Data): STARTED";
      document.getElementById("console").innerHTML = cText;

      const options = {
        method: "GET",
        url:
          "https://vnexpress.net/microservice/sheet/type/vaccine_data_vietnam",
      };

      axios
        .request(options)
        .then(function(res) {
          const myjson = csv2json(res.data.toString(), {
            parseNumbers: true,
            parseJSON: true,
          });

          let array = new Array();
          myjson.forEach((element) => {
            let data = {
              day: element["Ngày"],
              people_t1: element["Số người tiêm chưa đủ mũi"],
              people_t1_day: element["Số người tiêm chưa đủ mũi theo ngày"],
              people_t2: element["Số người tiêm đủ mũi"],
              people_t2_day: element["Số người tiêm đủ mũi theo ngày"],
              totalDose: element["Tổng số mũi đã tiêm"],
              totalPeople: element["Tổng số người đã tiêm"],
              totalPeople_day: element["Tổng số người đã tiêm theo ngày"],
            };
            array.push(data);
          });

          firebase
            .database()
            .ref("apiVaccine/vaccineSummary")
            .set(array)
            .then(function() {
              let cText = document.getElementById("console").innerHTML;
              cText = cText + "<br>Function 6 (Get Vaccine Data): DONE";
              document.getElementById("console").innerHTML = cText;
            })
            .catch(function(error) {
              let cText = document.getElementById("console").innerHTML;
              cText =
                cText + "<br>Function 6 (Get Vaccine Data): ERROR<br>" + error;
              document.getElementById("console").innerHTML = cText;
            });
        })
        .catch(function(error) {
          let cText = document.getElementById("console").innerHTML;
          cText =
            cText + "<br>Function 6 (Get Vaccine Data): ERROR<br>" + error;
          document.getElementById("console").innerHTML = cText;
        });
    },
    get7() {
      let cText = document.getElementById("console").innerHTML;
      cText = cText + "<br>Function 7 (Get Vaccine To Vietnam): STARTED";
      document.getElementById("console").innerHTML = cText;

      const options = {
        method: "GET",
        url: "https://vnexpress.net/microservice/sheet/type/vaccine_to_vietnam",
      };

      axios
        .request(options)
        .then(function(res) {
          const myjson = csv2json(res.data.toString(), {
            parseNumbers: true,
            parseJSON: true,
          });

          let array = new Array();
          myjson.some((element) => {
            let data = {
              day: element["Ngày"],
              month: element["Ngày"].split("/"),
              astrazeneca: element.AstraZeneca,
              covaxin: element.Covaxin,
              moderna: element.Moderna,
              nanocovax: element.Nanocovax,
              pfizer: element.Pfilzer,
              sinopharm: element.Sinopharm,
              sinovac: element.Sinovac,
              sputnikv: element["Sputnik V"],
              all: element["Số liều đã về"],
            };
            array.push(data);
          });

          firebase
            .database()
            .ref("apiVaccine/vaccineToVietnam")
            .set(array)
            .then(function() {
              let cText = document.getElementById("console").innerHTML;
              cText = cText + "<br>Function 7 (Get Vaccine To Vietnam): DONE";
              document.getElementById("console").innerHTML = cText;
            })
            .catch(function(error) {
              let cText = document.getElementById("console").innerHTML;
              cText =
                cText +
                "<br>Function 7 (Get Vaccine To Vietnam): ERROR<br>" +
                error;
              document.getElementById("console").innerHTML = cText;
            });
        })
        .catch(function(error) {
          let cText = document.getElementById("console").innerHTML;
          cText =
            cText +
            "<br>Function 7 (Get Vaccine To Vietnam): ERROR<br>" +
            error;
          document.getElementById("console").innerHTML = cText;
        });
    },
  },
};
</script>

<style scoped>
#admin-main {
  font-family: "Nunito", sans-serif;
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

#left-main {
  width: 30%;
  padding: 10px;
}

#left-main button {
  padding: 10px;
  display: block;
}

#right-main {
  background-color: rgb(49, 49, 49);
  width: 70%;
  height: 100%;
  color: white;
  padding: 10px;
}
</style>
