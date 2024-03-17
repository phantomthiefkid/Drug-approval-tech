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
import OrganizationGuest from './commponents/Admin/ProductManagement/ProductGuest/OrganizationGuest';
import ProductListGuest from './commponents/Admin/ProductManagement/ProductGuest/ProductListGuest';
import ProductDetailGuest from './commponents/Admin/ProductManagement/ProductGuest/ProductDetailGuest';
import Organization from './commponents/Admin/ProductManagement/Organization';
import CreateProfileProduct from './commponents/Admin/ProfileProduct/CreateProfileProduct';
import ProfileProductList from './commponents/Admin/ProfileProduct/ProfileProductList'
import ProfileDetail from './commponents/Admin/ProfileProduct/ProfileDetail';
import PasswordChange from './commponents/Account/PasswordChange';
import UploadTest from './commponents/uploadTest';
import SelectEmailComponent from './shared/SelectEmailComponent';

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
        <Route path='/organizationGuest' element={<OrganizationGuest></OrganizationGuest>}></Route>
        <Route path='/productlist/:id' element={<ProductList></ProductList>}></Route>
        <Route path='/productlistguest/:id' element={<ProductListGuest></ProductListGuest>}></Route>
        <Route path='/organization' element={<Organization></Organization>}></Route>
        <Route path='/createproduct/:id' element={<CreateProduct></CreateProduct>}></Route>
        <Route path='/updateproduct/:id' element={<UpdateProduct></UpdateProduct>}></Route>
        <Route path='/productdetail/:id' element={<ProductDetail></ProductDetail>}></Route>
        <Route path='/productdetailforguest/:id' element={<ProductDetailGuest></ProductDetailGuest>}></Route>
        <Route path='/createprofileproduct' element={<CreateProfileProduct></CreateProfileProduct>}></Route>
        <Route path='/profilelist' element={<ProfileProductList></ProfileProductList>}></Route>
        <Route path='/profiledetail/:id' element={<ProfileDetail></ProfileDetail>}></Route>
        <Route path='/passwordchange/:email' element={<PasswordChange></PasswordChange>}></Route>
        <Route path='/upload' element={<UploadTest></UploadTest>}></Route>
        <Route path='/test' element={<SelectEmailComponent></SelectEmailComponent>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
