import React from 'react'
import { MaterialType, materialNames, materialPreviews } from '../helpers/Materials'

interface MaterialSelectorProps {
  selectedMaterial?: MaterialType
  onMaterialChange: (material: MaterialType) => void
  className?: string
}

export const MaterialSelector = ({
  selectedMaterial,
  onMaterialChange,
  className = ''
}: MaterialSelectorProps) => {
  const materials = Object.values(MaterialType)

  return (
    <div className={`material-selector ${className}`}>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Материал</h3>
      <div className="grid grid-cols-2 gap-2">
        {materials.map((materialType) => (
          <button
            key={materialType}
            onClick={() => onMaterialChange(materialType)}
            className={`
              flex items-center p-2 border rounded-lg transition-all duration-200
              ${selectedMaterial === materialType
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <div
              className="w-6 h-6 rounded border border-gray-300 mr-2 flex-shrink-0"
              style={{ backgroundColor: materialPreviews[materialType] }}
            />
            <span className="text-sm font-medium text-gray-700 truncate">
              {materialNames[materialType]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Компонент для отображения превью материала
interface MaterialPreviewProps {
  material: MaterialType
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const MaterialPreview = ({
  material,
  size = 'md',
  className = ''
}: MaterialPreviewProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        rounded border border-gray-300 
        ${className}
      `}
      style={{ backgroundColor: materialPreviews[material] }}
      title={materialNames[material]}
    />
  )
}