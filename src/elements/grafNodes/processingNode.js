import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './baseNode.js';


const handleStyle = { left: 10 };

function ProcessingNode({ data, isConnectable }) {

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      <BaseNode />
    </div>
  );
}

export default ProcessingNode;
