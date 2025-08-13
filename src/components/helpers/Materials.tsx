import { applyUVTransform } from './helpers'
import { UVTransform } from '../types/UVTypes'

export enum MaterialType {
  CHROME = 'chrome',
  DARK_WOOD = 'darkWood',
  LIGHT_WOOD = 'lightWood',
}


export const materialConfigs = {
  [MaterialType.CHROME]: {
    color: '#c0c0c0',
    metalness: 1.0,
    roughness: 0.15,
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
  }
}

export const materialNames = {
  [MaterialType.CHROME]: 'Chrome',
  [MaterialType.DARK_WOOD]: 'Dark Wood',
  [MaterialType.LIGHT_WOOD]: 'Light Wood',
}

export const materialPreviews = {
  [MaterialType.CHROME]: '#c0c0c0',
  [MaterialType.DARK_WOOD]: '#3d2914',
  [MaterialType.LIGHT_WOOD]: '#d2b48c',
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
  const transformedMap = uvTransform && map ? applyUVTransform(map.clone(), uvTransform) : map
  
  return <meshStandardMaterial {...config} map={transformedMap} /> 
}

export const MaterialWrapper = ({ materialType, map, uvTransform }: MaterialProps) => {

  return <StandardMaterial materialType={materialType} map={map} uvTransform={uvTransform} />
}