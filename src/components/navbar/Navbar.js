import React, { useContext } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import "./Navbar.scss"
import { DarkModeContext } from '../../context/darkModeContext';
import { FunctionContext } from '../../context/functionContext';



const Navbar = () => {
    const{dispatch}=useContext(DarkModeContext);
    const {useradmin}= useContext(FunctionContext)
  return (
    <div className='navber'>
        <div className='wrapper'>
            <div className='items'>
                <div className='item' >
                    <DarkModeIcon className='icon' onClick={()=>dispatch({type:"TOGGLE"})}/>
                </div>
                <div className='item'>
                      <div> {useradmin} </div>
                </div>
                <div className='item'>
                <img   src="https://th.bing.com/th/id/OIP.WlUDXSME4D1KBxKlZEtVuwHaKA?pid=ImgDet&rs=1" alt="" className='avater'/> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
