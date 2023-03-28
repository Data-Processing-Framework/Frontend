import { Badge } from 'react-bootstrap';
import './css/info.sass'

export function Info (isOpen) {
    return (
        <section className={`info-section ${isOpen ? 'open' : ''}`}>
            <div className='info-start'>
                <div className="info-card">
                    <h1>Name</h1>
                    <h3>Description</h3>
                    <Badge>Input</Badge>
                </div>
                <div className="logs-card">
                </div>
            </div>
        </section> 
    ); 
}
