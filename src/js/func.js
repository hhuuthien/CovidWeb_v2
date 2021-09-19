const getConfig = () => {
  return {
    apiKey: "AIzaSyAdNpXA6W8PpSGKbsWXZB4t5gBTXKpeMho",
    authDomain: "covid-inf.firebaseapp.com",
    databaseURL: "https://covid-inf-default-rtdb.firebaseio.com",
    projectId: "covid-inf",
    storageBucket: "covid-inf.appspot.com",
    messagingSenderId: "189610331880",
    appId: "1:189610331880:web:e9eba067c39fc38ff6435d",
  };
};

const getAppDate = (real, back, slash) => {
  //back: 1-return date, 2-return string
  //real: 1-return real date, 2-return yesterday if today's hour < 11
  let a = new Date();
  switch (real) {
    case 1:
      if (back === 1) {
        return a;
      } else if (back === 2) {
        return a.getDate() + slash + (a.getMonth() + 1);
      }
      break;

    case 2:
      if (a.getHours() < 18) {
        a.setDate(a.getDate() - 1);
      }
      if (back === 1) {
        return a;
      } else if (back === 2) {
        return a.getDate() + slash + (a.getMonth() + 1);
      }
      break;
  }
};

const objectToArrayArray = (object) => {
  // province: new, total
  let array = Object.entries(object);
  let arrayFilter = array.filter(function(e) {
    return e[0] !== "Ngày";
  });
  return arrayFilter;
};

const objectToArrayArray2 = (object) => {
  // province: chart Summary
  let array = Object.entries(object);
  let arrayResultData = [];
  let arrayResultCategory = [];
  for (let index = 1; index < array.length; index++) {
    arrayResultData.push(array[index][1]);
    arrayResultCategory.push(array[index][0]);
    if (array[index][0] === getAppDate(2, 2, "/")) break;
  }
  return { arrayResultData, arrayResultCategory };
};

const objectToArrayArray3 = (object) => {
  // chart3
  let array = Object.entries(object);
  let arrayFilter = array.filter(function(e) {
    return e[0] !== "Ngày" && e[0] !== "";
  });

  let arrayResultData = [];
  let arrayResultCategory = [];
  for (let index = 0; index < arrayFilter.length; index++) {
    if (arrayFilter[index][1] === "") arrayResultData.push(0);
    else arrayResultData.push(arrayFilter[index][1]);
    arrayResultCategory.push(arrayFilter[index][0]);
    if (arrayFilter[index][0] === getAppDate(2, 2, "/")) break;
  }
  return { arrayResultData, arrayResultCategory };
};

const mergeArray = (arr1, arr2, arrayDeath) => {
  let merge = new Array();
  for (let index = 0; index < arr1.length; index++) {
    let obj = findDeathOfProvince(arr1[index][0], arrayDeath);
    let arrItem = [];
    let index1data;
    if (arr1[index][1] === "") {
      index1data = 0;
    } else {
      index1data = arr1[index][1];
    }
    let index2data;
    if (obj.deathToday === "") {
      index2data = 0;
    } else {
      index2data = obj.deathToday;
    }
    arrItem = [
      arr1[index][0],
      index1data,
      arr2[index][1],
      stringToSlug(arr1[index][0]),
      index2data,
      obj.deathAll,
    ];
    merge.push(arrItem);
  }
  return merge;
};

const stringToSlug = (str) => {
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịýỳỹỵỷ",
    to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }
  return str.toLowerCase().trim();
};

const findDeathOfProvince = (province, array) => {
  let result;
  array.forEach((element) => {
    if (element.name1 === province) {
      result = element;
    }
  });
  return result;
};

const convertToHCKey = (name) => {
  let result = name;
  switch (name) {
    case "Quảng Ninh":
      result = "vn-qn";
      break;
    case "Khánh Hòa":
      result = "vn-kh";
      break;
    case "Tiền Giang":
      result = "vn-tg";
      break;
    case "Bà Rịa - Vũng Tàu":
      result = "vn-bv";
      break;
    case "Bình Thuận":
      result = "vn-bu";
      break;
    case "TP HCM":
      result = "vn-hc";
      break;
    case "Bến Tre":
      result = "vn-br";
      break;
    case "Sóc Trăng":
      result = "vn-st";
      break;
    case "Phú Thọ":
      result = "vn-pt";
      break;
    case "Yên Bái":
      result = "vn-yb";
      break;
    case "Hải Dương":
      result = "vn-hd";
      break;
    case "Bắc Ninh":
      result = "vn-bn";
      break;
    case "Ninh Bình":
      result = "vn-nb";
      break;
    case "Hà Nam":
      result = "vn-hm";
      break;
    case "Hòa Bình":
      result = "vn-ho";
      break;
    case "Vĩnh Phúc":
      result = "vn-vc";
      break;
    case "Bắc Giang":
      result = "vn-bg";
      break;
    case "Thái Bình":
      result = "vn-tb";
      break;
    case "Lâm Đồng":
      result = "vn-ld";
      break;
    case "Bình Phước":
      result = "vn-bp";
      break;
    case "Phú Yên":
      result = "vn-py";
      break;
    case "Bình Định":
      result = "vn-bd";
      break;
    case "Gia Lai":
      result = "vn-724";
      break;
    case "Quảng Ngãi":
      result = "vn-qg";
      break;
    case "Đồng Tháp":
      result = "vn-dt";
      break;
    case "Long An":
      result = "vn-la";
      break;
    case "Hải Phòng":
      result = "vn-3623";
      break;
    case "Bạc Liêu":
      result = "vn-bl";
      break;
    case "Vĩnh Long":
      result = "vn-vl";
      break;
    case "Thái Nguyên":
      result = "vn-ty";
      break;
    case "Sơn La":
      result = "vn-311";
      break;
    case "Hà Giang":
      result = "vn-hg";
      break;
    case "Nam Định":
      result = "vn-nd";
      break;
    case "Nghệ An":
      result = "vn-na";
      break;
    case "Quảng Bình":
      result = "vn-qb";
      break;
    case "Ninh Thuận":
      result = "vn-nt";
      break;
    case "Đăk Lăk":
      result = "vn-723";
      break;
    case "Kon Tum":
      result = "vn-299";
      break;
    case "Quảng Nam":
      result = "vn-300";
      break;
    case "Quảng Trị":
      result = "vn-qt";
      break;
    case "An Giang":
      result = "vn-ag";
      break;
    case "Cà Mau":
      result = "vn-cm";
      break;
    case "Kiên Giang":
      result = "vn-kg";
      break;
    case "Điện Biên":
      result = "vn-db";
      break;
    case "Lạng Sơn":
      result = "vn-ls";
      break;
    case "Thanh Hóa":
      result = "vn-th";
      break;
    case "Tuyên Quang":
      result = "vn-tq";
      break;
    case "Bình Dương":
      result = "vn-bi";
      break;
    case "Cần Thơ":
      result = "vn-333";
      break;
    case "Bắc Kạn":
      result = "vn-307";
      break;
    case "Hà Nội":
      result = "vn-318";
      break;
    case "Hà Tĩnh":
      result = "vn-328";
      break;
    case "Hưng Yên":
      result = "vn-317";
      break;
    case "Hậu Giang":
      result = "vn-337";
      break;
    case "Lai Châu":
      result = "vn-li";
      break;
    case "Lào Cai":
      result = "vn-lo";
      break;
    case "Trà Vinh":
      result = "vn-tv";
      break;
    case "Tây Ninh":
      result = "vn-tn";
      break;
    case "Đà Nẵng":
      result = "vn-da";
      break;
    case "Đồng Nai":
      result = "vn-331";
      break;
    case "Thừa Thiên Huế":
      result = "vn-tt";
      break;
    case "Đăk Nông":
      result = "vn-6365";
      break;
    case "Cao Bằng":
      result = "vn-cb";
      break;
    default:
      break;
  }
  return result;
};

const shuffleArray = (array) => {
  var currentIndex = array.length;
  var randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const beautifyWorldData = (array) => {
  let filterArray = array.filter(function(element) {
    return (
      element.country !== "Châu Á" &&
      element.country !== "Châu Âu" &&
      element.country !== "Châu Phi" &&
      element.country !== "Bắc Mỹ" &&
      element.country !== "Nam Mỹ" &&
      element.country !== "Oceania"
    );
  });

  let resultArray = [];

  filterArray.forEach((element) => {
    let temp = {
      country: element.country,
      country_vn: element.country_vn,
      new_cases: element.new_cases,
      new_deaths: element.new_deaths,
      total_cases: element.total_cases,
      total_deaths: element.total_deaths,
      total_recovered: element.total_recovered,
      continent: findContinentOfCountry(element.country),
    };
    resultArray.push(temp);
  });

  return resultArray;
};

const getDataHCKEYtoMap = (array, countryName, hckey) => {
  let result = null;
  array.some((element) => {
    if (element.country === countryName) {
      result = {
        "hc-key": hckey,
        value: Number(element.total_cases.replaceAll(".", "")),
      };
      return true;
    }
  });
  return result;
};

const findContinentOfCountry = (name) => {
  let continent = "";
  switch (name) {
    case "USA": {
      continent = "bmy";
      break;
    }
    case "Ấn Độ": {
      continent = "a";
      break;
    }
    case "Brazil": {
      continent = "nmy";
      break;
    }
    case "UK": {
      continent = "au";
      break;
    }
    case "Nga": {
      continent = "au";
      break;
    }
    case "Pháp": {
      continent = "au";
      break;
    }
    case "Turkey": {
      continent = "a";
      break;
    }
    case "Iran": {
      continent = "a";
      break;
    }
    case "Argentina": {
      continent = "nmy";
      break;
    }
    case "Colombia": {
      continent = "nmy";
      break;
    }
    case "Tây Ban Nha": {
      continent = "au";
      break;
    }
    case "Italy": {
      continent = "au";
      break;
    }
    case "Indonesia": {
      continent = "a";
      break;
    }
    case "Đức": {
      continent = "au";
      break;
    }
    case "Mexico": {
      continent = "bmy";
      break;
    }
    case "Poland": {
      continent = "au";
      break;
    }
    case "South Africa": {
      continent = "phi";
      break;
    }
    case "Ukraine": {
      continent = "au";
      break;
    }
    case "Philippines": {
      continent = "a";
      break;
    }
    case "Peru": {
      continent = "nmy";
      break;
    }
    case "Malaysia": {
      continent = "a";
      break;
    }
    case "Netherlands": {
      continent = "au";
      break;
    }
    case "Iraq": {
      continent = "a";
      break;
    }
    case "Czechia": {
      continent = "au";
      break;
    }
    case "Chile": {
      continent = "nmy";
      break;
    }
    case "Nhật Bản": {
      continent = "a";
      break;
    }
    case "Canada": {
      continent = "bmy";
      break;
    }
    case "Bangladesh": {
      continent = "a";
      break;
    }
    case "Thái Lan": {
      continent = "a";
      break;
    }
    case "Belgium": {
      continent = "au";
      break;
    }
    case "Pakistan": {
      continent = "a";
      break;
    }
    case "Israel": {
      continent = "a";
      break;
    }
    case "Thụy Điển": {
      continent = "au";
      break;
    }
    case "Romania": {
      continent = "au";
      break;
    }
    case "Portugal": {
      continent = "au";
      break;
    }
    case "Morocco": {
      continent = "phi";
      break;
    }
    case "Kazakhstan": {
      continent = "a";
      break;
    }
    case "Serbia": {
      continent = "au";
      break;
    }
    case "Switzerland": {
      continent = "au";
      break;
    }
    case "Hungary": {
      continent = "au";
      break;
    }
    case "Jordan": {
      continent = "a";
      break;
    }
    case "Nepal": {
      continent = "a";
      break;
    }
    case "Cuba": {
      continent = "bmy";
      break;
    }
    case "UAE": {
      continent = "a";
      break;
    }
    case "Austria": {
      continent = "au";
      break;
    }
    case "Tunisia": {
      continent = "phi";
      break;
    }
    case "Việt Nam": {
      continent = "a";
      break;
    }
    case "Greece": {
      continent = "au";
      break;
    }
    case "Lebanon": {
      continent = "a";
      break;
    }
    case "Georgia": {
      continent = "a";
      break;
    }
    case "Saudi Arabia": {
      continent = "a";
      break;
    }
    case "Guatemala": {
      continent = "bmy";
      break;
    }
    case "Belarus": {
      continent = "au";
      break;
    }
    case "Ecuador": {
      continent = "nmy";
      break;
    }
    case "Costa Rica": {
      continent = "bmy";
      break;
    }
    case "Bolivia": {
      continent = "nmy";
      break;
    }
    case "Sri Lanka": {
      continent = "a";
      break;
    }
    case "Bulgaria": {
      continent = "au";
      break;
    }
    case "Azerbaijan": {
      continent = "a";
      break;
    }
    case "Panama": {
      continent = "bmy";
      break;
    }
    case "Paraguay": {
      continent = "nmy";
      break;
    }
    case "Myanmar": {
      continent = "a";
      break;
    }
    case "Kuwait": {
      continent = "a";
      break;
    }
    case "Slovakia": {
      continent = "au";
      break;
    }
    case "Uruguay": {
      continent = "nmy";
      break;
    }
    case "Croatia": {
      continent = "au";
      break;
    }
    case "Palestine": {
      continent = "a";
      break;
    }
    case "Ireland": {
      continent = "au";
      break;
    }
    case "Dominican Republic": {
      continent = "bmy";
      break;
    }
    case "Honduras": {
      continent = "bmy";
      break;
    }
    case "Denmark": {
      continent = "au";
      break;
    }
    case "Venezuela": {
      continent = "nmy";
      break;
    }
    case "Libya": {
      continent = "phi";
      break;
    }
    case "Ethiopia": {
      continent = "phi";
      break;
    }
    case "Lithuania": {
      continent = "au";
      break;
    }
    case "Oman": {
      continent = "a";
      break;
    }
    case "Egypt": {
      continent = "phi";
      break;
    }
    case "Slovenia": {
      continent = "au";
      break;
    }
    case "Moldova": {
      continent = "au";
      break;
    }
    case "Hàn Quốc": {
      continent = "a";
      break;
    }
    case "Bahrain": {
      continent = "a";
      break;
    }
    case "Mongolia": {
      continent = "a";
      break;
    }
    case "Armenia": {
      continent = "a";
      break;
    }
    case "Kenya": {
      continent = "phi";
      break;
    }
    case "Qatar": {
      continent = "a";
      break;
    }
    case "Bosnia and Herzegovina": {
      continent = "au";
      break;
    }
    case "Zambia": {
      continent = "phi";
      break;
    }
    case "Algeria": {
      continent = "phi";
      break;
    }
    case "Nigeria": {
      continent = "phi";
      break;
    }
    case "North Macedonia": {
      continent = "au";
      break;
    }
    case "Norway": {
      continent = "au";
      break;
    }
    case "Kyrgyzstan": {
      continent = "a";
      break;
    }
    case "Botswana": {
      continent = "phi";
      break;
    }
    case "Uzbekistan": {
      continent = "a";
      break;
    }
    case "Albania": {
      continent = "au";
      break;
    }
    case "Afghanistan": {
      continent = "a";
      break;
    }
    case "Mozambique": {
      continent = "phi";
      break;
    }
    case "Latvia": {
      continent = "au";
      break;
    }
    case "Estonia": {
      continent = "au";
      break;
    }
    case "Phần Lan": {
      continent = "au";
      break;
    }
    case "Zimbabwe": {
      continent = "phi";
      break;
    }
    case "Namibia": {
      continent = "phi";
      break;
    }
    case "Ghana": {
      continent = "phi";
      break;
    }
    case "Montenegro": {
      continent = "au";
      break;
    }
    case "Uganda": {
      continent = "phi";
      break;
    }
    case "Cyprus": {
      continent = "a";
      break;
    }
    case "Campuchia": {
      continent = "a";
      break;
    }
    case "El Salvador": {
      continent = "bmy";
      break;
    }
    case "Trung Quốc": {
      continent = "a";
      break;
    }
    case "Rwanda": {
      continent = "phi";
      break;
    }
    case "Cameroon": {
      continent = "phi";
      break;
    }
    case "Maldives": {
      continent = "a";
      break;
    }
    case "Jamaica": {
      continent = "bmy";
      break;
    }
    case "Australia": {
      continent = "dd";
      break;
    }
    case "Luxembourg": {
      continent = "au";
      break;
    }
    case "Senegal": {
      continent = "phi";
      break;
    }
    case "Singapore": {
      continent = "a";
      break;
    }
    case "Malawi": {
      continent = "phi";
      break;
    }
    case "Ivory Coast": {
      continent = "phi";
      break;
    }
    case "DRC": {
      continent = "phi";
      break;
    }
    case "Réunion": {
      continent = "phi";
      break;
    }
    case "Guadeloupe": {
      continent = "bmy";
      break;
    }
    case "Angola": {
      continent = "phi";
      break;
    }
    case "Fiji": {
      continent = "dd";
      break;
    }
    case "Trinidad and Tobago": {
      continent = "bmy";
      break;
    }
    case "Eswatini": {
      continent = "phi";
      break;
    }
    case "Madagascar": {
      continent = "phi";
      break;
    }
    case "French Polynesia": {
      continent = "dd";
      break;
    }
    case "Martinique": {
      continent = "bmy";
      break;
    }
    case "Sudan": {
      continent = "phi";
      break;
    }
    case "French Guiana": {
      continent = "nmy";
      break;
    }
    case "Malta": {
      continent = "au";
      break;
    }
    case "Cabo Verde": {
      continent = "phi";
      break;
    }
    case "Mauritania": {
      continent = "phi";
      break;
    }
    case "Suriname": {
      continent = "nmy";
      break;
    }
    case "Guinea": {
      continent = "phi";
      break;
    }
    case "Syria": {
      continent = "a";
      break;
    }
    case "Guyana": {
      continent = "nmy";
      break;
    }
    case "Gabon": {
      continent = "phi";
      break;
    }
    case "Togo": {
      continent = "phi";
      break;
    }
    case "Benin": {
      continent = "phi";
      break;
    }
    case "Haiti": {
      continent = "bmy";
      break;
    }
    case "Seychelles": {
      continent = "phi";
      break;
    }
    case "Mayotte": {
      continent = "phi";
      break;
    }
    case "Bahamas": {
      continent = "bmy";
      break;
    }
    case "Timor-Leste": {
      continent = "a";
      break;
    }
    case "Somalia": {
      continent = "phi";
      break;
    }
    case "Papua New Guinea": {
      continent = "dd";
      break;
    }
    case "Belize": {
      continent = "bmy";
      break;
    }
    case "Laos": {
      continent = "a";
      break;
    }
    case "Tajikistan": {
      continent = "a";
      break;
    }
    case "Đài Loan": {
      continent = "a";
      break;
    }
    case "Curaçao": {
      continent = "bmy";
      break;
    }
    case "Aruba": {
      continent = "bmy";
      break;
    }
    case "Andorra": {
      continent = "au";
      break;
    }
    case "Mali": {
      continent = "phi";
      break;
    }
    case "Lesotho": {
      continent = "phi";
      break;
    }
    case "Burundi": {
      continent = "phi";
      break;
    }
    case "Burkina Faso": {
      continent = "phi";
      break;
    }
    case "Mauritius": {
      continent = "phi";
      break;
    }
    case "Congo": {
      continent = "phi";
      break;
    }
    case "Nicaragua": {
      continent = "bmy";
      break;
    }
    case "Hong Kong": {
      continent = "a";
      break;
    }
    case "Djibouti": {
      continent = "phi";
      break;
    }
    case "South Sudan": {
      continent = "phi";
      break;
    }
    case "CAR": {
      continent = "phi";
      break;
    }
    case "Iceland": {
      continent = "au";
      break;
    }
    case "Channel Islands": {
      continent = "au";
      break;
    }
    case "Equatorial Guinea": {
      continent = "phi";
      break;
    }
    case "Saint Lucia": {
      continent = "bmy";
      break;
    }
    case "Gambia": {
      continent = "phi";
      break;
    }
    case "Yemen": {
      continent = "a";
      break;
    }
    case "Isle of Man": {
      continent = "au";
      break;
    }
    case "Eritrea": {
      continent = "phi";
      break;
    }
    case "Sierra Leone": {
      continent = "phi";
      break;
    }
    case "Barbados": {
      continent = "bmy";
      break;
    }
    case "Guinea-Bissau": {
      continent = "phi";
      break;
    }
    case "Niger": {
      continent = "phi";
      break;
    }
    case "Liberia": {
      continent = "phi";
      break;
    }
    case "Gibraltar": {
      continent = "au";
      break;
    }
    case "San Marino": {
      continent = "au";
      break;
    }
    case "Chad": {
      continent = "phi";
      break;
    }
    case "Brunei": {
      continent = "a";
      break;
    }
    case "Comoros": {
      continent = "phi";
      break;
    }
    case "Sint Maarten": {
      continent = "bmy";
      break;
    }
    case "New Zealand": {
      continent = "dd";
      break;
    }
    case "Bermuda": {
      continent = "bmy";
      break;
    }
    case "Saint Martin": {
      continent = "bmy";
      break;
    }
    case "Liechtenstein": {
      continent = "au";
      break;
    }
    case "Monaco": {
      continent = "au";
      break;
    }
    case "Sao Tome and Principe": {
      continent = "phi";
      break;
    }
    case "Turks and Caicos": {
      continent = "bmy";
      break;
    }
    case "Grenada": {
      continent = "bmy";
      break;
    }
    case "British Virgin Islands": {
      continent = "bmy";
      break;
    }
    case "Dominica": {
      continent = "bmy";
      break;
    }
    case "Bhutan": {
      continent = "a";
      break;
    }
    case "St. Vincent Grenadines": {
      continent = "bmy";
      break;
    }
    case "Antigua and Barbuda": {
      continent = "bmy";
      break;
    }
    case "Caribbean Netherlands": {
      continent = "bmy";
      break;
    }
    case "St. Barth": {
      continent = "bmy";
      break;
    }
    case "Saint Kitts and Nevis": {
      continent = "bmy";
      break;
    }
    case "Tanzania": {
      continent = "phi";
      break;
    }
    case "New Caledonia": {
      continent = "dd";
      break;
    }
    case "Faeroe Islands": {
      continent = "au";
      break;
    }
    case "Cayman Islands": {
      continent = "bmy";
      break;
    }
    case "Diamond Princess": {
      continent = "";
      break;
    }
    case "Wallis and Futuna": {
      continent = "dd";
      break;
    }
    case "Greenland": {
      continent = "bmy";
      break;
    }
    case "Anguilla": {
      continent = "bmy";
      break;
    }
    case "Falkland Islands": {
      continent = "nmy";
      break;
    }
    case "Macau": {
      continent = "a";
      break;
    }
    case "Montserrat": {
      continent = "bmy";
      break;
    }
    case "Saint Pierre Miquelon": {
      continent = "bmy";
      break;
    }
    case "Vatican City": {
      continent = "au";
      break;
    }
    case "Solomon Islands": {
      continent = "dd";
      break;
    }
    case "Western Sahara": {
      continent = "phi";
      break;
    }
    case "MS Zaandam": {
      continent = "";
      break;
    }
    case "Vanuatu": {
      continent = "dd";
      break;
    }
    case "Marshall Islands": {
      continent = "dd";
      break;
    }
    case "Palau": {
      continent = "dd";
      break;
    }
    case "Samoa": {
      continent = "dd";
      break;
    }
    case "Saint Helena": {
      continent = "phi";
      break;
    }
    case "Micronesia": {
      continent = "dd";
      break;
    }
    default:
      break;
  }
  return continent;
};

export {
  getConfig,
  getAppDate,
  objectToArrayArray,
  objectToArrayArray2,
  objectToArrayArray3,
  mergeArray,
  stringToSlug,
  findDeathOfProvince,
  convertToHCKey,
  shuffleArray,
  beautifyWorldData,
  getDataHCKEYtoMap,
  findContinentOfCountry,
};
