'use client'

import React from "react";
import signUp from "../../firebase/auth/signUp";
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/signIn")
    }
    return (
        <div className={styles.container}>
            <section className={styles.formContainer}>
                <h1 className={styles.title}>SignUp</h1>
                <form onSubmit={handleForm} className={styles.form}>
                    <label htmlFor="email" className={styles.formLabel}>
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" className={styles.formInput} placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password" className={styles.formLabel}>
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" className={styles.formInput} placeholder="password" />
                    </label>
                    <button type="submit" className={styles.formButton}>Sign Up</button>
                    <button type="button" className={styles.formButton} onClick={() => router.push("/signIn")}>Sign In</button>
                </form>
            </section>
        </div>
    );
}

export default Page;