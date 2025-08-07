import { Input } from "./Input";
import { Select } from "./Select";
import { MaterialType } from "../helpers/Materials";


interface SidebarProps {
  width: number;
  height: number;
  depth: number;
  materialType: MaterialType;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onDepthChange: (value: number) => void;
  onMaterialChange: (value: MaterialType) => void;
 
}

export const Sidebar = (props: SidebarProps) => {
    const { width, height, depth, materialType, onWidthChange, onHeightChange, onDepthChange, onMaterialChange, onUvTransformChange } = props;
    const materialsList = Object.values(MaterialType);
   
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Instellingen</h2>
      
      <div className="space-y-4 flex-1">
        
        <div className="border-b border-gray-200 pb-4">
        
          <Input labelText="Breedte" type="number" min={250} max={10000} value={width} className="w-full" onChange={onWidthChange} />
        </div>

        <div className="border-b border-gray-200 pb-4">
          <Input labelText="Hoogte" type="number" min={400} max={2850} value={height} className="w-full" onChange={onHeightChange} />
        </div>

        <div className="border-b border-gray-200 pb-4">
          <Input labelText="Diepte" type="number" min={250} max={800} value={depth} className="w-full" onChange={onDepthChange} />
        </div>

        <div className="border-b border-gray-200 pb-4">
          <Select labelText="Material" options={materialsList} value={materialType} onChange={onMaterialChange} />
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-700 mb-2">Informatie</h3>
          <div className="text-sm text-gray-500 space-y-1">
            <p>• LK: draaiing camera</p>
            <p>• PRM: verplaatsing</p>
            <p>• WHEEL: zoom</p>
            <p>• KLIK op kast: kleur wijzigen</p>
          </div>
        </div>
      </div>

      
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button className="w-full bg-light-blue text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-light-cyan transition-colors duration-300">
            Bestellen
        </button>
      </div>
    </div>
  );
};
