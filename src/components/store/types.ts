
export interface AppConfiguration {
  // Основные размеры шкафа
  width: number
  height: number
  depth: number
  activeSectionId: string | null
  woodMaterial: string

}

export interface AppActions {

  updateDimensions: (dimensions: { width?: number; height?: number; depth?: number }) => void
  setActiveSectionId: (id: string | null) => void
  setWoodMaterial: (material: string) => void
  

  resetConfiguration: () => void
}

export interface AppStore extends AppConfiguration, AppActions {}
