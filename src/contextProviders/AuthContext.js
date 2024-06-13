import React, {useContext, useEffect, useState} from 'react';
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import {collection, getDocs, getDoc} from 'firebase/firestore';
import {auth, db} from "../utils/firebaseConfig";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {


    const [currentUser, setCurrentUser] = useState(null);

    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User registered:', user);
                return signInWithEmailAndPassword(auth, email, password);
            })
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in:', user);
                return user;
            })
            .catch((error) => {
                console.error('Error during signup/login:', error);
            });
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        signOut(auth);
        localStorage.clear();
        setCurrentUser(null);

    }

    function fetchCollection(collectionName) {
        return getDocs(collection(db, collectionName)).then((querySnapshot) => {
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        });
    }

    useEffect(() => {
        // Manejar cambios en la autenticación del usuario
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // Usuario autenticado
                setCurrentUser(user);
            } else {
                // No hay usuario autenticado
                setCurrentUser(null);
            }
        });

        return () => {
            // Limpia el efecto cuando el componente se desmonta
            unsubscribe();
        };
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        fetchCollection
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
