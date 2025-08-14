
import { useState } from "react"
import { InhoudType } from "../../types/InhoudTypes"
import { useActiveSection } from "../../store"
import { INHOUD_CONFIGS } from "../../helpers/inhoud_configs"
import { useAppStore } from "../../store/appStore"
import Swal from "sweetalert2"

export const Inhoud = () => {
    const { activeSectionId } = useActiveSection()
    const { setSectionContent, sectionsContent } = useAppStore()
    const [currentInhoudType, setCurrentInhoudType] = useState<InhoudType>('INHOUD_0')

    const handleInhoudChange = (id: InhoudType) => {
        if (!activeSectionId) {
            Swal.fire({
                icon: "error",
                title: "Oeps...",
                text: "Kies eerst een sectie!",
                buttonsStyling: false,
              });
            return
        }

        const config = INHOUD_CONFIGS[id]
        setSectionContent(activeSectionId, config)
        setCurrentInhoudType(id)
        
        console.log(`Inhoud ${id} voor sectie ${activeSectionId}:`, config)
    }

    const currentConfig = activeSectionId ? sectionsContent[activeSectionId] : null


    return (
        <div className="space-y-4 flex-1">
        
            <div className="mb-4 p-3 bg-gray-50 rounded-md">
                {activeSectionId ? (
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            Actieve sectie: {activeSectionId}
                        </p>
                        {currentConfig && (
                            <p className="text-xs text-gray-600 mt-1">
                                Planken: {currentConfig.planken}, Doosjes: {currentConfig.drawers}
                            </p>
                        )}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">Kies een sectie voor inhoud</p>
                )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div 
                    onClick={() => handleInhoudChange('INHOUD_0')} 
                    className={`p-1 cursor-pointer hover:border-2 border-light-blue rounded-md ${
                        currentInhoudType === 'INHOUD_0' ? 'border-2 border-light-blue bg-blue-50' : ''
                    }`}
                >
                    <img src="assets/inhoud_0.png" alt="Empty section" className="w-full h-full" />
                  
                </div>
                <div 
                    onClick={() => handleInhoudChange('INHOUD_1')} 
                    className={`p-1 cursor-pointer hover:border-2 border-light-blue rounded-md ${
                        currentInhoudType === 'INHOUD_1' ? 'border-2 border-light-blue bg-blue-50' : ''
                    }`}
                >
                    <img src="assets/inhoud_1.png" alt="5 shelves" className="w-full h-full" />
                   
                </div>
                <div 
                    onClick={() => handleInhoudChange('INHOUD_2')} 
                    className={`p-1 cursor-pointer hover:border-2 border-light-blue rounded-md ${
                        currentInhoudType === 'INHOUD_2' ? 'border-2 border-light-blue bg-blue-50' : ''
                    }`}
                >
                    <img src="assets/inhoud_2.png" alt="4 shelves + 1 drawer" className="w-full h-full" />
                    
                </div>
                <div 
                    onClick={() => handleInhoudChange('INHOUD_3')} 
                    className={`p-1 cursor-pointer hover:border-2 border-light-blue rounded-md ${
                        currentInhoudType === 'INHOUD_3' ? 'border-2 border-light-blue bg-blue-50' : ''
                    }`}
                >
                    <img src="assets/inhoud_3.png" alt="4 shelves + 2 drawers" className="w-full h-full" />
                    
                </div>
            </div>
        </div>
    )
}