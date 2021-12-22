import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
// components
import { db } from "../../firebase-config";
import generateId from "../../utils";
// styling
import styles from "./SendMessage.module.css";

const SendMessage = ({ handleSetScreen }) => {
  const [screen, setScreen] = useState("message");
  const [messageText, setMessageText] = useState("");
  const [senderText, setSenderText] = useState("");
  const buttonDisabled =
    messageText.trim().length === 0 || senderText.trim().length === 0;

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    setMessageText("");
    setSenderText("");

    writeToDatabase();
    setScreen("confirmation");
  };

  const writeToDatabase = async () => {
    await setDoc(doc(db, "messages", generateId(15)), {
      sender: senderText,
      message: messageText,
      read: false,
    });
  };

  return (
    <div className={styles.container}>
      {screen === "message" ? (
        <>
          <button
            className="back"
            onClick={() => handleSetScreen("overview")}
          >
            x
          </button>
          <h2 className={styles.title}>Plaats je bericht tussen de sterren</h2>
          <form onSubmit={handleFormSubmission} className={styles.form}>
            <label className={styles.label}>Van wie komt het berichtje?</label>
            <input
              value={senderText}
              onChange={(e) => setSenderText(e.target.value)}
              className={styles.input}
            ></input>
            <label className={styles.label}>Wat wil je sturen?</label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className={styles.textarea}
            ></textarea>
            <button
              type="submit"
              className={buttonDisabled ? styles.buttonDisabled : styles.button}
              disabled={buttonDisabled}
            >
              Bericht verzenden
            </button>
          </form>
        </>
      ) : (
        ""
      )}
      {screen === "confirmation" ? (
        <>
          <h2 className={styles.title}>bedankt!</h2>
          <p className={styles.text}>We hebben je berichtje goed ontvangen!</p>
          <button
            type="submit"
            onClick={() => handleSetScreen("overview")}
            className={styles.button}
          >
            Terug naar het universum
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SendMessage;
