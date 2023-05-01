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
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
    
  }, [rfInstance]);

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
      />
      <div className='graph'>
        <ReactFlow 
          nodes={nodes}
          onNodesChange={onNodesChange}
          onNodesDelete={onNodesDelete}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}

          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPaneClick={onPaneClick}

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

