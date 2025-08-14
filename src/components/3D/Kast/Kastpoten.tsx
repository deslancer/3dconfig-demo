
interface KastpotenProps {
    width: number;
    height: number;
    depth: number;
}

export const Kastpoten = (props: KastpotenProps) => {
    const diameter = 0.025;
    const height = 0.1;
    const padding = 0.05;
    const ChromeMaterial = <meshStandardMaterial color="c0c0c0" metalness={1.0} roughness={0.15} envMapIntensity={1.0} />
    return (
        <group position={[0, height / 2, 0]}>
            <mesh position={[-props.width / 2 + diameter / 2 + padding, 0, -props.depth / 2 + diameter / 2 + padding]} castShadow>
                <cylinderGeometry args={[diameter, diameter, height]} />
                {ChromeMaterial}
            </mesh>
            <mesh position={[-props.width / 2 + diameter / 2 + padding, 0, props.depth / 2 - diameter / 2 - padding]} castShadow>
                <cylinderGeometry args={[diameter, diameter, height]} />
                {ChromeMaterial}
            </mesh>
            <mesh position={[props.width / 2 - diameter / 2 - padding, 0, -props.depth / 2 + diameter / 2 + padding]} castShadow>
                <cylinderGeometry args={[diameter, diameter, height]} />
                {ChromeMaterial}
            </mesh>
            <mesh position={[props.width / 2 - diameter / 2 - padding, 0, props.depth / 2 - diameter / 2 - padding]} castShadow>
                <cylinderGeometry args={[diameter, diameter, height]} />
                {ChromeMaterial}
            </mesh>
        </group>
    )
}