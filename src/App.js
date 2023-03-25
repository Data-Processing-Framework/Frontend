import './App.sass';
import './elements/css/colorPalette.sass'
import { EditBar } from './elements/editBar';
import {NavBar} from './elements/navBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <EditBar />
    </div>
  );
}

export default App;
