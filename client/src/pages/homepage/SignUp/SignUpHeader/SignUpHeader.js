import styles from "./SignUpHeader.module.css";

function SignUpHeader() {
  return (
    <div>
      <h2 className={styles.title}>Discover the Future of Scheduling</h2>
      <p className={styles.text}>
        Unlock your potential with MasterTask, the ultimate tool for
        productivity. Begin your journey now with a hassle-free sign-up!
      </p>
    </div>
  );
}

export default SignUpHeader;
