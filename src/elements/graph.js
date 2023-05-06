import { useCallback, useState, useEffect, useMemo } from "react";
import ReactFlow, { 
  Background, 
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
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

function Graph(props) {
  const [edges, setEdges] = useState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

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
    props.setSelectedNode(node)
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
    if (props.rfInstance) {
      const flow = props.rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
    console.log("Save Done")
  }, [props.rfInstance]);
  //TODO make this work
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        props.setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
      console.log("Restore Done")
    };
    restoreFlow();
  }, [props.setNodes, setViewport]);
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
          edges={edges}
          onEdgesChange={onEdgesChange}
          onPaneClick={onPaneClick}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          proOptions={proOptions}
          onSave={onSave}
          onRestore={onRestore}
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

