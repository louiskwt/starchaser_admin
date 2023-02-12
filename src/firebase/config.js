const { credential } = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const serviceAccount = require("../env/key.json");

const myFirebaseAdmin = initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: "https://dsestarchaser.firebaseio.com",
});

module.exports = myFirebaseAdmin;
