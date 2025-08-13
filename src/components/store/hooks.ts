import { useAppStore } from './appStore'
import { useShallow } from 'zustand/react/shallow'

export const useActiveSection = () => {
  return useAppStore(
    useShallow((state) => ({
      activeSectionId: state.activeSectionId,
      setActiveSectionId: state.setActiveSectionId,
    }))
  )
}

export const useDimensions = () => {
  return useAppStore(
    useShallow((state) => ({
      width: state.width,
      height: state.height,
      depth: state.depth,
      updateDimensions: state.updateDimensions
    }))
  )
}

export const useMaterials = () => {
  return useAppStore(
    useShallow((state) => ({
      woodMaterial: state.woodMaterial,
      setWoodMaterial: state.setWoodMaterial,
    }))
  )
}





