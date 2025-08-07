import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { MaterialType, Material, getMaterialConfig } from '../components/helpers/Materials'
import { MaterialSelector } from '../components/UI/MaterialSelector'

// Простой куб с материалом
const SimpleCube = ({ materialType }: { materialType: MaterialType }) => {
  return (
    <mesh position={[0, 0, 0]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <Material materialType={materialType} />
    </mesh>
  )
}

// Или еще проще - напрямую используя настройки
const DirectCube = ({ materialType }: { materialType: MaterialType }) => {
  const config = getMaterialConfig(materialType)
  
  return (
    <mesh position={[2, 0, 0]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      {materialType === MaterialType.GLASS ? (
        <meshPhysicalMaterial {...config} />
      ) : (
        <meshStandardMaterial {...config} />
      )}
    </mesh>
  )
}

// Группа объектов с одним материалом
const ObjectGroup = ({ materialType }: { materialType: MaterialType }) => {
  const config = getMaterialConfig(materialType)
  
  return (
    <group position={[-2, 0, 0]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial {...config} />
      </mesh>
      <mesh position={[0, -0.5, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial {...config} />
      </mesh>
    </group>
  )
}

export const SimpleUsageExample = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(MaterialType.CHROME)

  return (
    <div className="w-full h-screen flex">
      {/* 3D сцена */}
      <div className="flex-1">
        <Canvas camera={{ position: [4, 4, 4], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          
          {/* Три способа использования материалов */}
          <SimpleCube materialType={selectedMaterial} />
          <DirectCube materialType={selectedMaterial} />
          <ObjectGroup materialType={selectedMaterial} />
          
          <Environment
            files="/assets/mirrored_hall_1k.hdr"
            background={false}
          />
          
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>

      {/* Панель управления */}
      <div className="w-80 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Простое использование материалов</h2>
        
        <MaterialSelector
          selectedMaterial={selectedMaterial}
          onMaterialChange={setSelectedMaterial}
          className="mb-6"
        />

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Три способа:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>1. Компонент <code>&lt;Material /&gt;</code></li>
            <li>2. Прямое использование настроек</li>
            <li>3. Группа объектов</li>
          </ul>
        </div>
      </div>
    </div>
  )
}