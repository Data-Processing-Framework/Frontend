import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const [dades,setDades]=useState();
  const [type,setType]=useState();

  const onChange = useCallback((evt) => {
    setDades(evt.target.value);

    //document.getElementById("dades").innerHTML = setDades(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
        <label id="dades" htmlFor="text">{dades}</label>
        <label id="dada" htmlFor="text"></label>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}




export default TextUpdaterNode;
