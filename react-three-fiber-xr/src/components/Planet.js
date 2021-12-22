import { useGLTF } from "@react-three/drei";
import { Interactive } from "@react-three/xr";

const Planet = ({ name, location }) => {
  const model = useGLTF(`assets/img/planets/${name}.glb`);

  const onSelect = () => {
    console.log("select!!!!");
  };

  return (
    <Interactive onSelect={onSelect}>
      <primitive
        object={model.scene}
        scale={[0.0005, 0.0005, 0.0005]}
        position={location}
      />
    </Interactive>
  );
};

export default Planet;
