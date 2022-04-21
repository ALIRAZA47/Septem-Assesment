import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Cookies from "js-cookie";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAaL8gpbVdSXtsc9Z-GnGaaNxhzEZIpilc",
  authDomain: "web-hosting-b15ea.firebaseapp.com",

  projectId: "web-hosting-b15ea",

  storageBucket: "web-hosting-b15ea.appspot.com",

  messagingSenderId: "308552660978",

  appId: "1:308552660978:web:b5035e9e04bbb106fd5d6b",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// add user to firestore
export async function addUserToFirestore(user, setError) {
  console.log(user);
  const userRef = collection(db, "Users");
  // Add a new document in collection "cities"
  addDoc(userRef, user)
    .then(function (docRef) {
      console.log("User added to Firestore with ID: ", docRef.id);
    })
    .catch(function (error) {
      setError("Error adding User to Firestore: ");
    });
}

// get user from firestore
export async function getUserFromFirestore(username) {
  const q = query(collection(db, "Users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  } else {
    console.log(querySnapshot.docs[0].data());
    return querySnapshot.docs[0].data();
  }
}

// add hosting plan to firestore
export async function addHostingPlanToFirestore(plan) {
  console.log(plan);
  const planRef = collection(db, "hosting_plans");
  // Add a new document in collection "cities"
  await addDoc(planRef, plan)
    .then(function (docRef) {
      console.log("Hosting plan added to Firestore with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.log("Error adding hosting plan to Firestore: ", error);
    });
}

// get hosting plan from firestore
export async function userHasHostingPlans() {
  const q = query(
    collection(db, "hosting_plans"),
    where("User ID", "==", JSON.parse(Cookies.get("currentUser")).username)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return false;
  } else {
    // console.log(querySnapshot.docs[0].data());
    return true;
  }
}

export { db, auth };
export default app;
