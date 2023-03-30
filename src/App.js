import './App.sass';
import './elements/css/colorPalette.sass'
import { SecondaryBar } from './elements/secondaryBar';
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
    <div className='App'>
      <NavBar toggleInfo={handleToggleIngfo} toggleMode={handleEditState}/>
      <SecondaryBar isOpen={infoIsOpen} mode={editMode}/>
      <Info isOpen={infoIsOpen}/>
      <Graph />
    </div>
  );
}

export default App;
