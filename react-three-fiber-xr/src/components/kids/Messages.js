import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
// components
import { db } from "../../firebase-config";
// styling
import styles from "./Messages.module.css";

const Messages = ({ readMessages, unreadMessages, handleSetScreen }) => {
  const [currentScreen, setCurrentScreen] = useState("overview");
  const [currentMessage, setCurrentMessage] = useState();

  const handleNewMessage = () => {
    setCurrentScreen("newMessages");
  };

  const handleClickMessage = (id) => {
    setCurrentScreen("newMessage");
    setCurrentMessage(unreadMessages[id]);
  };

  const handleReadMessage = () => {
    setCurrentScreen("newMessages");
    writeToDatabase();
  };

  const writeToDatabase = async () => {
    await updateDoc(doc(db, "messages", String(currentMessage.id)), {
      read: true,
    });
  };

  return (
    <section className={styles.container}>
      {currentScreen === "overview" ? (
        <div>
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
        </div>
      ) : (
        ""
      )}

      {currentScreen === "newMessages" ? (
        <div>
          <button className="back" onClick={() => setCurrentScreen("overview")}>
            <span className="hidden">Terug</span>
          </button>
          <h3 className={styles.title}>Jouw ongelezen berichten</h3>
          {unreadMessages.length > 0 ? (
            <ul className={styles.unreadList}>
              {unreadMessages.map((item, id) => (
                <li
                  className={styles.unreadListItem}
                  key={id}
                  onClick={() => handleClickMessage(id)}
                >
                  <p className={styles.from}>
                    Van<span className="punctuation">:</span>
                  </p>
                  <p className={styles.fromText}>{item.sender}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>Je hebt geen nieuwe berichten</p>
          )}
        </div>
      ) : (
        ""
      )}

      {currentScreen === "newMessage" ? (
        <div>
          <button className="back" onClick={() => handleReadMessage()}>
            <span className="hidden">Terug</span>
          </button>
          <h3 className={styles.title}>Jouw bericht</h3>

          <ul className={styles.unreadList}>
            <li className={styles.unreadListItem}>
              <p className={styles.from}>
                Van<span className="punctuation">:</span>
              </p>
              <p className={styles.fromText}>{currentMessage.sender}</p>
              <p className={styles.fullMessage}>{currentMessage.message}</p>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Messages;
