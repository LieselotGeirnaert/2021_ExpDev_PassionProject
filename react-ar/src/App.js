import { useState, useEffect, Suspense } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Html, useProgress } from "@react-three/drei";
import { ARCanvas, DefaultXRControllers } from "@react-three/xr";
// components
import { db } from "./firebase-config";
import CustomPlanet from "./components/customPlanet";
// styling
import "./App.css";
import { Canvas } from "@react-three/fiber";

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const App = () => {
  const [planets, setPlanets] = useState([]);
  const planetsCollectionRef = collection(db, "planets");

  useEffect(() => {
    const getPlanets = async () => {
      const data = await getDocs(planetsCollectionRef);
      setPlanets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPlanets();
  }, []);

  return (
    <ARCanvas>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 0, 5]} />
      <Suspense fallback={<Loader />}>
        {planets.map((item, index) => (
          <CustomPlanet
            key={index}
            name={item.title}
            location={[item.locationX, item.locationY, item.locationZ]}
          />
        ))}
      </Suspense>
    </ARCanvas>
  );
};

export default App;
