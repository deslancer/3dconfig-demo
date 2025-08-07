import { MaterialType, getMaterialConfig } from "../../helpers/Materials"

interface DeurenProps {
    width: number;
    height: number;
    depth: number;
    wallThickness: number;
    materialType: MaterialType;
}

export const Deuren = (props: DeurenProps) => {
  const materialConfig = getMaterialConfig(props.materialType)
  
  return (
    <group position={[0, props.height / 2, props.depth / 2]}>
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[props.width / 2 - props.wallThickness, props.height, props.wallThickness]} />
            <meshStandardMaterial {...materialConfig} />
        </mesh>
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[props.width / 2 - props.wallThickness, props.height, props.wallThickness]} />
            <meshStandardMaterial {...materialConfig} />
        </mesh>
    </group>
  )
}