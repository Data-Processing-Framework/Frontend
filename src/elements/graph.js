import { useCallback, useState, useEffect, useMemo } from "react";
import ReactFlow, { 
  Background, 
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useNodeId,
  useNodes
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

const proOptions = { hideAttribution: true };

const nodeTypes = { Input: InputNode, Transform : ProcessingNode,Output : OutputNode };

function Graph(props) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
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

  const onNodeDoubleClick = (event, node) => {
    props.setSelectedNode(node)
    console.log("Selected node: " + node.id)
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {{node !== null ? node.position.x : null}
        if (node.id === (props.selectedNode !== null ? props.selectedNode.id : null)) {
          //Change border when node is selected
          node.selected=true
          node.style = { 
            border: "2px solid grey", 
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

  return (
    <div className='graph'>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDoubleClick={onNodeDoubleClick}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={proOptions}
        >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Graph;
