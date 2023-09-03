import React, { useContext } from 'react';
import "./Sidbar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import { Link } from "react-router-dom";
import { DarkModeContext } from '../../context/darkModeContext';

const Sidebar = () => {
    const{dispatch}=useContext(DarkModeContext);
  return (
    <div className='sidebar'>
        <div className='top'>
            <Link  to="/home" style={{textDecoration:"none" }}>
            <span  className='logo'> Future Generation </span>
            </Link>
        </div>
        <hr/>
        <div  className='center'>
            <ul>
                <p className='title'> MAIN </p>
                <Link  to="/home" style={{textDecoration:"none" }}>
                <li>
                    <DashboardIcon className='icon'/>
                    <span> Dashbord </span>
                </li>
                </Link>
                <p className='title'>LISTS </p>
                <Link  to="/students" style={{textDecoration:"none" }}>
                <li>
                    <PeopleOutlineOutlinedIcon className='icon'/>
                    <span> Students </span>
                </li>
                </Link>
                <Link  to="/courses" style={{textDecoration:"none" }}>
                <li>
                    <AddBusinessOutlinedIcon className='icon'/>
                    <span>  All Courses </span>
                </li>
                </Link>
                <Link   to= "/courses/studentcourse"  style={{textDecoration:"none" }}>
                <li>
                    <BookOutlinedIcon className='icon'/>
                    <span> Student Courses </span>
                </li>   
                </Link>
            </ul>

        </div>
        <div className='bottom'>
            <div  className='colorOption' onClick={()=>dispatch({type:"LIGHT"})}>   </div>
            <div  className='colorOption'  onClick={()=>dispatch({type:"DARK"})}>   </div>
            
        </div>
       
    </div>
  )
}

export default Sidebar
