import { Badge } from 'react-bootstrap';
import './css/info.sass'
import React, {useState, useEffect} from 'react'

export function Info (props) {
    const [infoOpen, setInfoOpen] = useState(props.isOpen);
    useEffect(() => {
        setInfoOpen(props.isOpen);
    }, [props.isOpen]);
    return (
        <section className={` info-section offcanvas offcanvas-end ${infoOpen ? 'show' : ''}`} id="offcanvasInfo">
            {infoOpen && <InfoCards toggleInfo={props.toggleInfo}/>}
        </section> 
    ); 
}

export function InfoCards ({toggleInfo}) {
    return(
            <div className='info-start'>
                <button type="button" class="btn-close m-2" aria-label="Close" onClick={toggleInfo}></button>
                <div className="info-card">
                    <div className='colorBackground'></div>
                    <div className='text'>
                        <div className='Header'>
                            <h1>Node: 1</h1><Badge>Input</Badge>
                        </div>
                        <div className='infoBody'>
                            <h5>Information</h5>
                            <p>Position: 0,0</p>
                            <p>Modul: fromDatabase.py</p>
                            <p>Connections: 2</p>
                        </div>
                    </div>
                </div>
                <div className="logs-card">
                </div>
            </div>
    )
}