import { TextureLoader } from "three"
import { UV_PRESETS } from "../../../types/UVTypes"
import { useLoader } from "@react-three/fiber"
import { MaterialType, MaterialWrapper } from "../../../helpers/Materials"

interface DoosProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    position: [number, number, number]
}
export const Doos = (props: DoosProps) => {
    const { width, height, depth, materialType, position } = props
    const wallThickness = 0.02
    const colorMapDarkWood = useLoader(TextureLoader, '/assets/dark_wood.jpg')

    return (
        <group position={position}>
            {/* Back */}
            <mesh position={[0, 0, depth / 2]} castShadow >
                <boxGeometry args={[width, height, wallThickness]} />
                <MaterialWrapper materialType={materialType} map={colorMapDarkWood}  uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
           {/* Front */}
            <mesh position={[0, 0, -depth / 2]} castShadow >
                <boxGeometry args={[width, height, wallThickness]} />
                <MaterialWrapper materialType={materialType} map={colorMapDarkWood} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
            {/* Right */}
             <mesh position={[width / 2 - wallThickness / 2, 0, 0]} castShadow >
                <boxGeometry args={[wallThickness, height, depth - wallThickness]} />
                <MaterialWrapper materialType={materialType} map={colorMapDarkWood} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
            {/* Left */}
            <mesh position={[-width / 2 + wallThickness / 2, 0, 0]} castShadow >
                <boxGeometry args={[wallThickness, height, depth - wallThickness]} />
                <MaterialWrapper materialType={materialType} map={colorMapDarkWood} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
    
            {/* Bottom */}
            <mesh position={[0, -height / 2 + wallThickness / 2, 0]} castShadow >
                <boxGeometry args={[width, wallThickness, depth]} />
                <MaterialWrapper materialType={materialType} map={colorMapDarkWood} uvTransform={UV_PRESETS.NORMAL} />
            </mesh> 
        </group>
    )
}