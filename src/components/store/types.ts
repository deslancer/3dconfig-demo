
export interface SectionContent {
  planken: number
  drawers: number
}

export interface AppConfiguration {
  // Основные размеры шкафа
  width: number
  height: number
  depth: number
  activeSectionId: string | null
  woodMaterial: string
  sectionsContent: Record<string, SectionContent>
  // Состояние выдвижения ящиков по секциям
  drawerStates: Record<string, boolean>
}

export interface AppActions {
  updateDimensions: (dimensions: { width?: number; height?: number; depth?: number }) => void
  setActiveSectionId: (id: string | null) => void
  setWoodMaterial: (material: string) => void
  setSectionContent: (sectionId: string, content: SectionContent) => void
  setDrawerState: (sectionId: string, isExtended: boolean) => void
  resetConfiguration: () => void
}

export interface AppStore extends AppConfiguration, AppActions {}
