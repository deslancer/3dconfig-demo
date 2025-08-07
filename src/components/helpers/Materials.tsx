
import { UVTransform, applyUVTransform } from './helpers'

export enum MaterialType {
  CHROME = 'chrome',
  BLACK_METAL = 'blackMetal',
  DARK_WOOD = 'darkWood',
  LIGHT_WOOD = 'lightWood',
  GLASS = 'glass'
}


export const materialConfigs = {
  [MaterialType.CHROME]: {
    color: '#c0c0c0',
    metalness: 1.0,
    roughness: 0.15,
    envMapIntensity: 1.0,
  },
  [MaterialType.BLACK_METAL]: {
    color: '#1a1a1a',
    metalness: 0.9,
    roughness: 0.3,
    envMapIntensity: 1.0,
  },
  [MaterialType.DARK_WOOD]: {
    metalness: 0.1,
    roughness: 0.5,
    envMapIntensity: 0.5,
  },
  [MaterialType.LIGHT_WOOD]: {
    color: '#d2b48c',
    metalness: 0.1,
    roughness: 0.5,
    envMapIntensity: 0.5,
  },
  [MaterialType.GLASS]: {
    color: '#ffffff',
    metalness: 0.0,
    roughness: 0.0,
    transmission: 0.9,
    transparent: true,
    opacity: 0.3,
    envMapIntensity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
  }
}

export const materialNames = {
  [MaterialType.CHROME]: 'Chrome',
  [MaterialType.BLACK_METAL]: 'Black Metal',
  [MaterialType.DARK_WOOD]: 'Dark Wood',
  [MaterialType.LIGHT_WOOD]: 'Light Wood',
  [MaterialType.GLASS]: 'Glass'
}

export const materialPreviews = {
  [MaterialType.CHROME]: '#c0c0c0',
  [MaterialType.BLACK_METAL]: '#1a1a1a',
  [MaterialType.DARK_WOOD]: '#3d2914',
  [MaterialType.LIGHT_WOOD]: '#d2b48c',
  [MaterialType.GLASS]: '#ffffff'
}


export const getMaterialConfig = (materialType: MaterialType) => {
  return materialConfigs[materialType]
}

interface MaterialProps {
  materialType: MaterialType
  map?: any
  uvTransform?: UVTransform
}

export const StandardMaterial = ({ materialType, map, uvTransform }: MaterialProps) => {
  const config = materialConfigs[materialType]
  
  // Применяем UV трансформации если они указаны
  const transformedMap = uvTransform && map ? applyUVTransform(map.clone(), uvTransform) : map
  
  return <meshStandardMaterial {...config} map={transformedMap} /> 
}

export const PhysicalMaterial = ({ materialType, map, uvTransform }: MaterialProps) => {
  const config = materialConfigs[materialType]
  
  // Применяем UV трансформации если они указаны
  const transformedMap = uvTransform && map ? applyUVTransform(map.clone(), uvTransform) : map
  
  return <meshPhysicalMaterial {...config} map={transformedMap} />
}

export const Material = ({ materialType, map, uvTransform }: MaterialProps) => {
  if (materialType === MaterialType.GLASS) {
    return <PhysicalMaterial materialType={materialType} map={map} uvTransform={uvTransform} />
  }
  return <StandardMaterial materialType={materialType} map={map} uvTransform={uvTransform} />
}