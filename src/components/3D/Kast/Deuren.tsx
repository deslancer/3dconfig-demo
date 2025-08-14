import React, { useState, useCallback } from "react"
import { useSpring, animated, easings } from "@react-spring/three"
import { MaterialType, MaterialWrapper } from "../../helpers/Materials"
import { getDoorPositions } from "../../helpers/helpers"
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useAppStore } from "../../store/appStore"

interface DeurenProps {
    width: number;
    height: number;
    depth: number;
    wallThickness: number;
    materialType: MaterialType;
    texture?: any;
    allDoorsOpen?: boolean;
    onDoorStateChange?: (allOpen: boolean) => void;
    onGetSectionClickHandler?: (handler: (sectionId: string) => void) => void;
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
    isEdgeDoor?: boolean;
}

const Door = ({ x, width, height, depth, wallThickness, hingePosition, isLeft, materialType, texture, isOpen, isEdgeDoor = true }: DoorProps) => {
    const openAngle = isEdgeDoor ? Math.PI / 2 : (84 * Math.PI / 180)
    const [shouldAnimate, setShouldAnimate] = useState(isOpen)
    const targetAngle = shouldAnimate ? (isLeft ? -openAngle : openAngle) : 0
    const handleMesh = useLoader(GLTFLoader, 'assets/Handle.glb')

    React.useEffect(() => {
        if (isOpen) {
            setShouldAnimate(true)
        } else {
            const timer = setTimeout(() => {
                setShouldAnimate(false)
            }, 600)
            
            return () => clearTimeout(timer)
        }
    }, [isOpen])

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
  
    
    return (
        <animated.group 
            position={[hingePosition, height / 2 + wallThickness, depth / 2 + wallThickness / 2]}
            rotation-y={rotationY}
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
    const { width, height, depth, wallThickness, materialType, texture, allDoorsOpen = false, onDoorStateChange, onGetSectionClickHandler } = props
    const doorPositions = getDoorPositions(width, wallThickness)
    const deurenPosition = 0.1 - wallThickness / 2
    const { setDrawerState } = useAppStore()
    
    const [openDoors, setOpenDoors] = useState<{[key: string]: boolean}>({})
    const [isToggling, setIsToggling] = useState(false)
    const [lastAllDoorsState, setLastAllDoorsState] = useState<boolean | undefined>(allDoorsOpen)
    
    React.useEffect(() => {
        if (allDoorsOpen !== undefined && allDoorsOpen !== lastAllDoorsState) {
            const newState: {[key: string]: boolean} = {}
            doorPositions.forEach((section, sectionIndex) => {
                newState[`${sectionIndex}-left`] = allDoorsOpen
                if (section.rightDoor) {
                    newState[`${sectionIndex}-right`] = allDoorsOpen
                }
            })
            setOpenDoors(newState)
            setLastAllDoorsState(allDoorsOpen)
        }
    }, [allDoorsOpen, doorPositions, lastAllDoorsState])

    React.useEffect(() => {
        if (allDoorsOpen !== undefined && allDoorsOpen === lastAllDoorsState) {
            const timer = setTimeout(() => {
                doorPositions.forEach((_, sectionIndex) => {
                    setDrawerState(`section-${sectionIndex}`, allDoorsOpen)
                })
            }, 0)
            
            return () => clearTimeout(timer)
        }
    }, [allDoorsOpen, doorPositions.length, setDrawerState, lastAllDoorsState])

    const toggleSectionDoors = useCallback((sectionId: string) => {
        if (isToggling) {
            return
        }
        
        const sectionIndex = parseInt(sectionId.split('-')[1])
        
        if (isNaN(sectionIndex) || sectionIndex >= doorPositions.length) {
            return
        }
        
        setIsToggling(true)
        
        setOpenDoors(prev => {
            const sectionKeys = [`${sectionIndex}-left`]
            const section = doorPositions[sectionIndex]
            if (section?.rightDoor) {
                sectionKeys.push(`${sectionIndex}-right`)
            }
            
            const sectionHasOpenDoor = sectionKeys.some(k => prev[k])
            
            const newState = { ...prev }
            sectionKeys.forEach(key => {
                newState[key] = !sectionHasOpenDoor
            })
            
            setTimeout(() => {
                setDrawerState(`section-${sectionIndex}`, !sectionHasOpenDoor)
            }, 0)
            
            return newState
        })
        
        setTimeout(() => {
            setIsToggling(false)
        }, 100)
    }, [doorPositions, onDoorStateChange, setDrawerState, isToggling])

    const handleSectionClick = useCallback((sectionId: string) => {
        toggleSectionDoors(sectionId)
    }, [toggleSectionDoors])

    React.useEffect(() => {
        onGetSectionClickHandler?.(handleSectionClick)
    }, [handleSectionClick, onGetSectionClickHandler])
    
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
                            isEdgeDoor={leftDoorIsEdge}
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
                                isEdgeDoor={rightDoorIsEdge}
                            />
                        )}
                    </group>
                )
            })}
        </group>
    )
}
