import { useCallback, useState, useStoreState} from 'react';
import { Handle, Position, useNodes, useNodeId } from 'reactflow';

const handleStyle = { left: 10 };

function BaseNode({ data, isConnectable}) {
  const [name, setName] = useState(data.name)
  const [scriptName,setScriptName]=useState(data.scriptName);
  const [type,setType]=useState(data.type);
  const [script,setScript]=useState(data.script);
  const [id,setId]=useState(data.id);
  
  //get nodes
  const nodes = useNodes()
  //find this node 
  const myNode = nodes.find((node) => node.id === `${useNodeId()}`);
  //get node options 
  const isSelected = myNode?.data?.options?.selected;

  /*,connections:  []*/
  /*const onChange = useCallback((evt) => {
    setDades(evt.target.value);
  }, []);*/

  return (
    <div className={`${isSelected ? 'nodeSelected' : ''}`}>
      <label id="name" htmlFor="text">Name: {name}</label>
      <label id="id" htmlFor="text">Id: {id}</label>
      <label id="scriptName" htmlFor="text">Type:{type}</label>
      <label id="script" htmlFor="text">Modul: {script}</label>
    </div>
  );
}

export default BaseNode;
