// packages
import { ARCanvas, DefaultXRControllers } from "@react-three/xr";
import { Suspense, useEffect, useState } from "react";
import { useProgress, Html } from "@react-three/drei";
import { collection, getDocs } from "firebase/firestore/lite";
// components and services
import { db } from "./firebase-config";

import CustomPlanet from "./components/customPlanet";
// import Planet from "./components/planet";
// styling
import "./App.css";

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const App = () => {
  const [planets, setPlanets] = useState([]);
  const planetsCollection = collection(db, "planets");

  console.log(db);

  useEffect(() => {
    const getPlanets = async () => {
      const data = await getDocs(planetsCollection);
      setPlanets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPlanets();
  }, []);


  console.log(planets);
  return (
    <p>hallo</p>
    // <ARCanvas>
    //   <Suspense fallback={<Loader />}>

    //     <CustomPlanet name={"mars"} />

    //   </Suspense>
    // </ARCanvas>
  );
};

export default App;
