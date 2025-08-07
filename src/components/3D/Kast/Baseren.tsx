    
import { Material, MaterialType } from "../../helpers/Materials"
import { Kader } from "./Kader"
import { getPartitionPositions, UV_PRESETS } from "../../helpers/helpers"


interface BaserenProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    wallThickness?: number 
    texture: any
}

export const Baseren = (props: BaserenProps) => {
    const { width, height, depth, materialType, wallThickness = 0.02, texture } = props

    const partitionPositions = getPartitionPositions(width, wallThickness)
    
    return (
        
        <group position={[0, 0.10, 0]}>
            {/* Bottom */}
            <mesh position={[0, wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[width, wallThickness, depth]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
                
            <mesh position={[-width / 2 + wallThickness / 2, height / 2 + wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[wallThickness, height - wallThickness, depth]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
            </mesh>
                    
            <mesh position={[width / 2 - wallThickness / 2, height / 2 + wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[wallThickness, height - wallThickness, depth]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
            </mesh>

            {/* Back */}       
            <mesh position={[0, height / 2 + wallThickness / 2, -depth / 2 + wallThickness / 2]} castShadow>
                <boxGeometry args={[width - 2 * wallThickness, height, wallThickness]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
            </mesh>

            {/* Top */}
            <mesh position={[0, height + wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[width, wallThickness, depth]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>

            <Kader width={width} height={height} depth={depth} wallThickness={wallThickness} materialType={materialType} texture={texture} />
            
            {partitionPositions.map((x, index) => (
                <mesh 
                    key={`partition-${index}`}  
                    position={[x, height / 2 + wallThickness / 2, 0]} 
                    castShadow
                >
                    <boxGeometry args={[wallThickness, height, depth - 2 * wallThickness]} />
                    <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
                </mesh>
            ))}   
        </group>
        
    )
}