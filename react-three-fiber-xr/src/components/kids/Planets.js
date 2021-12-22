import { useState, useEffect, Suspense } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ARCanvas } from "@react-three/xr";
// components
import { db } from "../../firebase-config";
import Loader from "../Loader";
import Planet from "../Planet";
// styling
import styles from "./Planets.module.css";

const Planets = ({ handleSetScreen }) => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const data = await getDocs(collection(db, "planets"));
      setPlanets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPlanets();
  }, []);

  return (
    <section className={styles.container}>
      <button className="back" onClick={() => handleSetScreen("kid")}>
        <span className="hidden">Terug</span>
      </button>
      <h3 className="hidden">Planeten</h3>

      <ARCanvas className={styles.canvas}>
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
      </ARCanvas>
    </section>
  );
};

export default Planets;
