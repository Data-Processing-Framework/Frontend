import './css/navBar.sass'
//import logo from '../img/logo.png'
import './css/modulButton.sass'

export function NavBar({toggleInfo, toggleMode}) {

    return (
      <nav className='navBar'>
        <div className="leftNav">
          <h1> Data Processing Framework </h1>
        </div>
        <div className="rightNav">
          <button onClick={toggleMode}>Mode</button>
          <button onClick={toggleInfo}>Info</button>
          <button>Moduls</button>
        </div>
      </nav>
    );
}