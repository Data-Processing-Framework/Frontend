import { useCallback, useState, useEffect } from "react";
import ReactFlow, { 
  Background, 
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
 } from 'reactflow';
import 'reactflow/dist/style.css';
import './css/graf/graph.sass'

import InputNode from './grafNodes/inputNode.js';
import './css/graf/text-updater-node.sass';
import ProcessingNode from './grafNodes/processingNode.js';
import './css/graf/proba.sass';
import OutputNode from './grafNodes/outputNode.js';
import './css/graf/proba.sass';

const proOptions = { hideAttribution: true };

const path= 'https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1';





const initialNodes = [
  { id: '1', type: 'Input', position: { x: 0, y: 0 }, data: { type: 1,scriptName:"Input", script: "pathIn" ,id: "1"/*,connections:  []*/} },

  {
    id: '2',
    // you can also pass a React component as a label
    type: 'Processing',
    position: { x: 100, y: 125 },
    data: { type: 2, scriptName:"Processing", script: "pathPross" ,id: "2"/*,connections:  []*/} 
  },
  {
    id: '3',
    type: 'Output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 }, 
    data: { type: 3,scriptName:"Output", script: "pathOut" ,id: "3"/*,connections:  []*/} 
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true},
  { id: 'e2-3', source: '2', target: '3', animated: true },
];
const nodeTypes = { Input: InputNode, Processing : ProcessingNode,Output : OutputNode };


function Graph() {
  const [mess,setMess]=useState();
  const [obj,setObj]=useState();

  useEffect(() => {
    
    // GET request using fetch inside useEffect React hook
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1')
        //.then(response=> console.log(response))
        .then((response) => {console.log(response);return response.json()})
        .then((json) => {
          setObj(json);
          console.log(json);
        });
      }, []);
  console.log(obj);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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
  return (
    <div className='graph'>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
