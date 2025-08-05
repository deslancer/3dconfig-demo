import { Canvas } from "@react-three/fiber"
import { Cube } from "./Cube"
import { Environment, OrbitControls } from "@react-three/drei"
import { Floor } from "./Floor"

export const Scene = () => {
    return (
      <Canvas className="w-full h-full" camera={{ position: [0, 3, 12], fov: 50, near: 0.1, far: 1000, rotation: [0, 0, 0] }} shadows>
        <Environment
        files="/assets/mirrored_hall_1k.hdr"
      
      />
        <OrbitControls makeDefault />
        <directionalLight position={[1, 2, 3]} intensity={4.5} castShadow />
        <ambientLight intensity={1.5} />
        <Cube />
        <Floor />
        <axesHelper args={[5]} />
      </Canvas>
    )
}