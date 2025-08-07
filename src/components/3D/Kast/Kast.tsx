import { useLoader } from "@react-three/fiber"
import { MaterialType } from "../../helpers/Materials"
import { Baseren } from "./Baseren"
// import { Deuren } from "./Deuren"
import { Kastpoten } from "./Kastpoten"
import { TextureLoader } from "three"
import { Deuren } from "./Deuren"

interface KastProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    wallThickness?: number
}

export const Kast = (props: KastProps) => {
    const { width, height, depth, materialType, wallThickness = 0.02 } = props
    const colorMapDarkWood = useLoader(TextureLoader, '/assets/dark_wood.jpg')  
    return (
        <group>
            <Baseren 
                width={width} 
                height={height} 
                depth={depth} 
                materialType={materialType} 
                wallThickness={wallThickness}
                texture={colorMapDarkWood}
            />
{            <Deuren width={width} height={height} depth={depth} wallThickness={wallThickness} materialType={materialType} />
}            <Kastpoten width={width} height={height} depth={depth} />
        </group>
    )
}