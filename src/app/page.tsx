'use client'
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import styles from './page.module.css';

function Page() {
  const { userAuth, logout } = useAuthContext();
  const router = useRouter();

  console.log(userAuth);

  if (userAuth == null) {
    router.push("/signIn");
  }

  return (
    <>
      {userAuth && (
        <section className={styles.container}>
          <h1 className={styles.title}>Only logged in users can view this page</h1>
          <button className={styles.logoutButton} onClick={() => logout()}>Sign Out</button>
        </section>
      )}
    </>
  );
}

export default Page;