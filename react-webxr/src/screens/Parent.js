import { useState, Suspense } from "react";
// components
import SendMessage from "../components/parents/SendMessage";
import Overview from "../components/parents/Overview";
// styling
import styles from "./Parent.module.css";

const Parent = () => {
  const [currentScreen, setCurrentScreen] = useState("overview");

  const handleSetScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <section>
      { currentScreen === "overview" ? (
        <Overview handleSetScreen={(screen) => handleSetScreen(screen)} />
      ) : (
        ""
      )}
      { currentScreen === "message" ? (
        <SendMessage handleSetScreen={(screen) => handleSetScreen(screen)}/>
      ) : (
        ""
      )}
    </section>
  );
};

export default Parent;
