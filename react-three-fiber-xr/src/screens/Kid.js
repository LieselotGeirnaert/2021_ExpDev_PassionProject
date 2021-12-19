import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
// composnents
import { db } from "../firebase-config";
import Planets from "../components/kids/Planets";
import AddPlanet from "../components/kids/AddPlanet";
import Messages from "../components/kids/Messages";
// styling
import styles from "./Kid.module.css";

const Kid = () => {
  const [currentScreen, setCurrentScreen] = useState("kid");
  const name = "Lieselot";
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [readMessages, setReadMessages] = useState([]);

  useEffect(() => {
    const queryRead = query(
      collection(db, "messages"),
      where("read", "==", true)
    );
    onSnapshot(queryRead, (snapshot) => {
      setReadMessages(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    const queryUnread = query(
      collection(db, "messages"),
      where("read", "==", false)
    );
    onSnapshot(queryUnread, (snapshot) => {
      setUnreadMessages(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

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
              {unreadMessages.length > 0 ? (
                <p className={styles.unread}>{unreadMessages.length}</p>
              ) : (
                ""
              )}
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

      {currentScreen === "planets" ? (
        <Planets handleSetScreen={() => handleSetScreen("kid")} />
      ) : (
        ""
      )}
      {currentScreen === "add-planet" ? (
        <AddPlanet handleSetScreen={() => handleSetScreen("kid")} />
      ) : (
        ""
      )}
      {currentScreen === "messages" ? (
        <Messages
          unreadMessages={unreadMessages}
          readMessages={readMessages}
          handleSetScreen={() => handleSetScreen("kid")}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default Kid;
