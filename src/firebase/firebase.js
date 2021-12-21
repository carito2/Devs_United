import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBC4rHYLGgyypmW9V4-5Tz_HiwCAYKvv08",
    authDomain: "tweets-project-295a5.firebaseapp.com",
    projectId: "tweets-project-295a5",
    storageBucket: "tweets-project-295a5.appspot.com",
    messagingSenderId: "710649332419",
    appId: "1:710649332419:web:81b51ff937c075ff4b9876"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
// Exporta la funcionalidad de la DB
export const firestore = firebase.firestore();

//El módulo de autenticación
export const auth = firebase.auth();
//El provedor de auntenticación
export const provider = new firebase.auth.GoogleAuthProvider();
//La utilidad para hacer login con el pop-up
export const loginConGoogle = () => auth.signInWithPopup(provider);
//La utilidad para hacer logout
export const logout = () => auth.signOut();

// exporta el paquete de firebase para poder usarlo
export default firebase;