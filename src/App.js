import './App.sass';
import './elements/css/colorPalette.sass'
import { EditBar } from './elements/editBar';
import { NavBar } from './elements/navBar';
import Graph from "./elements/graph"
import { Info }  from './elements/info';
import React, {useState} from 'react';

function App() {
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const handleToggleIngfo = () => {
    setInfoIsOpen(!infoIsOpen)
  }
  return (
    <div className={`App ${infoIsOpen ? 'open' : ''}`}>
      <NavBar toggleIngfo={handleToggleIngfo}/>
      <EditBar isOpen={infoIsOpen}/>
      <Info isOpen={infoIsOpen}/>
      <Graph />
    </div>
  );
}

export default App;
