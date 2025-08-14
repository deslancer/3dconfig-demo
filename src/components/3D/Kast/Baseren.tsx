    
import { MaterialWrapper, MaterialType } from "../../helpers/Materials"
import { Kader } from "./Kader"
import { getPartitionPositions, getCabinetSections } from "../../helpers/helpers"
import { UV_PRESETS } from "../../types/UVTypes"
import { KastSection } from "../../types/SectionsTypes"
import { SectionWireframe } from "./SectionWireframe"
import { InhoudBuilder } from "./Inhoud/InhoudBuilder"
import { useState, useEffect, useCallback } from "react"
import { useActiveSection } from "../../store"


interface BaserenProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    wallThickness?: number 
    onSectionChange?: (sections: KastSection[]) => void
    onActiveSectionChange?: (activeSectionId: string | null) => void
    onGetSectionClickHandler?: (handler: (sectionId: string) => void) => void
    sectionClickHandler?: (sectionId: string) => void
}

export const Baseren = (props: BaserenProps) => {
    const { width, height, depth, materialType, wallThickness = 0.02, onSectionChange, onActiveSectionChange, onGetSectionClickHandler, sectionClickHandler } = props
    const { activeSectionId, setActiveSectionId } = useActiveSection()
    const partitionPositions = getPartitionPositions(width, wallThickness)
    const [sections, setSections] = useState<KastSection[]>([])


    useEffect(() => {
        const newSections = getCabinetSections(width, height, depth, wallThickness)
        setSections(newSections)
        onSectionChange?.(newSections)
    }, [width, height, depth, wallThickness])



    const handleSectionHover = (sectionId: string | null) => {
        setSections(prevSections => 
            prevSections.map(section => ({
                ...section,
                isHovered: section.id === sectionId && !section.isActive
            }))
        )
    }

    const handleSectionClick = useCallback((sectionId: string) => {
        if (activeSectionId === sectionId) {
            setSections(prevSections => 
                prevSections.map(section => ({
                    ...section,
                    isActive: false
                }))
            )
            setActiveSectionId(null)
            onActiveSectionChange?.(null)
        } else {
            setSections(prevSections => 
                prevSections.map(section => ({
                    ...section,
                    isActive: section.id === sectionId
                }))
            )
            setActiveSectionId(sectionId)
            onActiveSectionChange?.(sectionId)
        }
    }, [activeSectionId, onActiveSectionChange])

    useEffect(() => {
        onGetSectionClickHandler?.(handleSectionClick)
    }, [handleSectionClick, onGetSectionClickHandler])

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
                <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
                
            <mesh position={[-width / 2 + wallThickness / 2, height / 2 + wallThickness / 2, 0]} castShadow onClick={(e) => e.stopPropagation()}>
                <boxGeometry args={[wallThickness, height - wallThickness, depth]} />
                <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.NORMAL} />
            </mesh>
                    
            <mesh position={[width / 2 - wallThickness / 2, height / 2 + wallThickness / 2, 0]} castShadow onClick={(e) => e.stopPropagation()}>
                <boxGeometry args={[wallThickness, height - wallThickness, depth]} />
                <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.NORMAL} />
            </mesh>

            {/* Back */}       
            <mesh position={[0, height / 2 + wallThickness / 2, -depth / 2 + wallThickness / 2]} castShadow onClick={(e) => e.stopPropagation()}>
                <boxGeometry args={[width - 2 * wallThickness, height, wallThickness]} />
                <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.TILE_4X1} />
            </mesh>

            {/* Top */}
            <mesh position={[0, height + wallThickness / 2, 0]} castShadow onClick={(e) => e.stopPropagation()}>
                <boxGeometry args={[width, wallThickness, depth]} />
                <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>

            <Kader width={width} height={height} depth={depth} wallThickness={wallThickness} materialType={materialType} />
            
            {partitionPositions.map((x, index) => (
                <mesh 
                    key={`partition-${index}`}  
                    position={[x, height / 2 + wallThickness / 2, 0]} 
                    castShadow
                    onClick={(e) => e.stopPropagation()}
                >
                    <boxGeometry args={[wallThickness, height, depth - 2 * wallThickness]} />
                    <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.NORMAL} />
                </mesh>
            ))}   

            <SectionWireframe 
                sections={sections}
                wallThickness={wallThickness}
                onSectionHover={handleSectionHover}
                onSectionClick={sectionClickHandler || handleSectionClick}
            />

            {/* Render inhoud voor elke sectie */}
            {sections.map((section) => (
                <group 
                    key={`content-${section.id}`}
                    position={[section.x, height / 2 + wallThickness / 2, 0]}
                >
                    <InhoudBuilder
                        sectionId={section.id}
                        sectionWidth={section.width}
                        sectionHeight={section.height}
                        sectionDepth={section.depth}
                        materialType={materialType}
                    />
                </group>
            ))}
        </group>
        
    )
}