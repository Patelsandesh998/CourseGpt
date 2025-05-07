import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "coursegpt-90b19.firebaseapp.com",
  projectId: "coursegpt-90b19",
  storageBucket: "coursegpt-90b19.firebasestorage.app",
  messagingSenderId: "742874449591",
  appId: "1:742874449591:web:dd710640e6d4307b82ef32",
  measurementId: "G-ZCF2CEB1W9",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { app, auth, googleProvider, analytics }
