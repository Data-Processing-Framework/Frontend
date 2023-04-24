import './App.sass';
import './elements/css/colorPalette.sass'
import { SecondaryBar } from './elements/secondaryBar';
import { NavBar } from './elements/navBar';
import Graph from "./elements/graph"
import {ShowModuls} from "./elements/showModuls"
import { Info }  from './elements/info';
import React, {useState, useEffect} from 'react';
import  Alert from './elements/alerts';

function App() {
  //Handles if info section is visible or not
  const [infoNode, setInfoNode] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const closeInfo = () => {
    setInfoOpen(false)
    setInfoNode(null)
  }
  const openInfo = () => {
    setInfoOpen(true)
  }
  const setInfo = (node) => {
    if (infoNode != null){
      setInfoNode(null)
    } 
    setInfoNode(node)
  }
  


  //Handles if moduls section is visible or not
  const [modulsIsOpen, setModulsIsOpen] = useState(false);
  const handleToggleModuls = () => {
    setModulsIsOpen(!modulsIsOpen)
  }

  //Handles if app is in edit mode or not
  //TODO Change graph settings when in edit mode or not 
  const [editMode, setEditMode] = useState(true);
  const sysStop = () => {
    setEditMode(true)
    //TODO fetch /system/stop
    //TODO get /sytem/status
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/system/status')
      .then((response) => {console.log(response); return response.json()})
      .then((json) => {
        console.log(json);
        json.errors.forEach(printError)
      });

  }
  const sysStart = () => {
    setEditMode(false)
    //TODO put graph
    //TODO fetch /system/start
    //TODO get /sytem/status
  }

  const sysRestart = () => {
    //TODO fetch /system/restart
    //TODO get /sytem/status
  }

  

  return (
    <div className='App'>
      <NavBar 
        sysStart={sysStart}
        sysStop={sysStop}
        sysRestart={sysRestart}
        editMode = {editMode}

        toggleModuls={handleToggleModuls}
      />
      <SecondaryBar 
        isOpen={infoOpen} 
        mode={editMode}
      />
      <Info 
        open={infoOpen} 
        node={infoNode} 
        closeInfo={closeInfo}
      />
      {modulsIsOpen && <ShowModuls toggleModuls={handleToggleModuls}/>}
      <Graph 
        setSelectedNode={setInfo} 
        selectedNode={infoNode} 
        closeInfo={closeInfo} 
        openInfo={openInfo}
      />
      <Alert/>
    </div>
  );
}
export default App;

function printError(error) {
  <Alert error={error} /> ;
}