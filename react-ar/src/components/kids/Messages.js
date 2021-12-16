import { useState, useEffect, Suspense } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { ARCanvas } from "@react-three/xr";
// components
// styling
import styles from "./Messages.module.css";

const Messages = ({ readMessages, unreadMessages, handleSetScreen }) => {
  console.log("unread: ", unreadMessages);
  console.log("read: ", readMessages);

  const handleNewMessage = () => {
    console.log("hier moet AR openen om het bericht te zoeken");
  };

  return (
    <section className={styles.container}>
      <button className="back" onClick={() => handleSetScreen("kid")}>
        <span className="hidden">Terug</span>
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
          {unreadMessages.length === 1
            ? "Je hebt 1 nieuw bericht"
            : `Je hebt ${unreadMessages.length} nieuwe berichten`}
        </p>
      </button>
      <ul className={styles.list}>
        {readMessages.map((item, index) => (
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
