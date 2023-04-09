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
                        <h1>Id</h1><Badge>Input</Badge>
                        <h3>Description</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin erat erat, accumsan in nisl at, euismod porta elit. Nullam a nisi neque. Ut nec interdum nisl.</p>
                        <h3>Connections</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin erat erat, accumsan in nisl at, euismod porta elit. Nullam a nisi neque. Ut nec interdum nisl.</p>

                    </div>
                </div>
                <div className="logs-card">
                </div>
            </div>
    )
}