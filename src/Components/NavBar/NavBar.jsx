import React from 'react'
import './NavBar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notifn_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom'

const NavBar = ({setSidebar,setSearchText}) => {
  return (
    <nav className='flex-div'>
        <div className='nav-left flex-div'>
            <img className='menu-icon' onClick={()=>setSidebar(prev => prev===false?true:false)} src={menu_icon} alg=""/>
            <Link to="/"><img className='logo' src={logo} onClick={()=>{document.getElementById('searchInput').value="";setSearchText('')}} alt=""/></Link>
        </div>
        <div className='nav-middle flex-div'>
            <div className="search-bar flex-div">
             <input id='searchInput' type='text' placeholder='Search' 
              onChange={(e)=> e.target.value.length >3 ? setSearchText(e.target.value) : ""}/>
             <img src={search_icon} alt=""/>
            </div>  
        </div>
        <div className='nav-right flex-div'>
        <img src={upload_icon} alt=""/>
        <img src={more_icon} alt=""/>
        <img src={notifn_icon} alt=""/>
        <img className='user-icon' src={profile_icon} alt=""/>
        </div>
    </nav>
  )
}

export default NavBar