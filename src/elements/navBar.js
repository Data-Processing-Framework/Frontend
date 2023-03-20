import './navBar.css'
import logo from '../img/logo.png'

export function NavBar() {
    return (
      <nav className='navBar'>
        <div className="leftNav">
          <img src={logo} alt="logo"/>
          <h1> File Name</h1>
        </div>
      </nav>
    );
}