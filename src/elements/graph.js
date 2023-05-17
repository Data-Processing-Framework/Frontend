import { useCallback, useState, useEffect, useMemo } from "react";
import ReactFlow, { 
  Background, 
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  ReactFlowProvider,
  useNodes
 } from 'reactflow';
import 'reactflow/dist/style.css';
import './css/graf/graph.sass'
import './css/graf/nodes.sass'
import { SecondaryBar } from "./secondaryBar";

import InputNode from './grafNodes/inputNode.js';
import ProcessingNode from './grafNodes/processingNode.js';
import OutputNode from './grafNodes/outputNode.js';
import {conectionPath} from '../API/globals'

import { divideGraph } from "../functionalities/divideGraph";
import { makeModules } from "../functionalities/makeModules";

const flowKey = 'DPF-Graph';

const proOptions = { hideAttribution: true };

const nodeTypes = { Input: InputNode, Transform : ProcessingNode,Output : OutputNode };



const Graph = (props) => {
  //const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  
  const [modules, setModules] = useState() 
  const [newConectionType, setNewConectionType] = useState(null)
  const [editMode, setEditMode] = useState(props.mode)
  const [isSelectable, setIsSelectable] = useState(props.mode);
  const [isDraggable, setIsDraggable] = useState(props.mode);
  const [isConnectable, setIsConnectable] = useState(props.mode);
  const [panOnDrag, setpanOnDrag] = useState(true);;
  const [captureElementClick, setCaptureElementClick] = useState(props.mode);
  const [deleteKeyCode, setDeleteKeyCode] = useState('Backspace')

  useEffect(() => {
    const interval = setInterval( () => {
      fetch(conectionPath + '/module')
        .then((response) => {console.log(response);return response.json()})
        .then((json) => {
          const {initialModules} = makeModules(json);
          console.log(initialModules)
          setModules(initialModules)
        });
    }, 10000);
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [modules, setModules]); // Empty dependency array ensures the effect runs only once


  useEffect(() => {
    if (props.mode) {
      // Settings when edit is true
      setEditMode(true)
      setIsSelectable(true)
      setIsDraggable(true)
      setIsConnectable(true)
      setCaptureElementClick(true)
      setDeleteKeyCode('Backspace')
      console.log('EditMode is true');
      
    } else {
      // Settings when edit is false
      setEditMode(false)
      setIsSelectable(false)
      setIsDraggable(false)
      setIsConnectable(false)
      setCaptureElementClick(false)
      setDeleteKeyCode(null)
      console.log('EditMode is false');
    }
  }, [props.mode]);
 
  //Get graph
  useEffect(() => {
    fetch(conectionPath +'/graph')
    //.then(response=> console.log(response))
    .then((response) => {console.log(response);return response.json()})
    .then((json) => {
      console.log(json);
      const { initialNodes, initialEdges } = divideGraph(json);
      console.log(initialNodes)
      console.log(initialEdges)
      props.setNodes(initialNodes)
      setEdges(initialEdges)
    });
  }, []); 

  const isValidConnection = (connection) => canConnect(connection); //change 

  const canConnect = (conn)=> {
    //get the source node module and check if the target Id has that type 
    const sourceScript = rfInstance.getNode(conn.source).data.scriptName
    const targetScript = rfInstance.getNode(conn.target).data.scriptName
    //console.log(sourceScript)
    //console.log(targetScript)
    let indexSource = null 
    let indexTarget = null 
    //console.log(modules)
    for (let i = 0; i < modules.length; i++){
      if (modules[i].name == sourceScript ) {
        indexSource = i 
        break;
      }
    }

    for (let i = 0; i < modules.length; i++){
      if (modules[i].name == targetScript ) {
        indexTarget = i 
        break;
      }
    }

    //console.log(modules[indexTarget].type_in)
    //console.log(modules[indexSource].type_out)
    if (modules[indexTarget].type_in.includes(modules[indexSource].type_out[0])||modules[indexTarget].type_in == 'any') {
      setNewConectionType(modules[indexSource].type_out[0]) //this is to use it when creating the new edge and set the type
      return true
    }else{
      return false
    }
  }
  
  const onNodesChange = useCallback(
    (changes) => props.setNodes((nds) => applyNodeChanges(changes, nds)),
    [props.setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  )
  
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const onNodeClick = (event, node) => {
    if (editMode) {
      props.setSelectedNode(node)
    } else {
      props.setSelectedNode(node)
      props.openInfo()
    }
  }

  const onNodeDoubleClick = (event, node) => {
    props.setSelectedNode(node)
    props.openInfo()
    console.log("Selected node: " + node.id)
  };
  
  const onNodesDelete = (node) => {
    props.closeInfo()
    }

  const onPaneClick = (event) => {
    props.closeInfo()
  }

  useEffect(() => {
    props.setNodes((nds) =>
      nds.map((node) => {{node !== null ? node.position.x : null}
        if (node.id === (props.selectedNode !== null ? props.selectedNode.id : null)) {
          //Change border when node is selected
          node.selected=true
          node.style = { 
            border: "2px solid #b6b6b9", 
            'borderRadius': "5px" };
        }
        else{
          //reset border value when deselected
          node.style = {};
          node.selected = false
        }
        return node;
      })
    );
  }, [props.selectedNode, props.setNodes]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
    
  }, [rfInstance]);

  const restoreFlow = async () => {
    const flow = JSON.parse(localStorage.getItem(flowKey));

    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      props.setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
    }
  };

  const onRestore = useCallback(() => {
    restoreFlow();
  }, [props.setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [props.setNodes]);
  return (
    
    <div className='editSection'>
      <SecondaryBar 
        isOpen={props.isOpen} 
        mode={props.mode}
        onSave={onSave}
        onRestore={onRestore}
        togglenewnode={props.togglenewnode}
      />
      <div className='graph'>
        <ReactFlow 
          nodes={props.nodes}
          onNodesChange={onNodesChange}
          onNodesDelete={onNodesDelete}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}

          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          
          onPaneClick={onPaneClick}
          elementsSelectable={isSelectable}
          nodesFocusable={isSelectable}
          edgesFocusable={isSelectable}
          nodesDraggable={isDraggable}
          nodesConnectable={isConnectable}
          panOnDrag={panOnDrag}
          captureElementClick={captureElementClick}
          deleteKeyCode={deleteKeyCode}

          isValidConnection={isValidConnection}

          fitView
          proOptions={proOptions}
          onInit={setRfInstance}
          >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default (props) => (
    <ReactFlowProvider>
      <Graph
        {...props}
      />
    </ReactFlowProvider>
);

