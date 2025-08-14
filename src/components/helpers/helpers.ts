import { ClampToEdgeWrapping, RepeatWrapping } from "three"
import { KastSection } from "../types/SectionsTypes"
import { UVTransform } from "../types/UVTypes"


export const getPartitionPositions = (width: number, wallThickness: number) => {
    const sectionWidth = 1.0 
    const availableWidth = width - 2 * wallThickness 
    const numberOfPartitions = Math.floor(availableWidth / sectionWidth)
    const partitionPositions = []
    if (numberOfPartitions > 0) {
        const actualSectionWidth = availableWidth / (numberOfPartitions + 1)
        
        for (let i = 1; i <= numberOfPartitions; i++) {
            const x = -width / 2 + wallThickness + i * actualSectionWidth
            partitionPositions.push(x)
        }
    }
    return partitionPositions
}

export const getDoorPositions = (width: number, wallThickness: number) => {
    const availableWidth = width - 2 * wallThickness
    const doorPositions = []
    
    if (width >= 0.25 && width <= 0.75) {
        const doorWidth = availableWidth - 0.01 
        const doorX = 0 
        
        doorPositions.push({
            leftDoor: {
                x: doorX,
                width: doorWidth,
                hingePosition: doorX - doorWidth / 2, 
                isLeft: true
            },
            rightDoor: null 
        })
    } else {
        const sectionWidth = 1.0
        const numberOfSections = Math.floor(availableWidth / sectionWidth) + 1
        const actualSectionWidth = availableWidth / numberOfSections
        
        const doorSpacing = 0.005 
        const groupSpacing = 0.01 
        
        for (let i = 0; i < numberOfSections; i++) {
            const sectionCenterX = -width / 2 + wallThickness + (i + 0.5) * actualSectionWidth
            
            const availableDoorWidth = actualSectionWidth - groupSpacing
            const singleDoorWidth = (availableDoorWidth - doorSpacing) / 2
            
            const leftDoorX = sectionCenterX - doorSpacing / 2 - singleDoorWidth / 2
            const rightDoorX = sectionCenterX + doorSpacing / 2 + singleDoorWidth / 2
            
            doorPositions.push({
                leftDoor: {
                    x: leftDoorX,
                    width: singleDoorWidth,
                    hingePosition: leftDoorX - singleDoorWidth / 2, 
                    isLeft: true
                },
                rightDoor: {
                    x: rightDoorX,
                    width: singleDoorWidth,
                    hingePosition: rightDoorX + singleDoorWidth / 2, 
                    isLeft: false
                }
            })
        }
    }
    
    return doorPositions
}



export const applyUVTransform = (texture: any, transform: UVTransform) => {
    if (!texture) return texture

    const {
        offsetX = 0,
        offsetY = 0,
        repeatX = 1,
        repeatY = 1,
        rotation = 0,
        flipX = false,
        flipY = false
    } = transform

    if (repeatX > 1 || repeatY > 1) {
        texture.wrapS = texture.wrapT = RepeatWrapping
    } else {
        texture.wrapS = texture.wrapT = ClampToEdgeWrapping
    }

    texture.offset.set(0, 0)
    texture.repeat.set(1, 1)
    texture.rotation = 0
    texture.center.set(0.5, 0.5)

  
    texture.offset.set(offsetX, offsetY)
    
    texture.repeat.set(
        flipX ? -Math.abs(repeatX) : Math.abs(repeatX),
        flipY ? -Math.abs(repeatY) : Math.abs(repeatY)
    )
    
    texture.rotation = rotation
    
    texture.needsUpdate = true
    
    return texture
}

export const getCabinetSections = (
    width: number, 
    height: number, 
    depth: number, 
    wallThickness: number
): KastSection[] => {
    const partitionPositions = getPartitionPositions(width, wallThickness)
    const sections: KastSection[] = []
    
    const availableWidth = width - 2 * wallThickness
    const numberOfSections = partitionPositions.length + 1
    const sectionWidth = availableWidth / numberOfSections
    
    for (let i = 0; i < numberOfSections; i++) {
        let sectionX: number
        
        if (i === 0) {
            sectionX = -width / 2 + wallThickness + sectionWidth / 2
        } else {
            const leftPartitionX = partitionPositions[i - 1]
            const rightPartitionX = i < partitionPositions.length ? partitionPositions[i] : width / 2 - wallThickness
            sectionX = (leftPartitionX + rightPartitionX) / 2
        }
        
        sections.push({
            id: `section-${i}`,
            x: sectionX,
            width: sectionWidth,
            height: height,
            depth: depth - 2 * wallThickness,
            isActive: false,
            isHovered: false
        })
    }
    
    return sections
}