import { useState, useEffect, Suspense } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { ARCanvas } from "@react-three/xr";
// components
import { db } from "../../firebase-config";
// styling
import styles from "./Messages.module.css";

const Messages = ({ handleSetScreen }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const handleNewMessage = () => {
    console.log("hier moet AR openen om het bericht te zoeken");
  };

  return (
    <section className={styles.container}>
      <button className={styles.back} onClick={() => handleSetScreen("kid")}>
        Terug
      </button>
      <h3 className={styles.title}>Jouw berichten</h3>
      <button className={styles.new} onClick={handleNewMessage}>
        <img
          alt=""
          src="/assets/img/icon-envelope-white.svg"
          width="50"
          height="50"
          className={styles.listItemImg}
        />
        <p className={styles.newText}>
          Je hebt <span className={styles.number}>0</span> nieuwe berichten
        </p>
      </button>
      <ul className={styles.list}>
        {messages.map((item, index) => (
          <li className={styles.listItem} key={index}>
            <p className={styles.from}>
              Van<span className="punctuation">:</span>
            </p>
            <p className={styles.fromText}>{item.sender}</p>
            <p className={styles.message}>{item.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Messages;
