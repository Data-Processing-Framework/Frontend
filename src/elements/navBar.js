import './css/navBar.sass'
//import logo from '../img/logo.png'
import './css/modulButton.sass'

export function NavBar({toggleInfo, toggleMode, toggleModuls}) {
    return (
      <nav className='navBar'>
        <div className="leftNav">
          <h2 className='mb-0'> Data Processing Framework </h2>
        </div>
        <div className="rightNav">
          <button onClick={toggleMode}>Mode</button>
          <button onClick={toggleInfo}>Info</button>
          <button onClick={toggleModuls}>Moduls</button>
        </div>
      </nav>
    );
}