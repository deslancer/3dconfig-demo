import { useState } from "react";
import { Header } from "./components/UI/Header";
import { Scene } from "./components/3D/Scene";
import { Sidebar } from "./components/UI/Sidebar";
import { MaterialType } from "./components/helpers/Materials";


const App = () => {
  const [width, setWidth] = useState(2000);
  const [height, setHeight] = useState(2500);
  const [depth, setDepth] = useState(630);
  const [materialType, setMaterialType] = useState<MaterialType>(MaterialType.DARK_WOOD);


  return (
    <div className="h-screen w-screen bg-dark-gray relative">

      <Header />

      <main className="h-screen grid grid-cols-4 gap-1">

        <div className="col-span-3 bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <Scene 
            width={width / 1000}  
            height={height / 1000}
            depth={depth / 1000}
            materialType={materialType}
          />
        </div>
        
        <div className="col-span-1 bg-white rounded-lg shadow-lg p-4 overflow-y-auto h-full">
          <Sidebar 
            width={width}
            height={height}
            depth={depth}
            materialType={materialType}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
            onDepthChange={setDepth}
            onMaterialChange={setMaterialType}
          />
        </div>
      </main>
    </div>
  );
};

export default App;