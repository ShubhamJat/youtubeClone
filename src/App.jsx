import React, { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Videos from "./pages/Videos/Video";

//AIzaSyDAOqabui6BHUuaTAt87Wa7CT8CWzVlBXE

const App = () => {
  const [sidebar,setSidebar] =useState(true);
  const [searchText,setSearchText] =useState("");
  return (
    <div>
      <NavBar setSidebar={setSidebar} setSearchText={setSearchText}/> 
      <Routes>
      <Route path='/video/:categoryId/:videoId' element={<Videos/>}> </Route>   
      <Route path='/' element={<Home sidebar={sidebar} searchText={searchText}/>}></Route>
       
      </Routes>
    </div>
  )
}

export default App;