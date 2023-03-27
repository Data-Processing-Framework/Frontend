import { useCallback, useState } from "react";
import ReactFlow, { 
  Background, 
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
 } from 'reactflow';
import 'reactflow/dist/style.css';
import './css/graf/graph.sass'

import TextUpdaterNode from './grafParts/TextUpdaterNode.js';
import './css/graf/text-updater-node.sass';


const proOptions = { hideAttribution: true };


const initialNodes = [
  { id: '1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];
const nodeTypes = { textUpdater: TextUpdaterNode };


function Graph() {
  
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
