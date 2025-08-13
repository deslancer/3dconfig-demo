import { DoubleSide } from "three"

export const Floor = () => {
    
    return (
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[100, 100, 100]} />
            <meshStandardMaterial color="lightgray" side={DoubleSide} />
        </mesh>
    )
}