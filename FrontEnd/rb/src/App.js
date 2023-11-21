import React from 'react';
import './App.css';
//import Login from './components/login';
import Registration from './components/Registration';
import About from './components/about';
import Protected from './components/Protected';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';


function App() {
  return (
    
      <BrowserRouter>
        <Routes>
            <Route  path='/' element={<Registration />} />
            <Route  path='/Login' element={<Login />} />
            <Route  path='/about' element={<Protected Component={About} />} />
          </Routes>
      </BrowserRouter>
  
  );
}

export default App;
