import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import Home from './Home/index'
import Original from './Original/index'
import Equipo from './Equipo/index'
import Informativa from './Informativa/index'
import Usuario from './Usuario/index'
import Favoritos from './Favoritos/index'
import "./App.css"

function App() {
  

  return (
    <>
<Router>
<nav className="c-menu">
<Link to="/favoritos">Favoritos</Link>
<Link to="/original">Original</Link>
<Link to="/informativa">Informativa</Link>
<Link to="/usuario">Usuario</Link>
<Link to="/">Home</Link>
</nav>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/original" element={<Original/>}/>
<Route path="/favoritos" element={<Favoritos/>}/>
<Route path="/informativa" element={<Informativa/>}/>
<Route path="/usuario" element={<Usuario/>}/>
<Route path="/equipo/:equipo" element={<Equipo/>}/>
</Routes>
</Router>
</>
)
}

export default App