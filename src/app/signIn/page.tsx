'use client'

import { useState, FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import signIn from "../../firebase/auth/signIn";
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const { result, error } = await signIn(email, password);

            if (error) {
                const firebaseError = error as FirebaseError;
                if (firebaseError.message) {
                    console.log(firebaseError.message);
                    throw new Error(firebaseError.message);
                } else {
                    console.log('Unknown Error:', firebaseError);
                    throw new Error('Unknown Error');
                }
            }

            console.log(result)
            return router.push("/");
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.formContainer}>
                <h1 className={styles.title}>SignIn</h1>
                <form onSubmit={handleForm} className={styles.form}>
                    <label htmlFor="email" className={styles.formLabel}>
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" className={styles.formInput} placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password" className={styles.formLabel}>
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" className={styles.formInput} placeholder="password" />
                    </label>
                    <button type="submit" className={styles.formButton}>Sign In</button>
                    <button type="button" className={styles.formButton} onClick={() => router.push("/signUp")}>Sign Up</button>
                </form>
            </section>
        </div>
    );
}

export default SignIn;