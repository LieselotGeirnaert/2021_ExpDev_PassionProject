import { useState, useEffect, Suspense } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ARCanvas } from "@react-three/xr";
// components
// styling
import styles from "./AddPlanet.module.css";

const AddPlanet = ({ handleSetScreen }) => {


  return (
    <section className={styles.container}>
      <button className="back" onClick={() => handleSetScreen("kid")}>
        <span className="hidden">Terug</span>
      </button>
      <h3 className="hidden">Planeten</h3>
    </section>
  );
};

export default AddPlanet;
