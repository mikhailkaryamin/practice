import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setPending(false);
            } else {
                setPending(false);
                setCurrentUser(null);
            }
        });

    }, []);

    if (pending) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};