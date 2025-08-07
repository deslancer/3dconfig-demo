import { MaterialType, getMaterialConfig } from "../../helpers/Materials"

interface DeurenProps {
    width: number;
    height: number;
    depth: number;
    wallThickness: number;
    materialType: MaterialType;
}

export const Deuren = (props: DeurenProps) => {
  
  const deurWidth = props.width / 4 - props.wallThickness
  return (
    <group position={[0, props.height / 2 + 0.1, props.depth / 2]}>
        {/* Left deur */}
        <group position={[-props.width /2 + 0.05, 0, props.wallThickness / 2]}>
            <axesHelper args={[1]} />
    
            <mesh position={[deurWidth / 2, props.wallThickness / 2, 0]}>
                <boxGeometry args={[deurWidth, props.height - props.wallThickness, props.wallThickness]} />
                <meshStandardMaterial color={'white'} />
            </mesh>
        </group>
        {/* Right deur */}
        <group position={[-props.width /4 - 0.05, 0, props.wallThickness / 2]}>
            <axesHelper args={[1]} />
            <mesh position={[deurWidth / 2, props.wallThickness / 2, 0]}>
                <boxGeometry args={[deurWidth, props.height - props.wallThickness, props.wallThickness]} />
                <meshStandardMaterial color={'white'} />
            </mesh>
        </group>
    </group>
  )
}