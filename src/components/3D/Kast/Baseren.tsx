    
import { Material, MaterialType } from "../../helpers/Materials"
import { Kader } from "./Kader"
import { getPartitionPositions, getCabinetSections } from "../../helpers/helpers"
import { UV_PRESETS } from "../../types/UVTypes"
import { CabinetSection } from "../../types/SectionsTypes"
import { SectionWireframe } from "./SectionWireframe"
import { useState, useEffect } from "react"


interface BaserenProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    wallThickness?: number 
    texture: any
    onSectionChange?: (sections: CabinetSection[]) => void
    onActiveSectionChange?: (activeSectionId: string | null) => void
}

export const Baseren = (props: BaserenProps) => {
    const { width, height, depth, materialType, wallThickness = 0.02, texture, onSectionChange, onActiveSectionChange } = props

    const partitionPositions = getPartitionPositions(width, wallThickness)
    const [sections, setSections] = useState<CabinetSection[]>([])
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

    useEffect(() => {
        const newSections = getCabinetSections(width, height, depth, wallThickness)
        setSections(newSections)
        onSectionChange?.(newSections)
    }, [width, height, depth, wallThickness, onSectionChange])

    const handleSectionHover = (sectionId: string | null) => {
        setSections(prevSections => 
            prevSections.map(section => ({
                ...section,
                isHovered: section.id === sectionId
            }))
        )
    }

    const handleSectionClick = (sectionId: string) => {
        setSections(prevSections => 
            prevSections.map(section => ({
                ...section,
                isActive: section.id === sectionId
            }))
        )
        setActiveSectionId(sectionId)
        onActiveSectionChange?.(sectionId)
    }

    const handleBackgroundClick = () => {
        setSections(prevSections => 
            prevSections.map(section => ({
                ...section,
                isActive: false
            }))
        )
        setActiveSectionId(null)
        onActiveSectionChange?.(null)
    }
    
    return (
        
        <group position={[0, 0.10, 0]} onClick={handleBackgroundClick}>
            {/* Bottom */}
            <mesh position={[0, wallThickness / 2, 0]} castShadow onClick={(e) => e.stopPropagation()}>
                <boxGeometry args={[width, wallThickness, depth]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
                
            <mesh position={[-width / 2 + wallThickness / 2, height / 2 + wallThickness / 2, 0]} castShadow onClick={(e) => e.stopPropagation()}>
                <boxGeometry args={[wallThickness, height - wallThickness, depth]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
            </mesh>
                    
            <mesh position={[width / 2 - wallThickness / 2, height / 2 + wallThickness / 2, 0]} castShadow onClick={(e) => e.stopPropagation()}>
                <boxGeometry args={[wallThickness, height - wallThickness, depth]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
            </mesh>

            {/* Back */}       
            <mesh position={[0, height / 2 + wallThickness / 2, -depth / 2 + wallThickness / 2]} castShadow onClick={(e) => e.stopPropagation()}>
                <boxGeometry args={[width - 2 * wallThickness, height, wallThickness]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
            </mesh>

            {/* Top */}
            <mesh position={[0, height + wallThickness / 2, 0]} castShadow onClick={(e) => e.stopPropagation()}>
                <boxGeometry args={[width, wallThickness, depth]} />
                <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>

            <Kader width={width} height={height} depth={depth} wallThickness={wallThickness} materialType={materialType} texture={texture} />
            
            {partitionPositions.map((x, index) => (
                <mesh 
                    key={`partition-${index}`}  
                    position={[x, height / 2 + wallThickness / 2, 0]} 
                    castShadow
                    onClick={(e) => e.stopPropagation()}
                >
                    <boxGeometry args={[wallThickness, height, depth - 2 * wallThickness]} />
                    <Material materialType={materialType} map={texture} uvTransform={UV_PRESETS.NORMAL} />
                </mesh>
            ))}   

            <SectionWireframe 
                sections={sections}
                wallThickness={wallThickness}
                onSectionHover={handleSectionHover}
                onSectionClick={handleSectionClick}
            />
        </group>
        
    )
}