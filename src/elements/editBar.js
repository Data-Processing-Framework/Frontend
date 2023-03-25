import './css/editBar.sass'
import undo from '../img/editBarIcons/Undo.png'
import redo from '../img/editBarIcons/Redo.png'
import move from '../img/editBarIcons/Move.png'
import addNodes from '../img/editBarIcons/Plus.png'
import addArestes from '../img/editBarIcons/Arestes.png'
import viewLogs from '../img/editBarIcons/View.png'
import save from '../img/editBarIcons/Save.png'
import submit from '../img/editBarIcons/Submit.png'

export function EditBar() {
    return (
        <div className="editBar">
            <div className='editButtons'>
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