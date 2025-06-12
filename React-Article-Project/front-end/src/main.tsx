import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyACSUoYAAw0jo3nzLsIpiPBRaJeGUUL4UA",
  authDomain: "full-stack-react-f8242.firebaseapp.com",
  projectId: "full-stack-react-f8242",
  storageBucket: "full-stack-react-f8242.firebasestorage.app",
  messagingSenderId: "899394804994",
  appId: "1:899394804994:web:4e82bed3efed355eb1361b"
};

const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
