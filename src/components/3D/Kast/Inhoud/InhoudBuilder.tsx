import { useAppStore } from "../../../store/appStore"
import { generateSectionContent } from "../../../helpers/inhoudGenerator"
import { Plank } from "./Plank"
import { Doos } from "./Doos"
import { MaterialType } from "../../../helpers/Materials"

interface InhoudBuilderProps {
  sectionId: string
  sectionWidth: number
  sectionHeight: number
  sectionDepth: number
  materialType: MaterialType
}

export const InhoudBuilder = ({ 
  sectionId, 
  sectionWidth, 
  sectionHeight, 
  sectionDepth, 
  materialType 
}: InhoudBuilderProps) => {
    const { sectionsContent, drawerStates } = useAppStore()
    const sectionConfig = sectionsContent[sectionId]

    if (!sectionConfig) {
        return null
    }
    
    const { planken, drawers } = generateSectionContent({
        sectionWidth,
        sectionHeight,
        sectionDepth,
        content: sectionConfig
    })

    return (
        <group>
           
            {planken.map((plank) => (
                <Plank
                    key={plank.id}
                    width={plank.width}
                    height={plank.height}
                    depth={plank.depth}
                    position={plank.position}
                    materialType={materialType}
                />
            ))}
            
            {drawers.map((drawer) => (
                <Doos
                    key={drawer.id}
                    width={drawer.width}
                    height={drawer.height}
                    depth={drawer.depth}
                    position={drawer.position}
                    materialType={materialType}
                    isExtended={drawerStates[sectionId] || false}
                />
            ))}
        </group>
    )
}