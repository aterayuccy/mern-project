import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {useState} from 'react';
import Layout from './components/Layout';
import HomeComponent from './components/home-component';
import RegisterComponent from './components/register-component';
import LoginComponent from './components/login-component';
import ProfileComponent from './components/profile-component';
import AuthService from './services/auth.service';
import ProductComponent from './components/product-component';
import PostProductComponent from './components/postProduct-component';
import EnrollComponent from './components/enroll-component';
import SellProductComponent from './components/sellProduct-component';
import MyProductComponent from './components/myProduct-component';

function App() {
  let [currentUser,setCurrentUser]= useState(AuthService.getCurrentUser());
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout currentUser ={currentUser} setCurrentUser={setCurrentUser}/>} >
      {/* <Route path="return" element={<ReturnComponent
      currentUser ={currentUser} 
      setCurrentUser={setCurrentUser}/>} /> */}
      <Route index element={<EnrollComponent
      currentUser ={currentUser} 
      setCurrentUser={setCurrentUser}/>} />
      <Route path="register" element={<RegisterComponent/>} />
      <Route path="login" element={<LoginComponent
      currentUser ={currentUser} 
      setCurrentUser={setCurrentUser}/>} />
      <Route path="profile" element={<ProfileComponent 
      currentUser ={currentUser} 
      setCurrentUser={setCurrentUser}/>} />
       <Route path="product" element={<ProductComponent 
      currentUser ={currentUser} 
      setCurrentUser={setCurrentUser}/>} /> 
      <Route path="myProduct" element={<MyProductComponent 
      currentUser ={currentUser} 
      setCurrentUser={setCurrentUser}/>} />      
      <Route path="postProduct" element={<PostProductComponent 
      currentUser ={currentUser} 
      setCurrentUser={setCurrentUser}/>} />
      <Route path="sellProduct" element={<SellProductComponent 
      currentUser ={currentUser} 
      setCurrentUser={setCurrentUser}/>} />
      {/* <Route path="enroll" element={<EnrollComponent
      currentUser ={currentUser} 
      setCurrentUser={setCurrentUser}/>} /> */}
    </Route>
  </Routes>
  </BrowserRouter>
}

export default App;
