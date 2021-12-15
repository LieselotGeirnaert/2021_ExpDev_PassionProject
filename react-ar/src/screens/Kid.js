import { useState } from "react";
// components
import Planets from "../components/kids/Planets";
import AddPlanet from "../components/kids/AddPlanet";
import Messages from "../components/kids/Messages";
// styling
import styles from "./Kid.module.css";

const Kid = () => {
  const [currentScreen, setCurrentScreen] = useState("kid");
  const name = "Lieselot";

  const handleSetScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <section className={styles.container}>
      <h2 className="hidden">Universum kind</h2>
      {currentScreen === "kid" ? (
        <>
          <p className={styles.title}>Hoi {name}</p>
          <p className={styles.subTitle}>Wat wil je vandaag doen?</p>
          <ul className={styles.list}>
            <li
              className={styles.listItem}
              onClick={() => handleSetScreen("planets")}
            >
              <img
                alt=""
                src="/assets/img/icon-planet.svg"
                width="50"
                height="50"
                className={styles.listItemImg}
              />
              <p className={styles.listItemText}>planeten bekijken</p>
            </li>
            <li
              className={styles.listItem}
              onClick={() => handleSetScreen("add-planet")}
            >
              <img
                alt=""
                src="/assets/img/icon-pencil.svg"
                width="50"
                height="50"
                className={styles.listItemImg}
              />
              <p className={styles.listItemText}>eigen planeet maken</p>
            </li>
            <li
              className={styles.listItem}
              onClick={() => handleSetScreen("messages")}
            >
              <img
                alt=""
                src="/assets/img/icon-envelope.svg"
                width="50"
                height="50"
                className={styles.listItemImg}
              />
              <p className={styles.listItemText}>berichten bekijken</p>
            </li>
          </ul>
        </>
      ) : (
        ""
      )}

      {currentScreen === "planets" ? <Planets /> : ""}
      {currentScreen === "add-planet" ? <AddPlanet /> : ""}
      {currentScreen === "messages" ? <Messages handleSetScreen={() => handleSetScreen("kid")}/> : ""}
    </section>
  );
};

export default Kid;
