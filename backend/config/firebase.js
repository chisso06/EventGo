import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC1yu2UOlhZidDouovFKxnOLq_gumICOtE",
  authDomain: "eventgo-b229a.firebaseapp.com",
  projectId: "eventgo-b229a",
  storageBucket: "eventgo-b229a.appspot.com",
  messagingSenderId: "454624667020",
  appId: "1:454624667020:web:c432adaf409fa71538e2a9",
  measurementId: "G-7HLM7DHX3D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const storage = getStorage(app);
export default storage;