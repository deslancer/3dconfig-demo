import { useState } from "react";
import { Header } from "./components/UI/Header";
import { Scene } from "./components/3D/Scene";
import { Sidebar } from "./components/UI/Sidebar";

const App = () => {

  const [width, setWidth] = useState(2000);
  const [height, setHeight] = useState(2500);
  const [depth, setDepth] = useState(630);
  const [material, setMaterial] = useState<string>("donker-hout");

  
  const getMaterialColor = (materialType: string): string => {
    switch (materialType) {
      case "donker-hout":
        return "#8b6d56";
      case "licht-hout":
        return "#c4a576";
      case "hout-effect":
        return "#9d7c5a";
      default:
        return "#8b6d56";
    }
  };

  return (
    <div className="h-screen w-screen bg-dark-gray relative">

      <Header />

      <main className="h-screen grid grid-cols-4 gap-1">

        <div className="col-span-3 bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <Scene 
            width={width / 1000}  
            height={height / 1000}
            depth={depth / 1000}
            material={getMaterialColor(material)}
          />
        </div>
        
        <div className="col-span-1 bg-white rounded-lg shadow-lg p-4 overflow-y-auto h-full">
          <Sidebar 
            width={width}
            height={height}
            depth={depth}
            material={material}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
            onDepthChange={setDepth}
            onMaterialChange={setMaterial}
          />
        </div>
      </main>
    </div>
  );
};

export default App;