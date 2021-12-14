import { setDoc, doc } from "firebase/firestore";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
// components
import { db } from "../firebase-config";
import generateId from "../utils";

const Scanner = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imgSrc);

    const writePlanet = async () => {
      await setDoc(doc(db, "planets", generateId(15)), {
        title: "test",
        image: imageSrc
      });
    }

    writePlanet();
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} />}
    </>
  );
};

export default Scanner;
