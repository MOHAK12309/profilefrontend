import React from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';

import Goggle from './googleLogin';




import { ToastContainer } from 'react-toastify';
import ProfilePage from './ProfilePage';






function App() {
  return (
    <div className="App">
  
      <Routes>
  
        <Route path='/' element={<Goggle/>}></Route>
   
        <Route path='/userProfile' element={<ProfilePage/>}></Route>

      </Routes>
 <ToastContainer/>
    </div>
  );
}

export default App;
