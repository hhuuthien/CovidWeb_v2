const functions = require("firebase-functions");

exports.getWorldData = functions.https.onRequest((request, response) => {
  const options = {
    method: "GET",
    url: "https://gw.vnexpress.net/cr/?name=world_coronavirus",
  };

  axios
    .request(options)
    .then(function(res) {
      response.send(res.data.data);
    })
    .catch(function(error) {
      response.send(error);
    });
});
