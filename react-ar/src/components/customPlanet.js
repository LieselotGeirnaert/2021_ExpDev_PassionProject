import { useTexture } from "@react-three/drei";

const CustomPlanet = ({ name, location }) => {
  const marsTexture = useTexture(`assets/img/planets/${name}.jpeg`);

  console.log(name);
  console.log(location);
  return (
    <>
      
      <mesh position={location}>
        <sphereGeometry args={[0.1, 32, 16]} />
        <meshStandardMaterial map={marsTexture} />
      </mesh>
    </>
  );
};

export default CustomPlanet;
