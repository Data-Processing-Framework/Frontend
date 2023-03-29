import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function BaseNode({ data, isConnectable }) {
  const [dades,setDades]=useState();
  const [type,setType]=useState();
  const [script,setSctipt]=useState();
  const [id,setId]=useState();

  const onChange = useCallback((evt) => {
    setDades(evt.target.value);

    //document.getElementById("dades").innerHTML = setDades(evt.target.value);
  }, []);

  return (

    <div>
      <label htmlFor="text">Text:</label>
      <input id="text" name="text" onChange={onChange} className="nodrag" />
      <label id="dades" htmlFor="text">{dades}</label>
      <label id="dada" htmlFor="text"></label>
    </div>
  );
}




export default BaseNode;
