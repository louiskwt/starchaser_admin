const admin = require("firebase-admin");
const serviceAccount = require("../env/key.json");
const { DB_URL } = require("../env/firebase.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DB_URL,
});

const db = admin.firestore();

const ref = db.collection("members");

const data = db.collection("members").onSnapshot((snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
});

module.exports = { db, admin, ref, data };
