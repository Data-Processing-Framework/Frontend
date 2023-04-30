import './App.sass';
import './elements/css/colorPalette.sass'
import { NavBar } from './elements/navBar';
import ReactFlowProvider from "./elements/graph"
import {ShowModuls} from "./elements/showModuls"
import { Info }  from './elements/info';
import React, {useState, useEffect} from 'react';
import  Alert from './elements/alerts';

const flowKey = 'DPF-Graph';

function App() {
  //---------------------------Visibiility Handlers-----------------------------------------
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

  //---------------------------MODES-----------------------------------------
  //Handles if app is in edit mode or not
  //TODO Change graph settings when in edit mode or not 
  const [editMode, setEditMode] = useState(true);
  const sysStop = () => {
    setEditMode(true)
    //fetch /system/stop
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/system/stop')
      .then((response) => {console.log(response)})
    //get /sytem/status
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/system/status')
      .then((response) => {console.log(response); return response.json()})
      .then((json) => {
        console.log("On Stop sysyem/status: ");
        console.log(json);
        //TODO create alert toast if error
        json.errors.forEach(printError)
      });

  }
  const sysStart = () => {
    setEditMode(false)
    //TODO put graph
    //fetch /system/start
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/system/status')
      .then((response) => {console.log(response); return response.json()})
      .then((json) => {
        console.log("On Start sysyem/status: ");
        console.log(json);
        //TODO create alert toast if error
        json.errors.forEach(printError)
      });
  }

  const sysRestart = () => {
    //fetch /system/restart
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/system/restart')
      .then((response) => {console.log(response)})
    //get /sytem/status
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/system/status')
      .then((response) => {console.log(response); return response.json()})
      .then((json) => {
        console.log("On Restart sysyem/status: ");
        console.log(json);
        //TODO create alert toast if error
        json.errors.forEach(printError)
      });
  }

  //---------------------------------APP-----------------------------------
  return (
    <div className='App'>
      <NavBar 
        sysStart={sysStart}
        sysStop={sysStop}
        sysRestart={sysRestart}
        editMode = {editMode}

        toggleModuls={handleToggleModuls}
      />
      <Info 
        open={infoOpen} 
        node={infoNode} 
        closeInfo={closeInfo}
      />
      {modulsIsOpen && <ShowModuls toggleModuls={handleToggleModuls}/>}

      <ReactFlowProvider 

        setSelectedNode={setInfo} 
        selectedNode={infoNode} 
        closeInfo={closeInfo} 
        openInfo={openInfo}
        isOpen={infoOpen} 
        mode={editMode}
      />
      <Alert/>
    </div>
  );
}
export default App;
