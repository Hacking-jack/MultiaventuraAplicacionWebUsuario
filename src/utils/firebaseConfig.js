import {initializeApp} from "firebase/app";
import {getAuth,setPersistence, browserLocalPersistence,onAuthStateChanged} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import {getDatabase} from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsPXY0OtBhYcLPBLTNf8YRytI0z7jfv5s",
    authDomain: "multiaventuras-111d7.firebaseapp.com",
    projectId: "multiaventuras-111d7",
    storageBucket: "multiaventuras-111d7.appspot.com",
    messagingSenderId: "243957207615",
    appId: "1:243957207615:web:9d0ac6d23078fbddb6de8a",
    databaseURL: "https://multiaventuras-111d7-default-rtdb.europe-west1.firebasedatabase.app/"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




const auth = getAuth(app) // Firebase Auth autenticacion de usuario

const db = getFirestore(app); //Firestore database ( Actividades )

const realDb = getDatabase(app); //Real time database ( Reservas )

onAuthStateChanged(auth, (user) => {
        if (user) {
            // Usuario autenticado
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            const uid = user.uid;

            // Aquí puedes manejar lo que necesites con el usuario autenticado
        } else {
            // No hay usuario autenticado
        }
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                console.log("Persistencia local habilitada con éxito");
            })
            .catch((error) => {
                console.error("Error al habilitar la persistencia local:", error);
            });
    });

export {db, auth,realDb};