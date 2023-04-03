import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function BaseNode({ data, isConnectable }) {
  const [scriptName,setDades]=useState(data.scriptName);
  const [type,setType]=useState(data.type);
  const [script,setSctipt]=useState(data.script);
  const [id,setId]=useState(data.id);
  /*,connections:  []*/


  /*const onChange = useCallback((evt) => {
    setDades(evt.target.value);

  }, []);*/

  return (

    <div>
      <label id="id" htmlFor="text">{id}</label>
      <label id="scriptName" htmlFor="text">{scriptName}</label>
      <label id="script" htmlFor="text">{script}</label>
      <label id="type" htmlFor="type">{type}</label>
    </div>
  );
}




export default BaseNode;
