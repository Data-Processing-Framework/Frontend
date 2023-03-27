import './App.sass';
import './elements/css/colorPalette.sass'
import { EditBar } from './elements/editBar';
import { NavBar } from './elements/navBar';
import Graph from "./elements/graph"

function App() {
  return (
    <div className="App">
      <NavBar />
      <EditBar />
      <Graph />
    </div>
  );
}

export default App;
