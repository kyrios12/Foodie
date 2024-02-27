import './App.css';
import Home from './Screens/Home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './Screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Sign_up from './Screens/Sign_up';

function App() {
  return (
    <Router>
    <div >
      <Routes>
          <Route path='/' element = {<Home />}></Route>
          <Route path='/login' element = {<Login />}></Route>
          <Route path='/createuser' element = {<Sign_up />}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
