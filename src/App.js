<<<<<<< Updated upstream
import './App.css';
import { EditBar } from './elements/editBar';
import {NavBar} from './elements/navBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <EditBar />
=======
import './App.sass';
import './elements/css/colorPalette.sass'
import { SecondaryBar } from './elements/secondaryBar';
import { NavBar } from './elements/navBar';
import Graph from "./elements/graph"
import {ShowModuls} from "./elements/showModuls"
import { Info }  from './elements/info';
import React, {useState} from 'react';
import { useStore } from 'reactflow';

function App() {
  //Handles if info section is visible or not
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const handleToggleInfo = () => {
    setInfoIsOpen(!infoIsOpen)
  }

  //Handles if moduls section is visible or not
  const [modulsIsOpen, setModulsIsOpen] = useState(false);
  const handleToggleModuls = () => {
    setModulsIsOpen(!modulsIsOpen)
  }

  //Handles if app is in edit mode or not
  const [editMode, setEditMode] = useState(false);
  const handleEditState = () => {
    setEditMode(!editMode)
  }

  return (
    <div className='App'>
      <NavBar 
        toggleInfo={handleToggleInfo} 
        toggleMode={handleEditState} 
        toggleModuls={handleToggleModuls}
      />
      <SecondaryBar isOpen={infoIsOpen} mode={editMode}/>
      <Info isOpen={infoIsOpen}/>
      {modulsIsOpen && <ShowModuls toggleModuls={handleToggleModuls}/>}
      <Graph />
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
