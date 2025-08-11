
import { useState } from "react";
import { MaterialType } from "../helpers/Materials";
import { Afmetingen } from "./Tabs/Afmetingen";
import { Inhoud } from "./Tabs/Inhoud";


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
    const [activeTab, setActiveTab] = useState("Afmetingen");
    const tabs = [
        {
            label: "Afmetingen",
            content: <Afmetingen width={width} height={height} depth={depth} materialType={materialType} onWidthChange={onWidthChange} onHeightChange={onHeightChange} onDepthChange={onDepthChange} onMaterialChange={onMaterialChange} />
        },
        {
            label: "Inhoud",
            content: <Inhoud />
        }
    ]
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Instellingen</h2>
      <div className="flex items-center w-full gap-4 mb-4">
        {tabs.map((tab) => (
            <div key={tab.label} 
            onClick={() => setActiveTab(tab.label)} 
            className={`font-medium text-gray-800  border-gray-800 px-4 py-1 cursor-pointer hover:text-light-blue transition-colors duration-300 ${activeTab === tab.label ? 'text-light-blue border-b-2' : ''}`}>
                {tab.label}
            </div>
        ))}
      </div>
     <div className="flex-1 overflow-y-auto">
        {tabs.find((tab) => tab.label === activeTab)?.content}
     </div>

      
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button className="w-full bg-light-blue text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-light-cyan transition-colors duration-300">
            Bestellen
        </button>
      </div>
    </div>
  );
};
