<template>
    <h1>Sign In</h1>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router'; 
import { isAuthenticated, userRole } from '@/router';

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (data) => {
        console.log("Sign in successful")
        isAuthenticated.value = true
        
        // Fetch the user's role from Firestore
        const userDoc = await getDoc(doc(db, "users", data.user.uid))
        if (userDoc.exists()) {
            const userData = userDoc.data()
            const role = userData.role
            userRole.value = role
            // Redirect based on role
            if (role === "librarian") {
                router.push("/LibrarianDashboard")
            } else {
                router.push("/")
            }
        } else {
            console.log("No such user document!")
        }
    }).catch((error) => {
        console.log(error);
    })
};
</script>
