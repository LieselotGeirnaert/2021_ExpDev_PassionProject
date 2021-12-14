import { useState, Suspense } from "react";
// components
import Parent from "../../screens/Parent";
// styling
import styles from "./Login.module.css";

const Login = () => {
  const [screen, setScreen] = useState("start");

  return (
    <>
      <button
        type="submit"
        className={styles.button}
        onClick={() => setScreen("start")}
      >
        Start
      </button>
      {screen === "start" ? (
        <div>
          <p>Log in als ouder of kind</p>
          <button
            type="submit"
            className={styles.button}
            onClick={() => setScreen("parent")}
          >
            Als ouder
          </button>
          <button
            type="submit"
            className={styles.button}
            onClick={() => setScreen("kid")}
          >
            Als kind
          </button>
        </div>
      ) : (
        ""
      )}

      {screen === "kid" ? <p>kind</p> : ""}
      {screen === "parent" ? <Parent /> : ""}
    </>
  );
};

export default Login;
