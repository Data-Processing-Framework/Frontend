import './App.sass';
import './elements/css/colorPalette.sass'
import { NavBar } from './elements/navBar';
import ReactFlowProvider from "./elements/graph"
import {ShowModuls} from "./elements/showModuls"
import {ShowNewNode} from "./elements/showNewNode"
import { Info }  from './elements/info';
import React, {useState, useEffect} from 'react';
import  Alert from './elements/alerts';
import ReactFlow, { useReactFlow } from 'reactflow';
import { joinGraph } from './functionalities/joinGraph';
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

  const [NewNode, setNewNode] = useState(false);
  const handleToggleNewNode = () => {
    setNewNode(!NewNode)
    console.log(NewNode)
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
      });

  }
  const sysStart = () => {
    setEditMode(false)
    //TODO put graph
    const getGraph = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow) {
        console.log(flow.nodes)
        console.log(flow.edges)
        return joinGraph(flow.nodes, flow.edges) 
      }
    };
    const graph = getGraph();
    console.log(graph)
    //do the put
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/graph', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: graph
    })
    .then(response => {console.log(response); return response.json()})
    

    
    //fetch /system/start
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/system/status')
      .then((response) => {console.log(response); return response.json()})
      .then((json) => {
        console.log("On Start sysyem/status: ");
        console.log(json);
        //TODO create alert toast if error
        //json.errors.forEach(printError)
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
        //json.errors.forEach(printError)
      });
  }
  //--------------------------------NODES-----------------------------------
  const [nodes, setNodes] = useState([]);

  //---------------------------------APP-----------------------------------
  return (
    <div className='App'>
      <NavBar 
        sysStart={sysStart}
        sysStop={sysStop}
        sysRestart={sysRestart}
        editMode = {editMode}

        toggleModuls={handleToggleModuls}
        toggleNewNode={handleToggleNewNode}
      />
      <Info 
        open={infoOpen} 
        node={infoNode} 
        closeInfo={closeInfo}
      />
      {modulsIsOpen && <ShowModuls toggleModuls={handleToggleModuls}/>}
      {NewNode && <ShowNewNode togglenewnode={handleToggleNewNode} nodes={nodes} setNodes={setNodes}/>}
      <ReactFlowProvider 
        togglenewnode={handleToggleNewNode}
        setSelectedNode={setInfo} 
        selectedNode={infoNode} 
        closeInfo={closeInfo} 
        openInfo={openInfo}
        isOpen={infoOpen} 
        mode={editMode}
        nodes={nodes}
        setNodes={setNodes}
      />
      <Alert/>
    </div>
  );
}
export default App;
