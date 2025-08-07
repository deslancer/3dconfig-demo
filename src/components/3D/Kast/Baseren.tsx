import { Deuren } from "./Deuren"
import { Kastpoten } from "./Kastpoten"
import { MaterialType, getMaterialConfig } from "../../helpers/Materials"

interface BaserenProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType // Изменили на MaterialType
    wallThickness?: number 
}

export const Baseren = (props: BaserenProps) => {
    const { width, height, depth, materialType, wallThickness = 0.02 } = props
    const materialConfig = getMaterialConfig(materialType)
    
    const sectionWidth = 1.0 
    const availableWidth = width - 2 * wallThickness 
    const numberOfPartitions = Math.floor(availableWidth / sectionWidth)
    
    const partitionPositions = []
    if (numberOfPartitions > 0) {
        const actualSectionWidth = availableWidth / (numberOfPartitions + 1)
        
        for (let i = 1; i <= numberOfPartitions; i++) {
            const x = -width / 2 + wallThickness + i * actualSectionWidth
            partitionPositions.push(x)
        }
    }
    
    return (
        <>
        <group position={[0, 0.10, 0]}>
            
            <mesh position={[0, wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[width, wallThickness, depth]} />
                <meshStandardMaterial {...materialConfig} />
            </mesh>
                
            <mesh position={[-width / 2 + wallThickness / 2, height / 2 + wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[wallThickness, height, depth]} />
                <meshStandardMaterial {...materialConfig} />
            </mesh>
                    
            <mesh position={[width / 2 - wallThickness / 2, height / 2 + wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[wallThickness, height, depth]} />
                <meshStandardMaterial {...materialConfig} />
            </mesh>
                   
            <mesh position={[0, height / 2 + wallThickness / 2, -depth / 2 + wallThickness / 2]} castShadow>
                <boxGeometry args={[width - 2 * wallThickness, height, wallThickness]} />
                <meshStandardMaterial {...materialConfig} />
            </mesh>
              
            <mesh position={[0, height + wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[width, wallThickness, depth]} />
                <meshStandardMaterial {...materialConfig} />
            </mesh>
            <mesh position={[0, height + 0.05, depth / 2 - wallThickness / 2]}>
                <boxGeometry args={[width, 0.1, wallThickness]} />
                <meshStandardMaterial {...materialConfig} />
            </mesh>
            <mesh position={[0, -0.05, depth / 2 - wallThickness / 2]}>
                <boxGeometry args={[width, 0.1, wallThickness]} />
                <meshStandardMaterial {...materialConfig} />
            </mesh>
            
            {partitionPositions.map((x, index) => (
                <mesh 
                    key={`partition-${index}`}
                    position={[x, height / 2 + wallThickness / 2, 0]} 
                    castShadow
                >
                    <boxGeometry args={[wallThickness, height, depth]} />
                    <meshStandardMaterial {...materialConfig} />
                </mesh>
            ))}
            
            <Deuren width={width} height={height} depth={depth} wallThickness={wallThickness} materialType={materialType} />
        </group>
        <Kastpoten width={width} height={height} depth={depth} />
        </>
        
    )
}