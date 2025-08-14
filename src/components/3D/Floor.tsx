
export const Floor = () => {
    
    return (
        <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <shadowMaterial opacity={0.35} /> 
      </mesh>
        
    )
}