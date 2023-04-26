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
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
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
      setNodes(initialNodes)
      setEdges(initialEdges)
    });
  }, []); 

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
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
    setNodes((nds) =>
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
  }, [props.selectedNode, setNodes]);

  const onSave = useCallback(() => {
    if (props.rfInstance) {
      const flow = props.rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [props.rfInstance]);
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setViewport]);
  return (
    <div className='graph'>
      <ReactFlow 
        nodes={nodes}
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
  );
}

function FlowWithProvider(setInfo, infoNode, closeInfo, openInfo, rfInstance) {
  return (
    <ReactFlowProvider>
      <Graph
        setSelectedNode={setInfo} 
        selectedNode={infoNode} 
        closeInfo={closeInfo} 
        openInfo={openInfo}
        rfInstance={rfInstance}
      />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;
