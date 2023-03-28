import './css/navBar.sass'
//import logo from '../img/logo.png'
import './css/modulButton.sass'

export function NavBar({toggleIngfo}) {

    return (
      <nav className='navBar'>
        <div className="leftNav">
          <h1> Data Processing Framework </h1>
        </div>
        <div className="rightNav">
          <button onClick={toggleIngfo}>Info</button>
          <button>Moduls</button>
        </div>
      </nav>
    );
}