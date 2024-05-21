import React, {useContext, useEffect, useState} from 'react';
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import {auth} from "../utils/firebaseConfig";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {



    const [currentUser, setCurrentUser] = useState(null);

    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        login(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        signOut(auth);
        localStorage.clear(); // Limpiar localStorage
        setCurrentUser(null); // Establecer currentUser a null

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
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
