import { useLoader } from "@react-three/fiber"
import { MaterialType } from "../../helpers/Materials"
import { Baseren } from "./Baseren"
import { Kastpoten } from "./Kastpoten"
import { TextureLoader } from "three"
import { Deuren } from "./Deuren"
import { KastSection } from "../../types/SectionsTypes"
import { useState, useCallback } from "react"

interface KastProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    wallThickness?: number
    allDoorsOpen?: boolean
    onDoorStateChange?: (allOpen: boolean) => void
    onSectionChange?: (sections: KastSection[]) => void
    onActiveSectionChange?: (activeSectionId: string | null) => void
}

export const Kast = (props: KastProps) => {
    const { width, height, depth, materialType, wallThickness = 0.02, allDoorsOpen, onDoorStateChange, onSectionChange, onActiveSectionChange } = props
    const colorMapDarkWood = useLoader(TextureLoader, '/assets/dark_wood.jpg')
    
    const [baseSectionClickHandler, setBaseSectionClickHandler] = useState<((sectionId: string) => void) | null>(null)
    const [doorSectionClickHandler, setDoorSectionClickHandler] = useState<((sectionId: string) => void) | null>(null)

    const handleGetBaseSectionClickHandler = useCallback((handler: (sectionId: string) => void) => {
        setBaseSectionClickHandler(() => handler)
    }, [])

    const handleGetDoorSectionClickHandler = useCallback((handler: (sectionId: string) => void) => {
        setDoorSectionClickHandler(() => handler)
    }, [])

    const combinedSectionClickHandler = useCallback((sectionId: string) => {
        doorSectionClickHandler?.(sectionId)
        baseSectionClickHandler?.(sectionId)
    }, [doorSectionClickHandler, baseSectionClickHandler])
    
    return (
        <group>
            <Baseren 
                width={width} 
                height={height} 
                depth={depth} 
                materialType={materialType} 
                wallThickness={wallThickness}
                texture={colorMapDarkWood}
                onSectionChange={onSectionChange}
                onActiveSectionChange={onActiveSectionChange}
                onGetSectionClickHandler={handleGetBaseSectionClickHandler}
                sectionClickHandler={combinedSectionClickHandler}
            />
            <Deuren 
                width={width} 
                height={height} 
                depth={depth} 
                wallThickness={wallThickness} 
                materialType={materialType}
                texture={colorMapDarkWood}
                allDoorsOpen={allDoorsOpen}
                onDoorStateChange={onDoorStateChange}
                onGetSectionClickHandler={handleGetDoorSectionClickHandler}
            />
            <Kastpoten width={width} height={height} depth={depth} />
        </group>
    )
}