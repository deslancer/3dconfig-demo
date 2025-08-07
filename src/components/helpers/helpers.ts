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

// Функция для вычисления позиций дверей
export const getDoorPositions = (width: number, wallThickness: number) => {
    const sectionWidth = 1.0
    const availableWidth = width - 2 * wallThickness
    const numberOfSections = Math.floor(availableWidth / sectionWidth) + 1
    const actualSectionWidth = availableWidth / numberOfSections
    
    const doorPositions = []
    const doorSpacing = 0.005 // Расстояние между дверьми в паре
    const groupSpacing = 0.01 // Расстояние между группами дверей
    
    for (let i = 0; i < numberOfSections; i++) {
        const sectionCenterX = -width / 2 + wallThickness + (i + 0.5) * actualSectionWidth
        
        // Ширина каждой двери (учитываем промежутки)
        const availableDoorWidth = actualSectionWidth - groupSpacing
        const singleDoorWidth = (availableDoorWidth - doorSpacing) / 2
        
        // Позиции левой и правой двери в секции
        const leftDoorX = sectionCenterX - doorSpacing / 2 - singleDoorWidth / 2
        const rightDoorX = sectionCenterX + doorSpacing / 2 + singleDoorWidth / 2
        
        doorPositions.push({
            leftDoor: {
                x: leftDoorX,
                width: singleDoorWidth,
                hingePosition: leftDoorX - singleDoorWidth / 2, // Петля слева
                isLeft: true
            },
            rightDoor: {
                x: rightDoorX,
                width: singleDoorWidth,
                hingePosition: rightDoorX + singleDoorWidth / 2, // Петля справа
                isLeft: false
            }
        })
    }
    
    return doorPositions
}

// Интерфейс для UV трансформаций
export interface UVTransform {
    offsetX?: number
    offsetY?: number
    repeatX?: number
    repeatY?: number
    rotation?: number
    flipX?: boolean
    flipY?: boolean
}

// Функция для применения UV трансформаций к текстуре
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

    // Применяем смещение
    texture.offset.set(offsetX, offsetY)
    
    // Применяем повтор (с учетом переворота)
    texture.repeat.set(
        flipX ? -Math.abs(repeatX) : Math.abs(repeatX),
        flipY ? -Math.abs(repeatY) : Math.abs(repeatY)
    )
    
    // Применяем поворот
    texture.rotation = rotation
    
    // Устанавливаем центр поворота в центр текстуры
    texture.center.set(0.5, 0.5)
    
    // Обновляем текстуру
    texture.needsUpdate = true
    
    return texture
}

// Предустановки для популярных UV трансформаций
export const UV_PRESETS = {
    NORMAL: { repeatX: 1, repeatY: 1, offsetX: 0, offsetY: 0, rotation: 0 },
    FLIP_HORIZONTAL: { repeatX: 1, repeatY: 1, offsetX: 0, offsetY: 0, rotation: 0, flipX: true },
    FLIP_VERTICAL: { repeatX: 1, repeatY: 1, offsetX: 0, offsetY: 0, rotation: 0, flipY: true },
    ROTATE_90: { repeatX: 1, repeatY: 1, offsetX: 0, offsetY: 0, rotation: Math.PI / 2 },
    ROTATE_180: { repeatX: 1, repeatY: 1, offsetX: 0, offsetY: 0, rotation: Math.PI },
    ROTATE_270: { repeatX: 1, repeatY: 1, offsetX: 0, offsetY: 0, rotation: -Math.PI / 2 },
    TILE_2X2: { repeatX: 2, repeatY: 2, offsetX: 0, offsetY: 0, rotation: 0 },
    TILE_4X4: { repeatX: 4, repeatY: 4, offsetX: 0, offsetY: 0, rotation: 0 },
} as const

export type UVPresetName = keyof typeof UV_PRESETS