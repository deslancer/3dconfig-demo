import { MaterialType } from "../../helpers/Materials";
import { Input } from "../Input";
import { Select } from "../Select";

interface AfmetingenProps {
    width: number;
    height: number;
    depth: number;
    materialType: MaterialType;
    onWidthChange: (value: number) => void;
    onHeightChange: (value: number) => void;
    onDepthChange: (value: number) => void;
    onMaterialChange: (value: MaterialType) => void;
}
export const Afmetingen = (props: AfmetingenProps) => {
    const {width, height, depth, materialType, onWidthChange, onHeightChange, onDepthChange, onMaterialChange} = props
    const materialsList = Object.values(MaterialType);
    return (
        <div className="space-y-4 flex-1">
        
        <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
        
          <Input labelText="Breedte" type="number" min={250} max={10000} value={width} className="w-full" onChange={onWidthChange} />
        </div>

        <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
          <Input labelText="Hoogte" type="number" min={400} max={2850} value={height} className="w-full" onChange={onHeightChange} />
        </div>

        <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
          <Input labelText="Diepte" type="number" min={250} max={800} value={depth} className="w-full" onChange={onDepthChange} />
        </div>

        <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
          <Select labelText="Material" options={materialsList} value={materialType} onChange={onMaterialChange} />
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-700 dark:text-dark-text mb-2">Informatie</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>• LK: draaiing camera</p>
            <p>• PRM: verplaatsing</p>
            <p>• WHEEL: zoom</p>
          </div>
        </div>
      </div>
    )
}
