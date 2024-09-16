import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAZ1JPbtEYX6r-Qn5mFwEQeYgav4jQnHx4",
    authDomain: "week7-lachlan.firebaseapp.com",
    projectId: "week7-lachlan",
    storageBucket: "week7-lachlan.appspot.com",
    messagingSenderId: "878440406644",
    appId: "1:878440406644:web:b1412602d46640bce87b21"
};

initializeApp(firebaseConfig)
const db = getFirestore()
export default db