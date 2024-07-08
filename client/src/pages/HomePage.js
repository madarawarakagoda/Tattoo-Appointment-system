import React, {useEffect } from "react";
import axios from "axios";
import '../styles/LayoutStyles.css';
import { Layout } from "antd";
import { SidebarMenu } from "../Data/data";
import { Link,useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";



const HomePage = () => {
    //login usr data
    const getUserData = async () => {
      try{
       const res = await axios.post(
      "/api/v1/user/getUserData",
      {},
      {
        headers:{
          Authorization: "Bearer "+localStorage.getItem("token"),

        },
      }
    );
  }catch(error){
    console.log(error);
  }
};

useEffect(()=>{
  getUserData();
},[]);


 const {user} =useSelector(state => state.user) 
const location = useLocation();
return (
<Layout>
<div className='main'>
    <div className='layout'>
      <div className='sidebar'>
        <div className='logo'>
        <h6>SKIN CRAFT</h6>
        <hr />
        </div>
        <div className='menu'>
        {SidebarMenu.map((menu)=> {
          const isActive = location.pathname === menu.path;
          return(
            <>
                <div className={`menu-item ${isActive && "active"}`}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>

                </div>
            </>
          );
        })}
        </div>
      </div>
      <div className='content'>
        <div className='header'>
        <i class="fa-solid fa-bell"></i>
        <link to="/Profile">{user?.name}</link>
        </div>
          <div className='body'></div>         
      </div>
    </div>
    </div>

    
</Layout>


      
     
  );
};

export default HomePage;