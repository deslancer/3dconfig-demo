import { useState } from "react";
import { Header } from "./components/UI/Header";
import { Scene } from "./components/3D/Scene";
import { Sidebar } from "./components/UI/Sidebar";
import { MaterialType } from "./components/helpers/Materials";
import { DoorClosed, DoorOpen } from "lucide-react";


const App = () => {
  const [width, setWidth] = useState(2000);
  const [height, setHeight] = useState(2500);
  const [depth, setDepth] = useState(630);
  const [materialType, setMaterialType] = useState<MaterialType>(MaterialType.DARK_WOOD);
  const [allDoorsOpen, setAllDoorsOpen] = useState(false);


  return (
    <div className="h-screen w-screen bg-dark-gray relative">

      <Header />

      <main className="h-screen w-screen grid grid-cols-4 gap-1 relative">

        <div className="col-span-3 bg-white rounded-lg shadow-lg relative overflow-hidden h-full">
          <Scene 
            width={width / 1000}  
            height={height / 1000}
            depth={depth / 1000}
            materialType={materialType}
            allDoorsOpen={allDoorsOpen}
            onDoorStateChange={setAllDoorsOpen}
          />
          <div className="absolute bottom-8 w-full flex items-center justify-center gap-2">
            <div 
              className={`w-12 h-12 rounded-full p-1 flex items-center ${allDoorsOpen ? 'bg-light-cyan hover:bg-light-blue' : 'bg-light-blue hover:bg-light-cyan'}
                justify-center cursor-pointer transition-colors duration-200`}
              onClick={() => setAllDoorsOpen(!allDoorsOpen)}
              title={allDoorsOpen ? "Close all doors" : "Open all doors"}
            >
              {allDoorsOpen ? (
                <DoorOpen className={`w-6 h-6 text-white transition-transform duration-200`} />
                
              ) : (
                <DoorClosed className={`w-6 h-6 text-white transition-transform duration-200`} />
              )}
            </div>
          </div>
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