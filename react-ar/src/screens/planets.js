import { useState, useEffect, Suspense } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Html, useProgress } from "@react-three/drei";
import { ARCanvas, DefaultXRControllers } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
// components
import { db } from "../firebase-config";
import CustomPlanet from "../components/customPlanet";
import Message from "../components/message";
import Planet from "../components/planet";
// styling

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const Planets = ({ handleShowMessage }) => {
  const [screen, setScreen] = useState("AR");
  const [planets, setPlanets] = useState([]);
  const planetsCollectionRef = collection(db, "planets");

  useEffect(() => {
    const getPlanets = async () => {
      const data = await getDocs(planetsCollectionRef);
      setPlanets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPlanets();
  }, []);

  // const handleShowMessage = () => {
  //   // setScreen("message");
  //   console.log("setscreen");
  // };

  return (
    <>
      {screen === "AR" ? (
        <ARCanvas>
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 0, 5]} />
          <Suspense fallback={<Loader />}>
            {/* {planets.map((item, index) => (
          <Planet
            key={index}
            name={item.title}
            location={[item.locationX, item.locationY, item.locationZ]}
          />
        ))} */}
            {/* <Planet name={"earth"} location={[1, 1, 1]} /> */}
            <Message handleClickMessage={handleShowMessage} />
          </Suspense>
        </ARCanvas>
      ) : (
        <p>berichtje</p>
      )}
    </>
  );
};

export default Planets;
