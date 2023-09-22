import admin from "firebase-admin";

import serviceAccount from "./legalease-sa.json" assert {type: "json"};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});


export default admin;