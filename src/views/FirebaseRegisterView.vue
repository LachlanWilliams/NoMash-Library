<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p>
        <label for="role">Select Role:</label>
        <select v-model="role">
            <option value="reader">Reader</option>
            <option value="librarian">Librarian</option>
        </select>
    </p>
    <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { useRouter } from "vue-router"
import { isAuthenticated, userRole } from "@/router";

const email = ref("")
const password = ref("")
const role = ref("reader") // Default role is reader
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (data) => {
        console.log("Firebase Register successful")

        isAuthenticated.value = true
        userRole.value = role.value
        // Store user role in Firestore
        await setDoc(doc(db, "users", data.user.uid), {
            email: email.value,
            role: role.value
        })

        router.push("/FireLogin")
    }).catch((error) => {
        console.log(error);
    })
};
</script>

<style>
</style>
