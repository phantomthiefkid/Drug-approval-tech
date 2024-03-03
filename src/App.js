import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './commponents/Home/Home';
import UserList from './commponents/Admin/Usermanagement/UserList';
import EditUser from './commponents/Admin/Usermanagement/EditUser';
import ViewProfile from './commponents/Account/ViewProfile';
import EditProfile from './commponents/Account/EditProfile';
import CreateUser from './commponents/Admin/Usermanagement/CreateUser';
import DrugList from './commponents/Admin/DrugManagement/DrugList';
import Navigation from './commponents/Navbar/Navigation';
import Footer from './commponents/Footer/Footer';
import CreateDrug from './commponents/Admin/DrugManagement/CreateDrug';
import ProductList from './commponents/Admin/ProductManagement/ProductList';
import CreateProduct from './commponents/Admin/ProductManagement/CreateProduct';
import UpdateProduct from './commponents/Admin/ProductManagement/UpdateProduct';
import ProductDetail from './commponents/Admin/ProductManagement/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/viewprofile' element={<ViewProfile></ViewProfile>}></Route>
        <Route path='/editprofile' element={<EditProfile></EditProfile>}></Route>
        <Route path='/createuser' element={<CreateUser></CreateUser>}></Route>
        <Route path='/userlist' element={<UserList></UserList>}></Route>
        <Route path='/edituser/:email' element={<EditUser></EditUser>}></Route>
        <Route path='/druglist' element={<DrugList></DrugList>}></Route>
        <Route path='/createdrug' element={<CreateDrug></CreateDrug>}></Route>
        <Route path='/productlist' element={<ProductList></ProductList>}></Route>
        <Route path='/createproduct' element={<CreateProduct></CreateProduct>}></Route>
        <Route path='/updateproduct' element={<UpdateProduct></UpdateProduct>}></Route>
        <Route path='/productdetail/:id' element={<ProductDetail></ProductDetail>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
