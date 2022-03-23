import './App.css';
import HomePage from './components/HomePage';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/login' element={<Login />} /> 
      </Routes>
    </div>
  );
}

export default App;
