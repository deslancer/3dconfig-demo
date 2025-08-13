import { useRef, useMemo, useState, useEffect } from 'react'
import { CabinetSection } from '../../types/SectionsTypes'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { useThree } from '@react-three/fiber'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'

interface SectionWireframeProps {
    sections: CabinetSection[]
    wallThickness: number
    onSectionHover: (sectionId: string | null) => void
    onSectionClick: (sectionId: string) => void
}

interface SectionEdgesCustomProps {
    section: CabinetSection
    wallThickness: number
    onHover: (sectionId: string | null) => void
    onClick: (sectionId: string) => void
}


export default function SectionEdgesCustom(props: SectionEdgesCustomProps) {
    const { section, wallThickness, onHover, onClick } = props
    const [isHovered, setHovered] = useState(false)
    const { size, gl } = useThree()
    const lineRef = useRef()
  
    const w = section.width / 2
    const h = section.height / 2
    const d = section.depth / 2
  
    const vertices = [
      [-w, -h, -d], [w, -h, -d], [w, h, -d], [-w, h, -d], 
      [-w, -h, d],  [w, -h, d],  [w, h, d],  [-w, h, d]
    ]
  
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back
      [4, 5], [5, 6], [6, 7], [7, 4], // front
      [0, 4], [1, 5], [2, 6], [3, 7]  // sides
    ]
  
    const positions = useMemo(() => {
      const pos: number[] = []
      edges.forEach(([startIdx, endIdx]) => {
        const start = vertices[startIdx]
        const end = vertices[endIdx]
        pos.push(...start, ...end)
      })
      return new Float32Array(pos)
    }, [vertices, edges])
  
    const lineGeometry = useMemo(() => {
      const geom = new LineSegmentsGeometry()
      geom.setPositions(positions)
      return geom
    }, [positions]) as LineGeometry
  
    const lineMaterial = useMemo(() => {
      const mat = new LineMaterial({
        color: section.isActive ? '#00bcd4' : '#4fc3f7',
        linewidth: 3,  
        dashed: false,
        transparent: true,
        opacity: 1,
        depthTest: false 
      })
      return mat
    }, [section.isActive])
  
    useEffect(() => {
      const dpr = gl.getPixelRatio()
      lineMaterial.resolution.set(size.width * dpr, size.height * dpr)
    }, [size.width, size.height, gl, lineMaterial])

    useEffect(() => {
      if (section.isActive || isHovered) {
        lineMaterial.color.set('#306FC4')
      } else {
        lineMaterial.color.set('#4fc3f7')
      }
      
      lineMaterial.needsUpdate = true
    }, [isHovered, section.isActive, lineMaterial])
  
    const line = useMemo(() => {
      const l = new Line2(lineGeometry, lineMaterial)
      l.computeLineDistances()
      l.renderOrder = 9999
      return l
    }, [lineGeometry, lineMaterial])
  
        const visible = isHovered || section.isActive

    const handlePointerEnter = (e: any) => {
        e.stopPropagation()
        setHovered(true)
        onHover(section.id)
    }
    
    const handlePointerLeave = (e: any) => {
        e.stopPropagation()
        onHover(null)
        setHovered(false)
    }
    
    const handleClick = (e: any) => {
        e.stopPropagation()
        onClick(section.id)
    }

    return (
      <group position={[section.x, section.height / 2 + wallThickness / 2, 0]}>
        <mesh
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
        >
          <boxGeometry args={[section.width, section.height, section.depth]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
  
        {visible && <primitive ref={lineRef} object={line} />}
      </group>
    )
  }

export const SectionWireframe = ({ sections, wallThickness, onSectionHover, onSectionClick }: SectionWireframeProps) => {
    return (
        <group position={[0, 0, 0]}>
            {sections.map((section) => (
                <SectionEdgesCustom
                    key={section.id}
                    section={section}
                    wallThickness={wallThickness}
                    onHover={onSectionHover}
                    onClick={onSectionClick}
                />
            ))}
        </group>
    )
}