import { useGLTF } from "@react-three/drei";

const Planet = ({ name }) => {
  // const model = useGLTF(`assets/img/planets/Moon_1_3474.glb`);
  const model = useGLTF(`assets/img/planets/earth.gltf`);
  console.log(model);
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 0, 5]} />
      <primitive object={model.scene} scale={1} position={[0, -2, 0]} />
    </>
  );
};

export default Planet;
