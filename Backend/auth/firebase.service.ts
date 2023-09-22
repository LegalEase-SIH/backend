import admin from "firebase-admin";

let serviceAccount = require("legalease-sa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;