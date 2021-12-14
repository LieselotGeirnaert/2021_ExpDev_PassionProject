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
      sender: messageText,
      message: senderText,
    });
  };

  return (
    <div className={styles.container}>
      <button type="submit" onClick={() => handleSetScreen("overview")}>
        Sluiten
      </button>
      <h2 className={styles.title}>Plaats je bericht tussen de sterren</h2>
      {screen === "message" ? (
        <form onSubmit={handleFormSubmission} className={styles.form}>
          <label className={styles.label}>Van wie komt het berichtje?</label>
          <input
            value={senderText}
            placeholder="Type a message..."
            onChange={(e) => setSenderText(e.target.value)}
            className={styles.input}
          ></input>
          <label className={styles.label}>Wat wil je sturen?</label>
          <textarea
            value={messageText}
            placeholder="Type a message..."
            onChange={(e) => setMessageText(e.target.value)}
            className={styles.input}
          ></textarea>
          <button
            type="submit"
            className={buttonDisabled ? styles.buttonDisabled : styles.button}
            disabled={buttonDisabled}
          >
            Bericht verzenden
          </button>
        </form>
      ) : (
        ""
      )}
      {screen === "confirmation" ? (
        <div>
          {" "}
          <p>We hebben je berichtje goed ontvangen!</p>
          <button type="submit" onClick={() => handleSetScreen("overview")}>
            Bekijk het universum
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SendMessage;
