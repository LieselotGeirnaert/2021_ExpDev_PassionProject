import { useState, Suspense } from "react";
import { ARCanvas } from "@react-three/xr";
import { Loader } from "@react-three/drei";
// components
import Message from "./Message";
// styling
import styles from "./Messages.module.css";

const Messages = ({ readMessages, unreadMessages, handleSetScreen }) => {
  const [currentScreen, setCurrentScreen] = useState("overview");

  const handleNewMessage = () => {
    setCurrentScreen("search");
  };

  const handleClickMessage = () => {
    console.log("bericht openen");
    setCurrentScreen("overview")
  };

  return (
    <section className={styles.container}>
      <button className="back" onClick={() => handleSetScreen("kid")}>
        <span className="hidden">Terug</span>
      </button>
      {currentScreen === "overview" ? (
        <div>
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

      {currentScreen === "search" ? (
        <ARCanvas className={styles.canvas}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 0, 5]} />
          <Suspense fallback={<Loader />}>
            <Message handleClickMessage={() => handleClickMessage()} />
          </Suspense>
        </ARCanvas>
      ) : (
        ""
      )}
    </section>
  );
};

export default Messages;
