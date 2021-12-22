import { useState, useEffect, Suspense } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Canvas } from "@react-three/fiber";
// components
import { db } from "../../firebase-config";
import Loader from "../Loader";
import Planet from "./Planet";
// styling
import styles from "./Overview.module.css";

const Overview = ({ handleSetScreen }) => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "planets"), (snapshot) => {
      setPlanets(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welkom in het universum van Lieselot</h2>
      <Canvas className={styles.canvas}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 0, 5]} />
        <Suspense fallback={<Loader />}>
          {planets.map((item, index) => (
            <Planet
              key={index}
              name={item.title}
              location={[item.locationX, item.locationY, item.locationZ]}
            />
          ))}
        </Suspense>
      </Canvas>
      <button
        type="submit"
        className={styles.button}
        onClick={() => handleSetScreen("message")}
      >
        Verstuur een berichtje
      </button>
    </div>
  );
};

export default Overview;
