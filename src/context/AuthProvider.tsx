'use client'

import React, { ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import firebase_app from '../firebase/firebaseAppConfig';
import styles from '../app/page.module.css';

interface AuthContextProviderProps {
    children: ReactNode;
}

const auth = getAuth(firebase_app);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUserCredentials: User | null) => {
            setUserAuth(authUserCredentials);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    async function logout() {
        let result = null,
            error = null;
        try {
            result = await signOut(auth);
        } catch (e) {
            error = e;
        }

        return { result, error };
    }

    return (
        <AuthContext.Provider value={{ userAuth, logout }}>
            {loading
                ?
                <div className={styles.container}>
                    <h1 className={styles.loadingText}>Loading...</h1>
                </div>
                :
                children
            }
        </AuthContext.Provider>
    );
};