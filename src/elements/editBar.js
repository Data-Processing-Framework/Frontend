import './css/editBar.sass'
import undo from '../img/editBarIcons/Undo.png'
import redo from '../img/editBarIcons/Redo.png'
import move from '../img/editBarIcons/Move.png'
import addNodes from '../img/editBarIcons/Plus.png'
import addArestes from '../img/editBarIcons/Arestes.png'
import viewLogs from '../img/editBarIcons/View.png'
import save from '../img/editBarIcons/Save.png'
import submit from '../img/editBarIcons/Submit.png'
import React, {useState, useEffect} from 'react'

export function EditBar(props) {
    //Gets and updates sates of the info module
    //in order to update the width
    const [infoOpen, setInfoOpen] = useState(props.isOpen);
    useEffect(() => {
        setInfoOpen(props.isOpen);
    }, [props.isOpen]);

    return (
        <div className="editBar">
            <div className={`editButtons ${infoOpen ? 'open' : 'closed'}`}>
                <button>
                    <img className='button' src={undo} alt='undo' />
                </button>
                <button>
                    <img className='button' src={redo} alt='redo' />
                </button>
                
                <hr className='separators'/>
                <button>
                    <img className='button' src={move} alt='move' />
                </button>
                <button>
                    <img className='button' src={addNodes} alt='addNodes' />
                </button>
                <button>
                    <img className='button' src={addArestes} alt='addArestes' />
                </button>
                <hr className='separators'/>
                <button>
                    <img className='button' src={viewLogs} alt='viewLogs' />
                </button>
                <button>
                    <img className='button' src={save} alt='save' />
                </button>
                <button>
                    <img className='button' src={submit} alt='submit' />
                </button>
            </div>
        </div>
    );
}