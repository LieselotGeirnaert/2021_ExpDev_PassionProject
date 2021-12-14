import { useGLTF } from "@react-three/drei";
import { Interactive } from "@react-three/xr";
import { useState } from "react";

const Planet = ({ name, location, handleClickMessage }) => {
  const model = useGLTF(`assets/img/planets/${name}.glb`);
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState("blue");

  const onSelect = () => {
    console.log("select!!!!");
    setColor((Math.random() * 0xffffff) | 0);
    handleClickMessage();
  };

  const onHover = () => {
    console.log("hover!!!!");
    setHover(true);
  };

  return (
    <Interactive
      onSelect={onSelect}
    >
      <primitive
        object={model.scene}
        scale={hover ? [0.005, 0.005, 0.005] : [0.001, 0.001, 0.001]}
        position={location}
      />
    </Interactive>
  );
};

export default Planet;
