import React,{useState} from 'react'
import './Home.css'
import Sidebar from '../../Components/SideBar/Sidebar'
import Feed from '../../Components/Feed/Feed'

const Home = ({sidebar,searchText}) => {
  const [category,setCategory]= useState(0);
  return (
    <div>
        <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
        <div className={`container ${sidebar?"":"large-container"}`}>
          {searchText.length>3 ? <Feed category={category} searchText={searchText}/> : <Feed category={category} searchText={null}/>}
        </div>
    </div>
  )
}

export default Home