export interface UVTransform {
    offsetX?: number
    offsetY?: number
    repeatX?: number
    repeatY?: number
    rotation?: number
    flipX?: boolean
    flipY?: boolean
}
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