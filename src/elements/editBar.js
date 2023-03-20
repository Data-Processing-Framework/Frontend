import './editBar.css'
import undo from '../img/editBarIcons/Undo.png'
import redo from '../img/editBarIcons/Redo.png'
import move from '../img/editBarIcons/Move.png'
import addNodes from '../img/editBarIcons/Plus.png'
import addArestes from '../img/editBarIcons/Arestes.png'
import viewLogs from '../img/editBarIcons/View.png'
import save from '../img/editBarIcons/Save.png'
import submit from '../img/editBarIcons/Submit.png'
import bar from '../img/editBarIcons/Line.png'

export function EditBar() {
    return (
        <div className="editBar">
            <div className='editButtons'>
                <img className='button' src={undo} alt='undo' />
                <img className='button' src={redo} alt='redo' />
                <hr className='separators'/>
                <img className='button' src={move} alt='move' />
                <img className='button' src={addNodes} alt='addNodes' />
                <img className='button' src={addArestes} alt='addArestes' />
                <hr className='separators'/>
                <img className='button' src={viewLogs} alt='viewLogs' />
                <img className='button' src={save} alt='save' />
                <img className='button' src={submit} alt='submit' />
            </div>
        </div>
    );
}