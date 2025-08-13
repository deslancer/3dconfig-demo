
import { useState } from "react"
import { InhoudType } from "../../types/InhoudTypes"
import { useActiveSection } from "../../store"
import { INHOUD_CONFIGS } from "../../helpers/inhoud_configs"


export const Inhoud = () => {
    const { activeSectionId } = useActiveSection()
    const [currentInhoudType, setCurrentInhoudType] = useState<InhoudType>('INHOUD_0')

    const handleInhoudChange = (id: InhoudType) => {
        console.log(INHOUD_CONFIGS[id])
        console.log(activeSectionId)
        setCurrentInhoudType(id)
    }


    return (
        <div className="space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
                <div 
                    onClick={() => handleInhoudChange('INHOUD_0')} 
                    className={`p-1 cursor-pointer hover:border-2 border-light-blue rounded-md ${
                        currentInhoudType === 'INHOUD_0' ? 'border-2 border-light-blue bg-blue-50' : ''
                    }`}
                >
                    <img src="https://placehold.co/100x100" alt="Empty section" className="w-full h-full" />
                  
                </div>
                <div 
                    onClick={() => handleInhoudChange('INHOUD_1')} 
                    className={`p-1 cursor-pointer hover:border-2 border-light-blue rounded-md ${
                        currentInhoudType === 'INHOUD_1' ? 'border-2 border-light-blue bg-blue-50' : ''
                    }`}
                >
                    <img src="https://placehold.co/100x100" alt="5 shelves" className="w-full h-full" />
                   
                </div>
                <div 
                    onClick={() => handleInhoudChange('INHOUD_2')} 
                    className={`p-1 cursor-pointer hover:border-2 border-light-blue rounded-md ${
                        currentInhoudType === 'INHOUD_2' ? 'border-2 border-light-blue bg-blue-50' : ''
                    }`}
                >
                    <img src="https://placehold.co/100x100" alt="4 shelves + 1 drawer" className="w-full h-full" />
                    
                </div>
                <div 
                    onClick={() => handleInhoudChange('INHOUD_3')} 
                    className={`p-1 cursor-pointer hover:border-2 border-light-blue rounded-md ${
                        currentInhoudType === 'INHOUD_3' ? 'border-2 border-light-blue bg-blue-50' : ''
                    }`}
                >
                    <img src="https://placehold.co/100x100" alt="4 shelves + 2 drawers" className="w-full h-full" />
                    
                </div>
            </div>
        </div>
    )
}