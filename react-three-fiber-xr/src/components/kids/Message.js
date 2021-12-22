import { Interactive } from "@react-three/xr";

const Message = ({ name, location, handleClickMessage }) => {
  const onSelect = () => {
    console.log("geklikt op bericht");
    handleClickMessage();
  };

  return (
    <Interactive onSelect={onSelect}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
    </Interactive>
  );
};

export default Message;
