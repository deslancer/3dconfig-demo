import { MaterialType } from "../../helpers/Materials"
import { Baseren } from "./Baseren"

interface KastProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    wallThickness?: number
}

export const Kast = (props: KastProps) => {
    const { width, height, depth, materialType, wallThickness = 0.02 } = props

    return (
        <group>
            <Baseren 
                width={width} 
                height={height} 
                depth={depth} 
                materialType={materialType} 
                wallThickness={wallThickness}
            />
        </group>
    )
}