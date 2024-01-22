import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './commponents/Home/Home';
import UserList from './commponents/Admin/Usermanagement/UserList';
import EditUser from './commponents/Admin/Usermanagement/EditUser';
import ViewProfile from './commponents/Account/ViewProfile';
import EditProfile from './commponents/Account/EditProfile';
import CreateUser from './commponents/Admin/Usermanagement/CreateUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/viewprofile' element={<ViewProfile></ViewProfile>}></Route>
        <Route path='/editprofile' element={<EditProfile></EditProfile>}></Route>
        <Route path='/createuser' element={<CreateUser></CreateUser>}></Route>
        <Route path='/userlist' element={<UserList></UserList>}></Route>
      <Route path='/edituser/:id' element={<EditUser></EditUser>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
