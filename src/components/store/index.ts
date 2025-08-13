
export { useAppStore as useCabinetStore } from './appStore'

export type { 
  AppStore, 
  AppConfiguration, 
  AppActions 
} from './types'

export {
  useActiveSection,
  useDimensions,
  useMaterials,
} from './hooks'

export { useShallow } from 'zustand/react/shallow'

export const selectActiveSectionId = (state: any) => state.activeSectionId
export const selectDimensions = (state: any) => ({
  width: state.width,
  height: state.height,
  depth: state.depth
})
export const selectMaterials = (state: any) => ({
  woodMaterial: state.woodMaterial,
})

