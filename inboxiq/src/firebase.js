import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBd_nKkdf7IY2V8s0zSQVoRkB4pUz6Mg18",
  authDomain: "inboxiq-d2512.firebaseapp.com",
  projectId: "inboxiq-d2512",
  storageBucket: "inboxiq-d2512.firebasestorage.app",
  messagingSenderId: "1028380438707",
  appId: "1:1028380438707:web:ac2ebb5302b482318140c6",
  measurementId: "G-FLY9MW827C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

// Gmail read permission
googleProvider.addScope("https://www.googleapis.com/auth/gmail.readonly");

googleProvider.setCustomParameters({
  prompt: "consent",
});

export default app;