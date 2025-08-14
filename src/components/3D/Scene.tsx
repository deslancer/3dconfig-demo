import { Canvas } from "@react-three/fiber"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { Floor } from "./Floor"
import { Kast } from "./Kast/Kast"
import { MaterialType } from "../helpers/Materials"
import { KastSection } from "../types/SectionsTypes"
import { useAppStore } from "../store/appStore"


interface SceneProps {
  width: number;
  height: number;
  depth: number;
  materialType: MaterialType;
  allDoorsOpen?: boolean;
  onDoorStateChange?: (allOpen: boolean) => void;
  onSectionChange?: (sections: KastSection[]) => void;
  onActiveSectionChange?: (activeSectionId: string | null) => void;
}

export const Scene = (props: SceneProps) => {
    const { width, height, depth, materialType, allDoorsOpen, onDoorStateChange, onSectionChange, onActiveSectionChange } = props;
    const { theme } = useAppStore();
    
    const cameraDistance = Math.max(width, height, depth) * 2;
    const cameraPosition: [number, number, number] = [
      cameraDistance * 0.5, 
      height * 0.8, 
      cameraDistance
    ];

    const backgroundColor = theme === 'dark' ? '#15151a' : '#FFFFFF';
    
    return (
      <Canvas className="w-full h-full" camera={{ position: cameraPosition, fov: 50, near: 0.1, far: 1000 }} shadows frameloop="demand">
        <Environment
        files="/assets/mirrored_hall_1k.hdr"
      
      />
        <color attach="background" args={[backgroundColor]} />
        <OrbitControls 
          makeDefault 
          target={[0, height / 2, 0]}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          maxDistance={10}
          minDistance={2.5}
        />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={4.5} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0005}
        />
        <ambientLight intensity={1.5} />
        <ContactShadows
        position={[0, 0, 0]}
        opacity={0.5}
        scale={10}
        blur={2.8}
        far={4}
        resolution={1024}
        color="#000000"
      />
        <Floor />
        <Kast 
          width={width} 
          height={height} 
          depth={depth} 
          materialType={materialType}
          allDoorsOpen={allDoorsOpen}
          onDoorStateChange={onDoorStateChange}
          onSectionChange={onSectionChange}
          onActiveSectionChange={onActiveSectionChange}
        />
      
      </Canvas>
    )
}