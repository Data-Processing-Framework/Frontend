import './css/navBar.sass'
//import logo from '../img/logo.png'
import './css/modulButton.sass'

export function NavBar() {
    return (
      <nav className='navBar'>
        <div className="leftNav">
          <h1> Data Processing Framework </h1>
        </div>
        <div className="rightNav">
          <button>Moduls</button>
        </div>
      </nav>
    );
}