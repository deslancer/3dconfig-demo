import { useLoader } from "@react-three/fiber"
import { MaterialType } from "../../helpers/Materials"
import { Baseren } from "./Baseren"
import { Kastpoten } from "./Kastpoten"
import { TextureLoader } from "three"
import { Deuren } from "./Deuren"
import { CabinetSection } from "../../types/SectionsTypes"

interface KastProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    wallThickness?: number
    allDoorsOpen?: boolean
    onDoorStateChange?: (allOpen: boolean) => void
    onSectionChange?: (sections: CabinetSection[]) => void
    onActiveSectionChange?: (activeSectionId: string | null) => void
}

export const Kast = (props: KastProps) => {
    const { width, height, depth, materialType, wallThickness = 0.02, allDoorsOpen, onDoorStateChange, onSectionChange, onActiveSectionChange } = props
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
                onSectionChange={onSectionChange}
                onActiveSectionChange={onActiveSectionChange}
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
                onSectionClick={onActiveSectionChange}
            />
            <Kastpoten width={width} height={height} depth={depth} />
        </group>
    )
}