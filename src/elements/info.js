import { Badge } from 'react-bootstrap';
import './css/info.sass'
import React, {useState, useEffect} from 'react'


export function Info (props) {
    const [infoOpen, setInfoOpen] = useState(props.isOpen);
    useEffect(() => {
        setInfoOpen(props.isOpen);
    }, [props.isOpen]);
    return (
        <section className={`info-section ${infoOpen ? 'open' : 'closed'}`}>
            {infoOpen && <InfoCards/>}
        </section> 
    ); 
}

export function InfoCards () {
    return(
        <div className='info-start'>
                <div className="info-card">
                    <h1>Name</h1>
                    <h3>Description</h3>
                    <Badge>Input</Badge>
                </div>
                <div className="logs-card">
                </div>
        </div>
    )
}