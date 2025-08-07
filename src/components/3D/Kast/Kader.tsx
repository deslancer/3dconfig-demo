// import { RoundedBox } from "@react-three/drei"
import { getPartitionPositions, UV_PRESETS } from "../../helpers/helpers"
import { Material, MaterialType } from "../../helpers/Materials"

interface KaderProps {
    width: number
    height: number
    depth: number
    wallThickness: number
    texture: any
    materialType: MaterialType
}

export const Kader = (props: KaderProps) => {
    const { width, height, depth, wallThickness, materialType, texture } = props
    const plankWidth = 0.1
    const margin = plankWidth / 2
    const leftPosition = -width/2 + wallThickness + 0.005
    const rightPosition = width/2 - wallThickness - 0.005
    const partitionPositions = getPartitionPositions(width, wallThickness)
    return (
        <group>
            <mesh position={[0, height + margin + wallThickness, depth / 2 - wallThickness / 2]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[plankWidth, width, wallThickness]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
           </mesh>
           
            <mesh position={[0, -margin, depth / 2 - wallThickness / 2]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[plankWidth, width, wallThickness]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
           </mesh>

            <mesh position={[leftPosition, height / 2 + wallThickness / 2, depth / 2 + wallThickness / 2]}>
                <boxGeometry args={[plankWidth / 2, height - wallThickness, wallThickness]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
            </mesh>
            <mesh position={[rightPosition, height / 2 + wallThickness / 2, depth / 2]}>
                <boxGeometry args={[plankWidth / 2, height - wallThickness, wallThickness]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
            </mesh>
            {partitionPositions.map((x, index) => (
                <mesh key={index} position={[x, height / 2 + wallThickness / 2, depth / 2 - wallThickness / 2]}>
                    <boxGeometry args={[plankWidth / 2, height - wallThickness, wallThickness]} />
                    <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
                </mesh>
            ))}
        </group>
    )
}