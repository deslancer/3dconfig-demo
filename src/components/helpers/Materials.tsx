import { applyUVTransform } from './helpers'
import { UVTransform } from '../types/UVTypes'
import { useLoader } from "@react-three/fiber"
import { TextureLoader, Texture, Vector2 } from "three"
import { useMemo } from 'react'

export enum MaterialType {
  DARK_WOOD = 'Dark',
  WENGE_WOOD = 'Wenge',
  WHITE = 'White',
}

export const textureAssets = {
  [MaterialType.DARK_WOOD]: {
    map: '/assets/dark_wood.jpg',
    normalMap: '/assets/dark_wood_normal.png'
  },
  [MaterialType.WENGE_WOOD]: {
    map: '/assets/dark_wenge_wood.jpg',
    normalMap: '/assets/dark_wenge_wood_normal.jpg' 
  },
  [MaterialType.WHITE]: {
    map: null,
    normalMap: null
  },
}

export const materialConfigs = {
  [MaterialType.WHITE]: {
    color: '#ffffff',
    metalness: 0.1,
    roughness: 0.5,
    envMapIntensity: 0.5,
  },
  [MaterialType.DARK_WOOD]: {
    metalness: 0.1,
    roughness: 0.5,
    envMapIntensity: 0.5,
  },
  [MaterialType.WENGE_WOOD]: {
    color: '#d2b48c',
    metalness: 0.1,
    roughness: 0.5,
    envMapIntensity: 0.5,
  }
}

export const materialNames = {
  [MaterialType.DARK_WOOD]: 'Dark Wood',
  [MaterialType.WENGE_WOOD]: 'Wenge Wood',
  [MaterialType.WHITE]: 'White',
}

export const materialPreviews = {
  [MaterialType.DARK_WOOD]: '#3d2914',
  [MaterialType.WENGE_WOOD]: '#d2b48c',
  [MaterialType.WHITE]: '#ffffff',
}

export const getMaterialConfig = (materialType: MaterialType) => {
  return materialConfigs[materialType]
}

interface MaterialTextures {
  map: Texture | null
  normalMap: Texture | null
}

export const useTextures = () => {
  const darkWoodMap = useLoader(TextureLoader, textureAssets[MaterialType.DARK_WOOD].map!)
  const wengeWoodMap = useLoader(TextureLoader, textureAssets[MaterialType.WENGE_WOOD].map!)
  
  const darkWoodNormal = useLoader(TextureLoader, textureAssets[MaterialType.DARK_WOOD].normalMap!)
  
  return useMemo(() => ({
    [MaterialType.DARK_WOOD]: {
      map: darkWoodMap,
      normalMap: darkWoodNormal
    },
    [MaterialType.WENGE_WOOD]: {
      map: wengeWoodMap,
      normalMap: null
    },
    [MaterialType.WHITE]: {
      map: null,
      normalMap: null
    },
  }), [darkWoodMap, wengeWoodMap, darkWoodNormal])
}

export const useMaterialTextures = (materialType: MaterialType): MaterialTextures => {
  const textures = useTextures()
  return textures[materialType]
}

export const useMaterialTexture = (materialType: MaterialType): Texture | null => {
  const textures = useMaterialTextures(materialType)
  return textures.map
}

interface MaterialProps {
  materialType: MaterialType
  map?: Texture | null
  normalMap?: Texture | null
  uvTransform?: UVTransform
}

interface MaterialWrapperProps {
  materialType: MaterialType
  uvTransform?: UVTransform
}

export const StandardMaterial = ({ materialType, map, normalMap, uvTransform }: MaterialProps) => {
  const config = materialConfigs[materialType]
  const transformedMap = uvTransform && map ? applyUVTransform(map.clone(), uvTransform) : map
  const transformedNormalMap = uvTransform && normalMap ? applyUVTransform(normalMap.clone(), uvTransform) : normalMap
  
  return (
    <meshStandardMaterial 
      {...config} 
      map={transformedMap} 
      normalMap={transformedNormalMap}
      normalScale={new Vector2(1.0, 1.0)} />
  )
}

export const MaterialWrapper = ({ materialType, uvTransform }: MaterialWrapperProps) => {
  const textures = useMaterialTextures(materialType)
  
  return (
    <StandardMaterial 
      materialType={materialType} 
      map={textures.map} 
      normalMap={textures.normalMap}
      uvTransform={uvTransform} 
    />
  )
}

export const MaterialWrapperWithTexture = ({ materialType, map, normalMap, uvTransform }: MaterialProps) => {
  return <StandardMaterial materialType={materialType} map={map} normalMap={normalMap} uvTransform={uvTransform} />
}