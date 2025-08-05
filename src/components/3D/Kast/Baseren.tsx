interface BaserenProps {
    width: number
    height: number
    depth: number
    material: string
    wallThickness?: number 
}

export const Baseren = (props: BaserenProps) => {
    const { width, height, depth, material, wallThickness = 0.02 } = props
    
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
        <group>
            
            <mesh position={[0, wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[width, wallThickness, depth]} />
                <meshStandardMaterial color={material} />
            </mesh>
                
            <mesh position={[-width / 2 + wallThickness / 2, height / 2 + wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[wallThickness, height, depth]} />
                <meshStandardMaterial color={material} />
            </mesh>
                    
            <mesh position={[width / 2 - wallThickness / 2, height / 2 + wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[wallThickness, height, depth]} />
                <meshStandardMaterial color={material} />
            </mesh>
                   
            <mesh position={[0, height / 2 + wallThickness / 2, -depth / 2 + wallThickness / 2]} castShadow>
                <boxGeometry args={[width - 2 * wallThickness, height, wallThickness]} />
                <meshStandardMaterial color={material} />
            </mesh>
              
            <mesh position={[0, height + wallThickness / 2, 0]} castShadow>
                <boxGeometry args={[width, wallThickness, depth]} />
                <meshStandardMaterial color={material} />
            </mesh>
            
            {partitionPositions.map((x, index) => (
                <mesh 
                    key={`partition-${index}`}
                    position={[x, height / 2 + wallThickness / 2, 0]} 
                    castShadow
                >
                    <boxGeometry args={[wallThickness, height, depth]} />
                    <meshStandardMaterial color={material} />
                </mesh>
            ))}
        </group>
    )
}