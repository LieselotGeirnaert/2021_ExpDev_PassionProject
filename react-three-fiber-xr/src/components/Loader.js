import { Html, useProgress } from "@react-three/drei";
import styles from "./Loader.module.css";

const Loader = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <p className={styles.text}>{progress.toFixed(0)} %</p>
    </Html>
  );
};

export default Loader;
