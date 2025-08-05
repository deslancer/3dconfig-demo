import { Header } from "./components/UI/Header";
import { Scene } from "./components/3D/Scene";
import { Sidebar } from "./components/UI/Sidebar";

const App = () => {
  return (
    <div className="h-screen w-screen bg-dark-gray relative">

      <Header />

      <main className="h-screen grid grid-cols-4 gap-1">

        <div className="col-span-3 bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <Scene />
        </div>
        
        <div className="col-span-1 bg-white rounded-lg shadow-lg p-4 overflow-y-auto h-full">
          <Sidebar />
        </div>
      </main>
    </div>
  );
};

export default App;