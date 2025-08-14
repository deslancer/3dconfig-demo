import { UV_PRESETS } from "../../../types/UVTypes"
import { MaterialType, MaterialWrapper } from "../../../helpers/Materials"
import { useSpring, animated } from "@react-spring/three"

interface DoosProps {
    width: number
    height: number
    depth: number
    materialType: MaterialType
    position: [number, number, number]
    isExtended?: boolean
}
export const Doos = (props: DoosProps) => {
    const { width, height, depth, materialType, position, isExtended = false } = props
    const wallThickness = 0.02

    const extendDistance = depth * 0.7 
    const { positionZ } = useSpring({
        positionZ: isExtended ? -extendDistance : 0,
        config: {
            mass: 1,
            tension: 200,
            friction: 25,
            duration: 600 
        }
    })

    return (
        <animated.group 
            position={[position[0], position[1], position[2]]}
            position-z={positionZ.to(z => position[2] - z)}
        >
            {/* Back */}
            <mesh position={[0, 0, depth / 2]} castShadow >
                <boxGeometry args={[width, height, wallThickness]} />
                <MaterialWrapper materialType={materialType}  uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
           {/* Front */}
            <mesh position={[0, 0, -depth / 2]} castShadow >
                <boxGeometry args={[width, height, wallThickness]} />
                <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
            {/* Right */}
             <mesh position={[width / 2 - wallThickness / 2, 0, 0]} castShadow >
                <boxGeometry args={[wallThickness, height, depth - wallThickness]} />
                <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
            {/* Left */}
            <mesh position={[-width / 2 + wallThickness / 2, 0, 0]} castShadow >
                <boxGeometry args={[wallThickness, height, depth - wallThickness]} />
                <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh>
    
            {/* Bottom */}
            <mesh position={[0, -height / 2 + wallThickness / 2, 0]} castShadow >
                <boxGeometry args={[width, wallThickness, depth]} />
                <MaterialWrapper materialType={materialType} uvTransform={UV_PRESETS.ROTATE_90} />
            </mesh> 
        </animated.group>
    )
}