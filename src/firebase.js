import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBQ7X_uhl4eYIQ_ltrSdwt2GZKo_ntXhCk",
    authDomain: "file-uploader-9ba9a.firebaseapp.com",
    databaseURL: "https://file-uploader-9ba9a.firebaseio.com",
    projectId: "file-uploader-9ba9a",
    storageBucket: "file-uploader-9ba9a.appspot.com",
    messagingSenderId: "526885956477",
    appId: "1:526885956477:web:66374adb06502693e2fa14"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();

        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

export const getLocationDocument = async uid => {
    if (!uid) return null;
    try {
        const locationDocument = await firestore.doc(`locations/${uid}`).get();

        return {
            uid,
            ...locationDocument.data()
        };
    } catch (error) {
        console.error("Error fetching location", error);
    }
};

export const generateLocationDocument = async (additionalData) => {

    const locRef = firestore.doc(`locations`).getId();
    const snapshot = await locRef.get();

    if (!snapshot.exists) {
        try {
            await locRef.set({
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating location document", error);
        }
    }
    return getLocationDocument(locRef.uid);
};
