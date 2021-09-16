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
  return filterArray;
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
};
