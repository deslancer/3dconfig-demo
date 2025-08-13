import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AppStore, AppConfiguration } from './types'

const initialConfiguration: AppConfiguration = {
  width: 200,
  height: 240,
  depth: 60,
  activeSectionId: null,
  woodMaterial: 'dark_wenge_wood',
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialConfiguration,

      setActiveSectionId: (id: string | null) => set({ activeSectionId: id }),
      updateDimensions: (dimensions) => {
        const state = get()
        const newDimensions = { ...state, ...dimensions }

        set({
          ...newDimensions,
        })
      },

      setWoodMaterial: (material: string) => set({ woodMaterial: material }),

      resetConfiguration: () => set(initialConfiguration)
    }),
    {
      name: 'cabinet-configuration',
      storage: createJSONStorage(() => localStorage),
      
      partialize: (state) => ({
        width: state.width,
        height: state.height,
        depth: state.depth,
        woodMaterial: state.woodMaterial,
      })
    }
  )
)
