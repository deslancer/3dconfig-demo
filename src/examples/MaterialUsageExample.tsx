import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { MaterialType, materialLibrary } from '../components/helpers/Materials'
import { MaterialSelector } from '../components/UI/MaterialSelector'

// Пример 3D объекта для демонстрации материалов
const DemoObject = ({ materialType }: { materialType: MaterialType }) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useEffect(() => {
    if (meshRef.current) {
      materialLibrary.applyMaterialToMesh(meshRef.current, materialType)
    }
  }, [materialType])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  )
}

// Пример использования библиотеки материалов
export const MaterialUsageExample = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(MaterialType.CHROME)

  return (
    <div className="w-full h-screen flex">
      {/* 3D сцена */}
      <div className="flex-1">
        <Canvas camera={{ position: [3, 3, 3], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <DemoObject materialType={selectedMaterial} />
          
          <Environment
            files="/assets/mirrored_hall_1k.hdr"
            background={false}
          />
          
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>

      {/* Панель управления материалами */}
      <div className="w-80 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Настройка материалов</h2>
        
        <MaterialSelector
          selectedMaterial={selectedMaterial}
          onMaterialChange={setSelectedMaterial}
          className="mb-6"
        />

        {/* Информация о текущем материале */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Текущий материал:</h3>
          <p className="text-sm text-gray-600">
            {materialLibrary.getMaterialConfig(selectedMaterial)?.name}
          </p>
        </div>

        {/* Инструкции по использованию */}
        <div className="mt-6 text-sm text-gray-600">
          <h4 className="font-medium mb-2">Как использовать:</h4>
          <ul className="space-y-1">
            <li>• Выберите материал из списка</li>
            <li>• Объект автоматически обновится</li>
            <li>• Используйте мышь для поворота камеры</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Хук для применения материала к группе объектов
export const useMaterialApplication = () => {
  const applyToMesh = (mesh: THREE.Mesh, materialType: MaterialType) => {
    materialLibrary.applyMaterialToMesh(mesh, materialType)
  }

  const applyToGroup = (group: THREE.Group, materialType: MaterialType) => {
    materialLibrary.applyMaterialToGroup(group, materialType)
  }

  return { applyToMesh, applyToGroup }
}