import { useGLTF } from "@react-three/drei";

const Planet = ({ name, location }) => {
  const model = useGLTF(`assets/img/planets/${name}.glb`);

  return (
      <primitive object={model.scene} scale={0.001} position={location} />
  );
};

export default Planet;
