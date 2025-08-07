import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Floor } from "./Floor"
import { Kast } from "./Kast/Kast"
import { MaterialType } from "../helpers/Materials";

interface SceneProps {
  width: number;
  height: number;
  depth: number;
  materialType: MaterialType;
}

export const Scene = (props: SceneProps) => {
    const { width, height, depth, materialType } = props;
    
    const cameraDistance = Math.max(width, height, depth) * 2.5;
    const cameraPosition: [number, number, number] = [
      cameraDistance * 0.8, 
      height * 0.8, 
      cameraDistance
    ];
    
    return (
      <Canvas className="w-full h-full" camera={{ position: cameraPosition, fov: 50, near: 0.1, far: 1000 }} shadows>
        <Environment
        files="/assets/mirrored_hall_1k.hdr"
      
      />
        <OrbitControls 
          makeDefault 
          target={[0, height / 2, 0]}
        />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={4.5} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <ambientLight intensity={1.5} />
        <Floor />
        <axesHelper args={[5]} />
        <Kast 
          width={width} 
          height={height} 
          depth={depth} 
          materialType={materialType}
        />
      </Canvas>
    )
}