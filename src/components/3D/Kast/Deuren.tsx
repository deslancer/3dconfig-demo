import React, { useState } from "react"
import { useSpring, animated, easings } from "@react-spring/three"
import { MaterialType, MaterialWrapper } from "../../helpers/Materials"
import { getDoorPositions } from "../../helpers/helpers"
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

interface DeurenProps {
    width: number;
    height: number;
    depth: number;
    wallThickness: number;
    materialType: MaterialType;
    texture?: any;
    allDoorsOpen?: boolean;
    onDoorStateChange?: (allOpen: boolean) => void;
    onSectionClick?: (sectionId: string) => void;
}

interface DoorProps {
    x: number;
    width: number;
    height: number;
    depth: number;
    wallThickness: number;
    hingePosition: number;
    isLeft: boolean;
    materialType: MaterialType;
    texture?: any;
    isOpen: boolean;
    onToggle: () => void;
    isEdgeDoor?: boolean;
    sectionIndex: number;
    onSectionClick?: (sectionId: string) => void;
}

const Door = ({ x, width, height, depth, wallThickness, hingePosition, isLeft, materialType, texture, isOpen, onToggle, isEdgeDoor = true, sectionIndex, onSectionClick }: DoorProps) => {
    const openAngle = isEdgeDoor ? Math.PI / 2 : (80 * Math.PI / 180)
    const targetAngle = isOpen ? (isLeft ? -openAngle : openAngle) : 0
    const handleMesh = useLoader(GLTFLoader, 'assets/Handle.glb')

    const { rotationY } = useSpring({
        rotationY: targetAngle,
        config: {
            mass: 1,
            tension: 200,
            friction: 25,
            duration: 500,
            easing: easings.easeOutCubic
        }
    })
    
    const hingeOffset = hingePosition - x
    
    const handleXOffset = isLeft ? -hingeOffset + 0.2 : -hingeOffset - 0.2
    const handleY = 0 
    const handleZ = wallThickness / 2 + 0.01 
  
    
    const handleClick = (e: any) => {
        e.stopPropagation()
        onToggle()
        onSectionClick?.(`section-${sectionIndex}`)
    }

    return (
        <animated.group 
            position={[hingePosition, height / 2 + wallThickness, depth / 2 + wallThickness / 2]}
            rotation-y={rotationY}
            onClick={handleClick}
        >
            <mesh 
                position={[-hingeOffset, 0, 0]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[width, height - wallThickness, wallThickness]} />
                {texture ? (
                    <MaterialWrapper 
                        materialType={materialType} 
                        map={texture}
                    />
                ) : (
                    <meshStandardMaterial color="#f8f9fa" />
                )}
            </mesh>
            <primitive 
                object={handleMesh.scene.clone()} 
                position={[handleXOffset, handleY, handleZ]} 
                rotation={[0, -Math.PI / 2, 0]}
                scale={[1, 1, 1]}
            />
            
        </animated.group>
    )
}

export const Deuren = (props: DeurenProps) => {
    const { width, height, depth, wallThickness, materialType, texture, allDoorsOpen = false, onDoorStateChange, onSectionClick } = props
    const doorPositions = getDoorPositions(width, wallThickness)
    const deurenPosition = 0.1 - wallThickness / 2
    
    const [openDoors, setOpenDoors] = useState<{[key: string]: boolean}>({})
    
    React.useEffect(() => {
        if (allDoorsOpen !== undefined) {
            const newState: {[key: string]: boolean} = {}
            doorPositions.forEach((section, sectionIndex) => {
                newState[`${sectionIndex}-left`] = allDoorsOpen
                if (section.rightDoor) {
                    newState[`${sectionIndex}-right`] = allDoorsOpen
                }
            })
            setOpenDoors(newState)
        }
    }, [allDoorsOpen, doorPositions])
    
    const toggleDoor = (sectionIndex: number, isLeft: boolean) => {
        const key = `${sectionIndex}-${isLeft ? 'left' : 'right'}`
        setOpenDoors(prev => {
            const newState = {
                ...prev,
                [key]: !prev[key]
            }
            
            const allKeys = doorPositions.flatMap((section, idx) => {
                const keys = [`${idx}-left`]
                if (section.rightDoor) {
                    keys.push(`${idx}-right`)
                }
                return keys
            })
            
            const allOpen = allKeys.every(k => newState[k])
            const allClosed = allKeys.every(k => !newState[k])
            
            if (onDoorStateChange) {
                if (allOpen) onDoorStateChange(true)
                else if (allClosed) onDoorStateChange(false)
            }
            
            return newState
        })
    }
    
    return (
        <group position={[0, deurenPosition, 0]}>
            {doorPositions.map((section, sectionIndex) => {
                const isFirstSection = sectionIndex === 0
                const isLastSection = sectionIndex === doorPositions.length - 1
                const totalSections = doorPositions.length
                
                
                const leftDoorIsEdge = isFirstSection || totalSections === 1
                const rightDoorIsEdge = isLastSection || !section.rightDoor
                
                return (
                    <group key={`door-section-${sectionIndex}`}>
                        <Door
                            x={section.leftDoor.x}
                            width={section.leftDoor.width}
                            height={height}
                            depth={depth}
                            wallThickness={wallThickness}
                            hingePosition={section.leftDoor.hingePosition}
                            isLeft={section.leftDoor.isLeft}
                            materialType={materialType}
                            texture={texture}
                            isOpen={openDoors[`${sectionIndex}-left`] || false}
                            onToggle={() => toggleDoor(sectionIndex, true)}
                            isEdgeDoor={leftDoorIsEdge}
                            sectionIndex={sectionIndex}
                            onSectionClick={onSectionClick}
                        />
                        
                        {section.rightDoor && (
                            <Door
                                x={section.rightDoor.x}
                                width={section.rightDoor.width}
                                height={height}
                                depth={depth}
                                wallThickness={wallThickness}
                                hingePosition={section.rightDoor.hingePosition}
                                isLeft={section.rightDoor.isLeft}
                                materialType={materialType}
                                texture={texture}
                                isOpen={openDoors[`${sectionIndex}-right`] || false}
                                onToggle={() => toggleDoor(sectionIndex, false)}
                                isEdgeDoor={rightDoorIsEdge}
                                sectionIndex={sectionIndex}
                                onSectionClick={onSectionClick}
                            />
                        )}
                    </group>
                )
            })}
        </group>
    )
}