import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDySDIZG8RVEe_wrjZaUW8n2wpipKrnUP4",
    authDomain: "durak-game-online.firebaseapp.com",
    databaseURL: "https://durak-game-online-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "durak-game-online",
    storageBucket: "durak-game-online.appspot.com",
    messagingSenderId: "522150418108",
    appId: "1:522150418108:web:620c9f467aa8d1ed7762b9"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const database = getFirestore(firebaseApp)

export const storage = getStorage(firebaseApp)