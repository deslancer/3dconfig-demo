import React, { useState } from "react"
import { useSpring, animated, easings } from "@react-spring/three"
import { MaterialType, Material } from "../../helpers/Materials"
import { getDoorPositions } from "../../helpers/helpers"

interface DeurenProps {
    width: number;
    height: number;
    depth: number;
    wallThickness: number;
    materialType: MaterialType;
    texture?: any;
    allDoorsOpen?: boolean;
    onDoorStateChange?: (allOpen: boolean) => void;
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
}

const Door = ({ x, width, height, depth, wallThickness, hingePosition, isLeft, materialType, texture, isOpen, onToggle }: DoorProps) => {
    const openAngle = Math.PI / 2 
    const targetAngle = isOpen ? (isLeft ? -openAngle : openAngle) : 0
    
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
    
    return (
        <animated.group 
            position={[hingePosition, height / 2 + wallThickness, depth / 2 + wallThickness / 2]}
            rotation-y={rotationY}
            onClick={onToggle}
        >
            <mesh 
                position={[-hingeOffset, 0, 0]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[width, height - wallThickness, wallThickness]} />
                {texture ? (
                    <Material 
                        materialType={materialType} 
                        map={texture}
                    />
                ) : (
                    <meshStandardMaterial color="#f8f9fa" />
                )}
            </mesh>
        </animated.group>
    )
}

export const Deuren = (props: DeurenProps) => {
    const { width, height, depth, wallThickness, materialType, texture, allDoorsOpen = false, onDoorStateChange } = props
    const doorPositions = getDoorPositions(width, wallThickness)
    const deurenPosition = 0.1 - wallThickness / 2
    
    const [openDoors, setOpenDoors] = useState<{[key: string]: boolean}>({})
    
    React.useEffect(() => {
        if (allDoorsOpen !== undefined) {
            const newState: {[key: string]: boolean} = {}
            doorPositions.forEach((_, sectionIndex) => {
                newState[`${sectionIndex}-left`] = allDoorsOpen
                newState[`${sectionIndex}-right`] = allDoorsOpen
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
            
            const allKeys = doorPositions.flatMap((_, idx) => [`${idx}-left`, `${idx}-right`])
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
            {doorPositions.map((section, sectionIndex) => (
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
                    />
                    
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
                    />
                </group>
            ))}
        </group>
    )
}