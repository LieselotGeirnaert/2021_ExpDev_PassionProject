import { useState, useEffect, Suspense } from "react";
import { collection, getDocs } from "firebase/firestore";
// components
import { db } from "../../firebase-config";
// styling
import styles from "./Login.module.css";

const Overview = ({ handleSetScreen }) => {
  const [messages, setMessages] = useState([]);
  const messagesCollectionRef = collection(db, "messages");

  useEffect(() => {
    const getMessages = async () => {
      const data = await getDocs(messagesCollectionRef);
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getMessages();
  }, []);

  console.log(messages);
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
