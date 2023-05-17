
import './css/logs.sass'
import { useEffect, useState, useRef  } from "react";




export function LogCard ({closeInfo, node, open}){
    const[info,setInfo]=useState();
    
    
    const myInterval = useRef();
    useEffect(() => {
        return () => clearInterval(myInterval.current);
    }, [node]);

    

    useEffect(() => {
        if (open) {
            getAlerts();
            myInterval.current = setInterval(() => getAlerts(),5000);
        } else {
          clearInterval(myInterval.current);
          myInterval.current = null;
        }
      }, [open]);
    
    

    function getAlerts() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React PUT Request Example' }),
            number : 10
        };
        fetch('https://virtserver.swaggerhub.com/BIELCAMPRUBI/DPF/1/graph/logs/'+ node.data.name, requestOptions)
            .then((res)=>{
                return res.text();
              }).then((text)=>{
               console.log(text)
               setInfo(text)
              })
    }

    return(
        <div className='info-start'>
            <div className='Header'>
                <h4>Logs</h4>
            </div>
            <div className="info-card" id="logsScreen">
                <div className='text'>
                    <div className='infoBody'>
                        {info}
                    </div>
                </div>
            </div>
        </div>
    )
}