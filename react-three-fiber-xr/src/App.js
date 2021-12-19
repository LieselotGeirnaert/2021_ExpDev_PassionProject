import { useState } from "react";
// components
import Parent from "./screens/Parent";
import Kid from "./screens/Kid";
// styling
import styles from "./styles/Home.module.css";

const App = () => {
  const [screen, setScreen] = useState("start");

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
    <section className={styles.container}>
      {/* {screen === "start" ? (
        ""
      ) : (
        <button
          type="submit"
          className={styles.back}
          onClick={() => setScreen("start")}
        >
          x
        </button>
      )} */}

      <h1 className="hidden">Tussen de sterren</h1>

      {screen === "start" ? (
        <section className={styles.start}>
          <h2 className="hidden">Start</h2>
          <p className={styles.title}>Tussen de sterren</p>
          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.button}
              onClick={() => setScreen("parent")}
            >
              Bekijk een universum
            </button>
            <button
              type="submit"
              className={styles.button}
              onClick={() => setScreen("kid")}
            >
              Bouw je eigen universum
            </button>
          </div>
        </section>
      ) : (
        ""
      )}

      {screen === "kid" ? <Kid /> : ""}
      {screen === "parent" ? <Parent /> : ""}
    </section>
  );
};

export default App;
