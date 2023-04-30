import './css/showModuls.sass'
import React,{useEffect, useState} from 'react';
import { makeModules } from "../functionalities/makeModules";

export function ShowModuls({toggleModuls}) {
  const [modules, setModules] = useState([{id:123},{id:321}]);
  const [addModule, setAddModule] = useState(false);

  
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [type_in, setType_in] = useState();
  const [type_out, setType_Out] = useState();
  const [code, setCode] = useState();

  function toggleAddModule(){
    setAddModule(!addModule);
  }



  useEffect(() => {
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/module')
    //.then(response=> console.log(response))
    .then((response) => {console.log(response);return response.json()})
    .then((json) => {
      console.log(json);
      const {initialModules} = makeModules(json);
      console.log(initialModules)
      setModules(initialModules)
    });


    
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  
  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    const data = { 
      name: name, 
      description: description, 
      type_in: type_in ,
      type_out: type_out,
      code: code,
    }
    fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/module', {  // Enter your IP address here
      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify(data) // body data type must match "Content-Type" header

    })


    console.log(data)
    setName("")
    setType("")
    setDescription("")
    setType_in("")
    setType_Out("")
    setCode("")

    
  };



    return (
      
      <div className='showModuls' >
        <div className="showModuls-card" >
            <button type="button" class="btn-close m-3 position-relative top-0 start-0" aria-label="Close" onClick={toggleModuls} ></button>
            <h2>Moduls</h2>
            <div class="accordion" id="accordionExample" >
            {!addModule &&
              <>
                {modules.map(module => <p key={module.id}>
                <div class="accordion-item">
                  <h2 class="accordion-header" id={"headling"+module.id}>
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+module.id} aria-expanded="false" aria-controls={"headling"+module.id}>
                    {module.name}
                    </button>
                  </h2>
                  <div id={"collapse"+module.id} class="accordion-button collapsed collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <li>type: {module.type}</li>
                        <li>description: {module.description}</li>
                        <li>Expected dataType: {module.type_in}</li>
                        <li>Output dataType: {module.type_out}</li>                  
                      </div>
                  </div>
                </div>
                </p>)
                }
                < button type="button" class="btn-close m-3 position-relative top-0 end-100%" aria-label="Close" onClick={toggleAddModule} ></button>
              </>
            }
            {addModule &&
              <>
                <form id="newModule" name ="newModule" onSubmit={e => { handleSubmit(e) }}>
                  
                  <p>
                    Nom:
                    <input name="name" type="text" id="moduleNameIn" value={name} onChange={e => setName( e.target.value)} ></input>
                  </p>
                  <p>
                    Tipus:
                    <input name="type" type="text" id="moduleTypeIn" value={type} onChange={e => setType( e.target.value)} ></input>
                  </p>
                  <p>
                    Description:
                    <input name="description" type="text" id="moduleDescriptionIn" value={description} onChange={e => setDescription( e.target.value)} ></input>   
                  </p>
                  <p>
                    Dades d'entrada:
                    <input name="type_in" type="text" id="moduleInIn" value={type_in} onChange={e => setType_in( e.target.value)} ></input> 
                  </p>
                  <p>
                  Dades de sortida:
                  <input name="type_out" type="text" id="moduleOutIn" value={type_out} onChange={e => setType_Out( e.target.value)} ></input>
                  </p>
                  <p>
                  Fitxer de codi:
                  <input name="code" type="file" id="moduleFileIn" value={code} onChange={e => setCode( e.target.value)} ></input>  
                  </p>
                  <button type="submit" id="moduleSubmit"  >submit</button>

                </form>
                < button type="button" class="btn-close m-3 position-relative top-0 end-100%" aria-label="Close" onClick={toggleAddModule} ></button>
              </>
            }
            
          </div>
        </div>
      </div>
    );
}


