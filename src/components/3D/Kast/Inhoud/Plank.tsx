import { UV_PRESETS } from "../../../types/UVTypes"
import { MaterialType, MaterialWrapper } from "../../../helpers/Materials"

interface PlankProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    position: [number, number, number]
}

export const Plank = (props: PlankProps) => {
    const { width, height, depth, materialType, position } = props
    return (
        <mesh position={position} castShadow>
            <boxGeometry args={[width, height, depth]} />
            <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.ROTATE_90} />
        </mesh>
    )
}