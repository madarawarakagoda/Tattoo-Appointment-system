import React from "react";
import '../styles/LayoutStyles.css';
import { adminMenu,userMenu } from "../Data/data";
import axios from "axios";
import { useEffect } from "react";
import { Layout } from "antd";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

const HomePage = () => {
    // login usr data
    const getUserData = async () => {
        try {
            const res = await axios.post(
                "/api/v1/user/getUserData",
                {},
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const { user } = useSelector(state => state.user);
    const location = useLocation();
    //redering menu List
    const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;
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
                            {SidebarMenu.map((menu) => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    <div className={`menu-item ${isActive && "active"}`} key={menu.path}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='content'>
                        <div className='header'>
                            <div className="header-content">
                                <i className="fa-solid fa-bell"></i>
                               <Link to="/profile">{user?.name}</Link>
                            </div>
                        </div>
                        <div className='body'></div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
