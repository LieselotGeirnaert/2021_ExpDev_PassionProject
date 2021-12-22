import { useTexture } from "@react-three/drei";

const CustomPlanet = ({ name, location }) => {
  const texture = useTexture(`assets/img/planets/${name}.jpeg`);

  return (
    <>
      
      <mesh position={location}>
        <sphereGeometry args={[0.1, 32, 16]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  );
};

export default CustomPlanet;
