import { Interactive } from "@react-three/xr";

const Message = ({ name, location, handleClickMessage }) => {
  const onSelect = () => {
    console.log("select!!!!");
    handleClickMessage();
  };

  return (
    <Interactive onSelect={onSelect}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
    </Interactive>
  );
};

export default Message;
