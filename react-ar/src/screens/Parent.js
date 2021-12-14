import { useState, Suspense } from "react";
// components
import SendMessage from "../components/parents/SendMessage";
import Overview from "../components/parents/Overview";
// styling
import styles from "./Parent.module.css";

const Parent = () => {
  const [currentScreen, setCurrentScreen] = useState("message");

  const handleSetScreen = (screen) => {
    setCurrentScreen(screen);
    console.log("screen;", screen);
  };

  return (
    <>
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
    </>
  );
};

export default Parent;
