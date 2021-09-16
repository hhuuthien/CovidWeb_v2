<template>
  <div id="admin-main">
    <div id="left-main">
      <button @click="get1">Get Vietnam Summary Data</button>
      <button @click="get2">Get Vietnam Province Data</button>
      <button @click="get3">Get Vietnam Province Death Data</button>
      <button @click="get4">Get Vietnam News</button>
      <button @click="get5">Get World Data</button>
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
import { getConfig } from "../js/func";
import { getDataHCKEYtoMap } from "../js/func";

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
          "https://gw.vnexpress.net/ar/get_rule_2?category_id=1004765&limit=10&page=1&data_select=title,share_url,thumbnail_url,lead",
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

      axios
        .request(options)
        .then(function(res) {
          firebase
            .database()
            .ref("api/worldSummary")
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
          let arrayMap = [];
          arrayMap.push(getDataHCKEYtoMap(data, "USA", "us"));
          arrayMap.push(getDataHCKEYtoMap(data, "Ấn Độ", "in"));
          arrayMap.push(getDataHCKEYtoMap(data, "Brazil", "br"));
          arrayMap.push(getDataHCKEYtoMap(data, "UK", "gb"));
          arrayMap.push(getDataHCKEYtoMap(data, "Nga", "ru"));
          arrayMap.push(getDataHCKEYtoMap(data, "Pháp", "fr"));
          arrayMap.push(getDataHCKEYtoMap(data, "Turkey", "tr"));
          arrayMap.push(getDataHCKEYtoMap(data, "Iran", "ir"));
          arrayMap.push(getDataHCKEYtoMap(data, "Argentina", "ar"));
          arrayMap.push(getDataHCKEYtoMap(data, "Colombia", "co"));
          arrayMap.push(getDataHCKEYtoMap(data, "Tây Ban Nha", "es"));
          arrayMap.push(getDataHCKEYtoMap(data, "Italy", "it"));
          arrayMap.push(getDataHCKEYtoMap(data, "Indonesia", "id"));
          arrayMap.push(getDataHCKEYtoMap(data, "Đức", "de"));
          arrayMap.push(getDataHCKEYtoMap(data, "Mexico", "mx"));
          arrayMap.push(getDataHCKEYtoMap(data, "Poland", "pl"));
          arrayMap.push(getDataHCKEYtoMap(data, "South Africa", "za"));
          arrayMap.push(getDataHCKEYtoMap(data, "Ukraine", "ua"));
          arrayMap.push(getDataHCKEYtoMap(data, "Philippines", "ph"));
          arrayMap.push(getDataHCKEYtoMap(data, "Peru", "pe"));
          arrayMap.push(getDataHCKEYtoMap(data, "Malaysia", "my"));
          arrayMap.push(getDataHCKEYtoMap(data, "Netherlands", "nl"));
          arrayMap.push(getDataHCKEYtoMap(data, "Iraq", "iq"));
          arrayMap.push(getDataHCKEYtoMap(data, "Czechia", "cz"));
          arrayMap.push(getDataHCKEYtoMap(data, "Chile", "cl"));
          arrayMap.push(getDataHCKEYtoMap(data, "Nhật Bản", "jp"));
          arrayMap.push(getDataHCKEYtoMap(data, "Canada", "ca"));
          arrayMap.push(getDataHCKEYtoMap(data, "Thái Lan", "th"));
          arrayMap.push(getDataHCKEYtoMap(data, "Bangladesh", "bd"));
          arrayMap.push(getDataHCKEYtoMap(data, "Pakistan", "pk"));
          arrayMap.push(getDataHCKEYtoMap(data, "Belgium", "be"));
          arrayMap.push(getDataHCKEYtoMap(data, "Thụy Điển", "se"));
          arrayMap.push(getDataHCKEYtoMap(data, "Israel", "il"));
          arrayMap.push(getDataHCKEYtoMap(data, "Portugal", "pt"));
          arrayMap.push(getDataHCKEYtoMap(data, "Romania", "ro"));
          arrayMap.push(getDataHCKEYtoMap(data, "Switzerland", "ch"));
          arrayMap.push(getDataHCKEYtoMap(data, "Serbia", "rs"));
          arrayMap.push(getDataHCKEYtoMap(data, "Kazakhstan", "kz"));
          arrayMap.push(getDataHCKEYtoMap(data, "Morocco", "ma"));
          arrayMap.push(getDataHCKEYtoMap(data, "Cuba", "cu"));
          arrayMap.push(getDataHCKEYtoMap(data, "Nepal", "np"));
          arrayMap.push(getDataHCKEYtoMap(data, "Jordan", "jo"));
          arrayMap.push(getDataHCKEYtoMap(data, "Hungary", "hu"));
          arrayMap.push(getDataHCKEYtoMap(data, "Việt Nam", "vn"));
          arrayMap.push(getDataHCKEYtoMap(data, "Tunisia", "tn"));
          arrayMap.push(getDataHCKEYtoMap(data, "Austria", "at"));
          arrayMap.push(getDataHCKEYtoMap(data, "UAE", "ae"));
          arrayMap.push(getDataHCKEYtoMap(data, "Saudi Arabia", "sa"));
          arrayMap.push(getDataHCKEYtoMap(data, "Georgia", "ge"));
          arrayMap.push(getDataHCKEYtoMap(data, "Lebanon", "lb"));
          arrayMap.push(getDataHCKEYtoMap(data, "Greece", "gr"));
          arrayMap.push(getDataHCKEYtoMap(data, "Costa Rica", "cr"));
          arrayMap.push(getDataHCKEYtoMap(data, "Ecuador", "ec"));
          arrayMap.push(getDataHCKEYtoMap(data, "Belarus", "by"));
          arrayMap.push(getDataHCKEYtoMap(data, "Guatemala", "gt"));
          arrayMap.push(getDataHCKEYtoMap(data, "Azerbaijan", "az"));
          arrayMap.push(getDataHCKEYtoMap(data, "Bulgaria", "bg"));
          arrayMap.push(getDataHCKEYtoMap(data, "Sri Lanka", "lk"));
          arrayMap.push(getDataHCKEYtoMap(data, "Bolivia", "bo"));
          arrayMap.push(getDataHCKEYtoMap(data, "Kuwait", "kw"));
          arrayMap.push(getDataHCKEYtoMap(data, "Myanmar", "mm"));
          arrayMap.push(getDataHCKEYtoMap(data, "Paraguay", "py"));
          arrayMap.push(getDataHCKEYtoMap(data, "Panama", "pa"));
          arrayMap.push(getDataHCKEYtoMap(data, "Denmark", "dk"));
          arrayMap.push(getDataHCKEYtoMap(data, "Honduras", "hn"));
          arrayMap.push(getDataHCKEYtoMap(data, "Dominican Republic", "do"));
          arrayMap.push(getDataHCKEYtoMap(data, "Ireland", "ie"));
          arrayMap.push(getDataHCKEYtoMap(data, "Croatia", "hr"));
          arrayMap.push(getDataHCKEYtoMap(data, "Uruguay", "uy"));
          arrayMap.push(getDataHCKEYtoMap(data, "Slovakia", "sk"));
          arrayMap.push(getDataHCKEYtoMap(data, "Moldova", "md"));
          arrayMap.push(getDataHCKEYtoMap(data, "Slovenia", "si"));
          arrayMap.push(getDataHCKEYtoMap(data, "Egypt", "eg"));
          arrayMap.push(getDataHCKEYtoMap(data, "Oman", "om"));
          arrayMap.push(getDataHCKEYtoMap(data, "Lithuania", "lt"));
          arrayMap.push(getDataHCKEYtoMap(data, "Ethiopia", "et"));
          arrayMap.push(getDataHCKEYtoMap(data, "Libya", "ly"));
          arrayMap.push(getDataHCKEYtoMap(data, "Venezuela", "ve"));
          arrayMap.push(getDataHCKEYtoMap(data, "Zambia", "zm"));
          arrayMap.push(
            getDataHCKEYtoMap(data, "Bosnia and Herzegovina", "ba")
          );
          arrayMap.push(getDataHCKEYtoMap(data, "Qatar", "qa"));
          arrayMap.push(getDataHCKEYtoMap(data, "Kenya", "ke"));
          arrayMap.push(getDataHCKEYtoMap(data, "Armenia", "am"));
          arrayMap.push(getDataHCKEYtoMap(data, "Mongolia", "mn"));
          arrayMap.push(getDataHCKEYtoMap(data, "Bahrain", "bh"));
          arrayMap.push(getDataHCKEYtoMap(data, "Hàn Quốc", "kr"));
          arrayMap.push(getDataHCKEYtoMap(data, "Algeria", "dz"));
          arrayMap.push(getDataHCKEYtoMap(data, "Nigeria", "ng"));
          arrayMap.push(getDataHCKEYtoMap(data, "North Macedonia", "mk"));
          arrayMap.push(getDataHCKEYtoMap(data, "Albania", "al"));
          arrayMap.push(getDataHCKEYtoMap(data, "Uzbekistan", "uz"));
          arrayMap.push(getDataHCKEYtoMap(data, "Botswana", "bw"));
          arrayMap.push(getDataHCKEYtoMap(data, "Kyrgyzstan", "kg"));
          arrayMap.push(getDataHCKEYtoMap(data, "Norway", "no"));
          arrayMap.push(getDataHCKEYtoMap(data, "Afghanistan", "af"));
          arrayMap.push(getDataHCKEYtoMap(data, "Mozambique", "mz"));
          arrayMap.push(getDataHCKEYtoMap(data, "Latvia", "lv"));
          arrayMap.push(getDataHCKEYtoMap(data, "Estonia", "ee"));
          arrayMap.push(getDataHCKEYtoMap(data, "Phần Lan", "fi"));
          arrayMap.push(getDataHCKEYtoMap(data, "Zimbabwe", "zw"));
          arrayMap.push(getDataHCKEYtoMap(data, "Namibia", "na"));
          arrayMap.push(getDataHCKEYtoMap(data, "Ghana", "gh"));
          arrayMap.push(getDataHCKEYtoMap(data, "Montenegro", "me"));
          arrayMap.push(getDataHCKEYtoMap(data, "Uganda", "ug"));
          arrayMap.push(getDataHCKEYtoMap(data, "Cyprus", "cy"));
          arrayMap.push(getDataHCKEYtoMap(data, "Campuchia", "kh"));
          arrayMap.push(getDataHCKEYtoMap(data, "El Salvador", "sv"));
          arrayMap.push(getDataHCKEYtoMap(data, "Trung Quốc", "cn"));
          arrayMap.push(getDataHCKEYtoMap(data, "Rwanda", "rw"));
          arrayMap.push(getDataHCKEYtoMap(data, "Cameroon", "cm"));
          arrayMap.push(getDataHCKEYtoMap(data, "Fiji", "fj"));
          arrayMap.push(getDataHCKEYtoMap(data, "Angola", "ao"));
          arrayMap.push(getDataHCKEYtoMap(data, "DRC", "cd"));
          arrayMap.push(getDataHCKEYtoMap(data, "Congo", "cg"));
          arrayMap.push(getDataHCKEYtoMap(data, "Ivory Coast", "ci"));
          arrayMap.push(getDataHCKEYtoMap(data, "Malawi", "mw"));
          arrayMap.push(getDataHCKEYtoMap(data, "Singapore", "sg"));
          arrayMap.push(getDataHCKEYtoMap(data, "Senegal", "sn"));
          arrayMap.push(getDataHCKEYtoMap(data, "Luxembourg", "lu"));
          arrayMap.push(getDataHCKEYtoMap(data, "Australia", "au"));
          arrayMap.push(getDataHCKEYtoMap(data, "Jamaica", "jm"));
          arrayMap.push(getDataHCKEYtoMap(data, "Maldives", "mv"));
          arrayMap.push(getDataHCKEYtoMap(data, "Trinidad and Tobago", "tt"));
          arrayMap.push(getDataHCKEYtoMap(data, "Madagascar", "mg"));
          arrayMap.push(getDataHCKEYtoMap(data, "Sudan", "sd"));
          arrayMap.push(getDataHCKEYtoMap(data, "Malta", "mt"));
          arrayMap.push(getDataHCKEYtoMap(data, "Cabo Verde", "cv"));
          arrayMap.push(getDataHCKEYtoMap(data, "Mauritania", "mr"));
          arrayMap.push(getDataHCKEYtoMap(data, "Suriname", "sr"));
          arrayMap.push(getDataHCKEYtoMap(data, "Guinea", "gn"));
          arrayMap.push(getDataHCKEYtoMap(data, "Syria", "sy"));
          arrayMap.push(getDataHCKEYtoMap(data, "Guyana", "gy"));
          arrayMap.push(getDataHCKEYtoMap(data, "Gabon", "ga"));
          arrayMap.push(getDataHCKEYtoMap(data, "Togo", "tg"));
          arrayMap.push(getDataHCKEYtoMap(data, "Benin", "bj"));
          arrayMap.push(getDataHCKEYtoMap(data, "Haiti", "ht"));
          arrayMap.push(getDataHCKEYtoMap(data, "Seychelles", "sc"));
          arrayMap.push(getDataHCKEYtoMap(data, "Bahamas", "bs"));
          arrayMap.push(getDataHCKEYtoMap(data, "Timor-Leste", "tl"));
          arrayMap.push(getDataHCKEYtoMap(data, "Somalia", "so"));
          arrayMap.push(getDataHCKEYtoMap(data, "Papua New Guinea", "pg"));
          arrayMap.push(getDataHCKEYtoMap(data, "Belize", "bz"));
          arrayMap.push(getDataHCKEYtoMap(data, "Laos", "la"));
          arrayMap.push(getDataHCKEYtoMap(data, "Tajikistan", "tj"));
          arrayMap.push(getDataHCKEYtoMap(data, "Đài Loan", "tw"));
          arrayMap.push(getDataHCKEYtoMap(data, "Andorra", "ad"));
          arrayMap.push(getDataHCKEYtoMap(data, "Mali", "ml"));
          arrayMap.push(getDataHCKEYtoMap(data, "Lesotho", "ls"));
          arrayMap.push(getDataHCKEYtoMap(data, "Burundi", "bi"));
          arrayMap.push(getDataHCKEYtoMap(data, "Burkina Faso", "bf"));
          arrayMap.push(getDataHCKEYtoMap(data, "Mauritius", "mu"));
          arrayMap.push(getDataHCKEYtoMap(data, "Nicaragua", "ni"));
          arrayMap.push(getDataHCKEYtoMap(data, "Djibouti", "dj"));
          arrayMap.push(getDataHCKEYtoMap(data, "South Sudan", "ss"));
          arrayMap.push(getDataHCKEYtoMap(data, "CAR", "cf"));
          arrayMap.push(getDataHCKEYtoMap(data, "Iceland", "is"));
          arrayMap.push(getDataHCKEYtoMap(data, "Equatorial Guinea", "gq"));
          arrayMap.push(getDataHCKEYtoMap(data, "Saint Lucia", "lc"));
          arrayMap.push(getDataHCKEYtoMap(data, "Gambia", "gm"));
          arrayMap.push(getDataHCKEYtoMap(data, "Yemen", "ye"));
          arrayMap.push(getDataHCKEYtoMap(data, "Eritrea", "er"));
          arrayMap.push(getDataHCKEYtoMap(data, "Chad", "td"));
          arrayMap.push(getDataHCKEYtoMap(data, "San Marino", "sm"));
          arrayMap.push(getDataHCKEYtoMap(data, "Liberia", "lr"));
          arrayMap.push(getDataHCKEYtoMap(data, "Niger", "ne"));
          arrayMap.push(getDataHCKEYtoMap(data, "Barbados", "bb"));
          arrayMap.push(getDataHCKEYtoMap(data, "Sierra Leone", "sl"));
          arrayMap.push(getDataHCKEYtoMap(data, "Monaco", "mc"));
          arrayMap.push(getDataHCKEYtoMap(data, "Liechtenstein", "li"));
          arrayMap.push(getDataHCKEYtoMap(data, "New Zealand", "nz"));
          arrayMap.push(getDataHCKEYtoMap(data, "Comoros", "km"));
          arrayMap.push(getDataHCKEYtoMap(data, "Brunei", "bn"));
          arrayMap.push(getDataHCKEYtoMap(data, "Antigua and Barbuda", "ag"));
          arrayMap.push(
            getDataHCKEYtoMap(data, "St. Vincent Grenadines", "vc")
          );
          arrayMap.push(getDataHCKEYtoMap(data, "Bhutan", "bt"));
          arrayMap.push(getDataHCKEYtoMap(data, "Dominica", "dm"));
          arrayMap.push(
            getDataHCKEYtoMap(data, "British Virgin Islands", "vi")
          );
          arrayMap.push(getDataHCKEYtoMap(data, "Grenada", "gd"));
          arrayMap.push(getDataHCKEYtoMap(data, "Sao Tome and Principe", "st"));
          arrayMap.push(getDataHCKEYtoMap(data, "Faeroe Islands", "fo"));
          arrayMap.push(getDataHCKEYtoMap(data, "Tanzania", "tz"));
          arrayMap.push(getDataHCKEYtoMap(data, "Saint Kitts and Nevis", "kn"));
          arrayMap.push(getDataHCKEYtoMap(data, "Micronesia", "fm"));
          arrayMap.push(getDataHCKEYtoMap(data, "Samoa", "as"));
          arrayMap.push(getDataHCKEYtoMap(data, "Palau", "pw"));
          arrayMap.push(getDataHCKEYtoMap(data, "Marshall Islands", "mh"));
          arrayMap.push(getDataHCKEYtoMap(data, "Vanuatu", "vu"));
          arrayMap.push(getDataHCKEYtoMap(data, "Western Sahara", "eh"));
          arrayMap.push(getDataHCKEYtoMap(data, "Solomon Islands", "sb"));
          arrayMap.push(getDataHCKEYtoMap(data, "Vatican City", "va"));
          arrayMap.push(getDataHCKEYtoMap(data, "Greenland", "gl"));
          arrayMap.push({
            "hc-key": "tm",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "kp",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "sx",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "jk",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "kv",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "we",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "gz",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "nc",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "sz",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "gw",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "kn",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "cnm",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "to",
            value: 0,
          });
          arrayMap.push({
            "hc-key": "pr",
            value: 0,
          });

          firebase
            .database()
            .ref("api/worldMap")
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
