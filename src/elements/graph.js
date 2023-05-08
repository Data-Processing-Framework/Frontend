import { useCallback, useState, useEffect, useMemo } from "react";
import ReactFlow, { 
  Background, 
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider 

 } from 'reactflow';
import 'reactflow/dist/style.css';
import './css/graf/graph.sass'
import { SecondaryBar } from "./secondaryBar";

import InputNode from './grafNodes/inputNode.js';
import './css/graf/text-updater-node.sass';
import ProcessingNode from './grafNodes/processingNode.js';
import './css/graf/proba.sass';
import OutputNode from './grafNodes/outputNode.js';
//import './css/graf/proba.sass';


import { divideGraph } from "../functionalities/divideGraph";

const flowKey = 'DPF-Graph';

const proOptions = { hideAttribution: true };

const nodeTypes = { Input: InputNode, Transform : ProcessingNode,Output : OutputNode };


const Graph = (props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const [editMode, setEditMode] = useState(props.mode)
  const [isSelectable, setIsSelectable] = useState(props.mode);
  const [isDraggable, setIsDraggable] = useState(props.mode);
  const [isConnectable, setIsConnectable] = useState(props.mode);
  const [panOnDrag, setpanOnDrag] = useState(true);;
  const [captureElementClick, setCaptureElementClick] = useState(props.mode);
  const [deleteKeyCode, setDeleteKeyCode] = useState('Backspace')

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
 
  //Get graph from the API 
  useEffect(() => {
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/graph')
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
  const onNodesChange = useCallback(
    (changes) => props.setNodes((nds) => applyNodeChanges(changes, nds)),
    [props.setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

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
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
    }
  };

  const onRestore = useCallback(() => {
    restoreFlow();
  }, [setNodes, setViewport]);

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
  }, [setNodes]);
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

