import './App.sass';
import './elements/css/colorPalette.sass'
import { EditBar } from './elements/editBar';
import { NavBar } from './elements/navBar';
import Graph from "./elements/graph"
import { Info }  from './elements/info';
import React, {useState} from 'react';
import { useStore } from 'reactflow';

function App() {
  //Handles if info section is visible or not
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const handleToggleIngfo = () => {
    setInfoIsOpen(!infoIsOpen)
  }

  //Handles if app is in edit mode or not
  const [editMode, setEditMode] = useState(false);
  const handleEditState = () => {
    setEditMode(!editMode)
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
