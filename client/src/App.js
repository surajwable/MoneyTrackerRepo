import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {Button} from 'antd';
import {BrowserRouter,Navigate,Route, Routes} from 'react-router-dom';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem('moneytracker-user')) {
    return props.children; // Corrected from props.childern
  } else {
    return <Navigate to='/login' />;
  }
}

export default App;
