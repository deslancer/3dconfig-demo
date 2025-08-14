
import { InhoudType } from '../types/InhoudTypes'

export interface SectionContent {
  planken: number
  drawers: number
}

export interface AppConfiguration {

  width: number
  height: number
  depth: number
  activeSectionId: string | null
  woodMaterial: string
  sectionsContent: Record<string, SectionContent>
  drawerStates: Record<string, boolean>
  sectionInhoudTypes: Record<string, InhoudType>
}

export interface AppActions {
  updateDimensions: (dimensions: { width?: number; height?: number; depth?: number }) => void
  setActiveSectionId: (id: string | null) => void
  setWoodMaterial: (material: string) => void
  setSectionContent: (sectionId: string, content: SectionContent) => void
  setDrawerState: (sectionId: string, isExtended: boolean) => void
  setSectionInhoudType: (sectionId: string, inhoudType: InhoudType) => void
  resetConfiguration: () => void
}

export interface AppStore extends AppConfiguration, AppActions {}
