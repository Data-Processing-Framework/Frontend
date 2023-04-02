<<<<<<< Updated upstream
import './navBar.css'
import logo from '../img/logo.png'

export function NavBar() {
    return (
      <nav className='navBar'>
        <div className="leftNav">
          <img src={logo} alt="logo"/>
          <h1> File Name</h1>
=======
import './css/navBar.sass'
//import logo from '../img/logo.png'
import './css/modulButton.sass'

export function NavBar({toggleInfo, toggleMode, toggleModuls}) {
    return (
      <nav className='navBar'>
        <div className="leftNav">
          <h1> Data Processing Framework </h1>
        </div>
        <div className="rightNav">
          <button onClick={toggleMode}>Mode</button>
          <button onClick={toggleInfo}>Info</button>
          <button onClick={toggleModuls}>Moduls</button>
>>>>>>> Stashed changes
        </div>
      </nav>
    );
}