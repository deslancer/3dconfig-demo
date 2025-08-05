import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { Mesh } from "three";



export const Cube = () => {
  const cube = useRef<Mesh>(null);

  return (
    <>
    
      <RoundedBox
        args={[3, 3, 3]}
        radius={0.5}
        smoothness={4}
        position={[0, 1.5, 0]}
        ref={cube}
        castShadow
      >
        <meshStandardMaterial color="blue" roughness={0.2} metalness={0.9} />
      </RoundedBox>
    </>
  );
};