import { useState } from "react";
// components
import Parent from "./screens/Parent";
import Kid from "./screens/Kid";
// styling
import styles from "./styles/Home.module.css";

const App = () => {
  const [screen, setScreen] = useState("start");

  return (
    <section className={styles.container}>
      <h1 className="hidden">Tussen de sterren</h1>

      {screen === "start" ? (
        <section className={styles.start}>
          <h2 className="hidden">Start</h2>
          <p className={styles.title}>Tussen de sterren</p>
          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.button}
              onClick={() => setScreen("parent")}
            >
              Bekijk een universum
            </button>
            <button
              type="submit"
              className={styles.button}
              onClick={() => setScreen("kid")}
            >
              Bouw je eigen universum
            </button>
          </div>
        </section>
      ) : (
        ""
      )}

      {screen === "kid" ? <Kid /> : ""}
      {screen === "parent" ? <Parent /> : ""}
    </section>
  );
};

export default App;
