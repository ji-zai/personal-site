import * as admin from "firebase-admin";

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: "jisnu-3ce51",
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email:
        "firebase-adminsdk-umvyw@jisnu-3ce51.iam.gserviceaccount.com",
      client_id: "113188280917612838379",
      // ... other properties remain the same
    }),
  });
}

export default function handler(req, res) {
  // Extract email from request body
  const { email } = req.body;

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Save email to Firestore
  const db = admin.firestore();
  db.collection("subscribers")
    .doc(email)
    .set({ subscribed: true })
    .then(() => {
      res.status(200).json({ message: "Email subscribed successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Error saving to Firestore", details: error });
    });
}
