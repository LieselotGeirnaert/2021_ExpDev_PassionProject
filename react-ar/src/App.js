import { useEffect } from "react";
import { useState, Suspense } from "react";
// components
import Planets from "./screens/planets";
import Scanner from "./screens/scanner";
import Login from "./components/parents/Login";
// styling
import styles from "./styles/Home.module.css";

const App = () => {
  const [screen, setScreen] = useState("AR");
  const handleShowMessage = () => {
    console.log("test");
    setScreen("message")
  };
  // useEffect(() => {
  //   console.log(window.DeviceOrientationEvent);
  //   if (window.DeviceOrientationEvent) {
  //     console.log("yes");
  //     window.addEventListener("deviceorientation", (event) => {
  //         console.log("nope?");
  //         var rotateDegrees = event.alpha; // alpha: rotation around z-axis
  //         var leftToRight = event.gamma; // gamma: left to right
  //         var frontToBack = event.beta; // beta: front back motion
  //         handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
  //       },
  //       true
  //     );
  //   }

  //   const handleOrientationEvent = (
  //     frontToBack,
  //     leftToRight,
  //     rotateDegrees
  //   ) => {
  //     console.log("frontToBack", frontToBack);
  //     // console.log("leftToRight", leftToRight);
  //     // console.log("rotateDegrees", rotateDegrees);
  //     if (rotateDegrees < 45 || rotateDegrees > 315) {
  //       console.log("windrichting: N");
  //     } else if (rotateDegrees < 135 && rotateDegrees > 45) {
  //       console.log("windrichting: O");
  //     } else if (rotateDegrees < 225 && rotateDegrees > 135) {
  //       console.log("windrichting: Z");
  //     } else if (rotateDegrees < 315 && rotateDegrees > 225) {
  //       console.log("windrichting: W");
  //     }
  //   };
  // }, []);
  return (
    <div className={styles.container}>
    <Login />
      {/* {screen === "AR" ? (
        <Planets handleShowMessage={handleShowMessage} />
      ) : (
        <p>test</p>
      )} */}
    </div>
  );
};

export default App;
