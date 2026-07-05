import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnEriNteylcWZZXOgV2Cyfi1legYSu13M",
  authDomain: "mittal-website.firebaseapp.com",
  projectId: "mittal-website",
  storageBucket: "mittal-website.firebasestorage.app",
  messagingSenderId: "514228385732",
  appId: "1:514228385732:web:684ed8c2d87fc1ab02d691",
  measurementId: "G-FLH9DYC7M5",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { app, analytics };
