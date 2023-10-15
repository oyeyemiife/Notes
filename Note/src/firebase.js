// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_SO5AIZQ39MR0hiPk0YRj1Yv4vzi2RMg",
  authDomain: "ife-s-notes.firebaseapp.com",
  projectId: "ife-s-notes",
  storageBucket: "ife-s-notes.appspot.com",
  messagingSenderId: "846998272941",
  appId: "1:846998272941:web:9b5b8267bcc2e9e9d4bf24"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const db = getFirestore(app);


// const cityRef = doc(db, "Notes");
// setDoc(cityRef, { capital: true }, { merge: true });


// try {
//   await setDoc(doc(db, "Notes"), {
//     title: "",
//     notes:""
//   }
//   )  
  // const docRef = await addDoc(collection(db, "Notes"), {
  //   title: "",
  //   notes: "",
  // });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// const querySnapshot = await getDocs(collection(db, "Notes"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// }); 


export { auth, firestore, db };