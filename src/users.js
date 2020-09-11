import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";

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

const database = firebase.database();
export async function getUserData(uid) {
    const snapshot = await database.ref(`/users/${uid}`).once('value');
    return snapshot.val();
}

export async function setUserData(uid, data) {
    firebase.database().ref(`/users/${uid}`).set(data);
}