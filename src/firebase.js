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
  const addUserRes = await addDoc(userRef, user);
  if (addUserRes.error) {
    setError("Error adding User to Firestore: ");
  } else {
    console.log("User added to Firestore with ID: ", addUserRes.id);
  }
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

// get hosting plans from firestore
export async function getHostingPlansFromFirestore(username) {
  // fetch data from firestore
  const q = query(
    collection(db, "hosting_plans"),
    where("User ID", "==", username)
  );
  const hosting_plans = [];
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  if (!querySnapshot.empty) {
    //   console.log(querySnapshot.docs[0].data());
    for (let i = 0; i < querySnapshot.docs.length; i++) {
      hosting_plans.push({
        id: i,
        domain: querySnapshot.docs[i].data()["Domain Name"],
        planName: querySnapshot.docs[i].data()["Plan Name"],
        serverIP: querySnapshot.docs[i].data()["Server IP"],
        userId: querySnapshot.docs[i].data()["User ID"],
        ftUser: querySnapshot.docs[i].data()["FTP Username"],
        ftPass: querySnapshot.docs[i].data()["FTP Password"],
        planEndDate: querySnapshot.docs[i].data()["Plan End Date"],
        planStartDate: querySnapshot.docs[i].data()["Plan Start Date"],
      });
    }
  }

  return hosting_plans;
}

// get hosting plan from firestore
export async function userHasHostingPlans(setHasPlan) {
  try {
    const cUser = Cookies.get("currentUser");
    const q = query(
      collection(db, "hosting_plans"),
      where("User ID", "==", JSON.parse(cUser).username)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    if (querySnapshot.empty) {
      return setHasPlan(false);
    } else {
      console.log(querySnapshot.docs[0].data());
      return setHasPlan(true);
    }
  } catch (error) {
    return;
  }
}

export { db, auth };
export default app;
