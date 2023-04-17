import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function BaseNode({ data, isConnectable }) {
  const [name, setName] = useState(data.name)
  const [scriptName,setScriptName]=useState(data.scriptName);
  const [type,setType]=useState(data.type);
  const [script,setScript]=useState(data.script);
  const [id,setId]=useState(data.id);
  /*,connections:  []*/
  /*const onChange = useCallback((evt) => {
    setDades(evt.target.value);

  }, []);*/

  return (
    <div>
      <label id="name" htmlFor="text">Name: {name}</label>
      <label id="id" htmlFor="text">Id: {id}</label>
      <label id="scriptName" htmlFor="text">Type:{type}</label>
      <label id="script" htmlFor="text">Modul: {script}</label>
    </div>
  );
}

export default BaseNode;
