
import { useState } from "react";
import { MaterialType } from "../helpers/Materials";
import { Afmetingen } from "./Tabs/Afmetingen";
import { Inhoud } from "./Tabs/Inhoud";
import { ThemeToggle } from "./ThemeToggle";


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
      <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-text mb-4">Instellingen</h2>
        <ThemeToggle />
      </div>
      
      <div className="flex items-center w-full gap-4 mb-4">
        {tabs.map((tab) => (
            <div key={tab.label} 
            onClick={() => setActiveTab(tab.label)} 
            className={`font-medium text-gray-800 dark:text-dark-text border-gray-800 dark:border-dark-text px-4 py-1 cursor-pointer hover:text-light-blue transition-colors duration-300 ${activeTab === tab.label ? 'text-light-blue border-b-2' : ''}`}>
                {tab.label}
            </div>
        ))}
      </div>
     <div className="flex-1 overflow-y-auto">
        {tabs.find((tab) => tab.label === activeTab)?.content}
     </div>

    </div>
  );
};
