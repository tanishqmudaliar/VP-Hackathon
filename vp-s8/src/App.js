import './App.css';
import MainPage from './components/MainPage';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { UserAuthContextProvider } from "./context/UserAuthContext";
import HomePage from './components/HomePage';
import ProtectedRoute from "./components/ProtectedRoutes.js";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/home' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
