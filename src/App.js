import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './commponents/Home/Home';
import ViewProfile from './commponents/Account/ViewProfile';
import EditProfile from './commponents/Account/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/viewprofile' element={<ViewProfile></ViewProfile>}></Route>
        <Route path='/editprofile' element={<EditProfile></EditProfile>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
