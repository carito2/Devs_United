import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDs0hfI6mVMhFYEDsHT99H2khOMAse8yrU",
    authDomain: "devs-united-carolinamunoz.firebaseapp.com",
    projectId: "devs-united-carolinamunoz",
    storageBucket: "devs-united-carolinamunoz.appspot.com",
    messagingSenderId: "196949339832",
    appId: "1:196949339832:web:c3c389a39bd603cb910e4d",
    measurementId: "G-0NYQ78RL33"
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
export const loginWithGoogle = () => {
    auth.signInWithPopup(provider)
};
//La utilidad para hacer logout
export const logout = () => auth.signOut();

// exporta el paquete de firebase para poder usarlo
export default firebase;