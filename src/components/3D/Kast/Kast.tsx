import { Baseren } from "./Baseren"

interface KastProps {
    width: number
    height: number
    depth: number
    material: string
    wallThickness?: number
}

export const Kast = (props: KastProps) => {
    const { width, height, depth, material, wallThickness = 0.02 } = props

    return (
        <group>
            <Baseren 
                width={width} 
                height={height} 
                depth={depth} 
                material={material} 
                wallThickness={wallThickness}
            />
        </group>
    )
}