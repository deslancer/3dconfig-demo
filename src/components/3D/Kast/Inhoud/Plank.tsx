import { UV_PRESETS } from "../../../types/UVTypes"
import { MaterialType, MaterialWrapper } from "../../../helpers/Materials"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

interface PlankProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    position: [number, number, number]
}

export const Plank = (props: PlankProps) => {
    const { width, height, depth, materialType, position } = props
    const colorMapDarkWood = useLoader(TextureLoader, '/assets/dark_wood.jpg')
    return (
        <mesh position={position} castShadow>
            <boxGeometry args={[width, height, depth]} />
            <MaterialWrapper materialType={materialType} map={colorMapDarkWood} uvTransform={UV_PRESETS.NORMAL} />
        </mesh>
    )
}