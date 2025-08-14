import { SectionContent } from '../store/types'

export interface PlankData {
  id: string
  position: [number, number, number]
  width: number
  height: number
  depth: number
}

export interface DrawerData {
  id: string
  position: [number, number, number]
  width: number
  height: number
  depth: number
}

export interface GeneratedContent {
  planken: PlankData[]
  drawers: DrawerData[]
}

interface GenerateContentParams {
  sectionWidth: number
  sectionHeight: number
  sectionDepth: number
  content: SectionContent
}

export const generateSectionContent = ({
  sectionWidth,
  sectionHeight,
  sectionDepth,
  content
}: GenerateContentParams): GeneratedContent => {
  const planken: PlankData[] = []
  const drawers: DrawerData[] = []

  const plankThickness = 0.02
  const drawerHeight = 0.25
  const spacing = 0.02
  const spaceBetweenPlankenAndDrawers = 0.4
 
  const totalDrawerHeight = content.drawers * (drawerHeight + spacing)
  const availableHeightForPlanken = sectionHeight - totalDrawerHeight - spacing - spaceBetweenPlankenAndDrawers

 
  for (let i = 0; i < content.drawers; i++) {
    const drawerY = -sectionHeight / 2 + (i * (drawerHeight + spacing)) + drawerHeight / 2 + spacing
    
    drawers.push({
      id: `drawer_${i}`,
      position: [0, drawerY, 0],
      width: sectionWidth - 0.1, //padding,
      height: drawerHeight,
      depth: sectionDepth - 0.04 //padding
    })
  }

   
  if (content.planken > 0) {
    const plankSpacing = availableHeightForPlanken / content.planken
    
    for (let i = 0; i < content.planken; i++) {
      const topOfAvailableArea = sectionHeight / 2 - totalDrawerHeight - spacing
      const plankY = topOfAvailableArea - (i * plankSpacing) - (plankSpacing / 2)
      
      planken.push({
        id: `plank_${i}`,
        position: [0, plankY, 0],
        width: sectionWidth - 0.04,
        height: plankThickness,
        depth: sectionDepth - 0.04
      })
    }
  }

  return { planken, drawers }
}
