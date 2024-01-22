import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './commponents/Home/Home';
import UserList from './commponents/Admin/Usermanagement/UserList';
import Footer from './commponents/Footer/Footer';
import EditUser from './commponents/Admin/Usermanagement/EditUser';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/userlist' element={<UserList></UserList>}></Route>
      <Route path='/edituser/:id' element={<EditUser></EditUser>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
