import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
// components
import { db } from "../../firebase-config";
// styling
import styles from "./Overview.module.css";

const Overview = ({ handleSetScreen }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <>
      <p>Overview</p>
      <button
        type="submit"
        className={styles.button}
        onClick={() => handleSetScreen("message")}
      >
        Verstuur een berichtje
      </button>
    </>
  );
};

export default Overview;
