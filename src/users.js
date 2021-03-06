import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHL6aO4vDhsDlDK9SBag26JKhkV8lz9iM",
    authDomain: "inhouse-gallery.firebaseapp.com",
    databaseURL: "https://inhouse-gallery.firebaseio.com",
    projectId: "inhouse-gallery",
    storageBucket: "inhouse-gallery.appspot.com",
    messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",  
};

firebase.initializeApp(firebaseConfig);

export async function getUser() {
    const auth = firebase.auth();
    if (!auth.currentUser) {
        await auth.signInAnonymously();
    }
    return auth.currentUser;
}

const db = firebase.firestore();
export async function getUserDocRef(uid) {
    return db.collection('users').doc(uid);
}

export async function getUserData(uid) {
    const docRef = await getUserDocRef(uid);
    const doc = await docRef.get();
    return doc.data();
}

export async function setUserData(uid, data) {
    const docRef = await getUserDocRef(uid);
    return await docRef.set(data);
}

export async function getCurrentEnteries(query) {
    const querySnapshot = await db.collection('users').where('entered', '==', true).get();
    return querySnapshot.size;
}
