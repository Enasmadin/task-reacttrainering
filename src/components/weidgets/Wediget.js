import React, { useContext } from 'react';
import "./wediget.scss";
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import { FunctionContext } from '../../context/functionContext';
import { Link } from 'react-router-dom';

const Wediget = ({type ,link}) => {
  const{dataStudent ,dataCourses}=useContext(FunctionContext);
    let data ;
  
    switch(type){
       case"students":
       data={
           title:"STUDENTS",
           ismoney:false,
           link:"see all students ",
           icon:<PersonIcon  className='icon' style={{ color:"crimson" ,backgroundColor:"rgba(255,0,0,0.2)"}}/>
       }
      
       break;
       case"earning":
       data={
           title:" all courses",
           ismoney:false,
           link:"View all courses  ",
           icon:<PublicIcon  className='icon' style={{ backgroundColor:"rgba(0,128,0,0.2)" ,color:"green" }}/>
       }
       break;
       default:
        break
     }
  return (
    <div className='wediget'>
           <div className='left'>
             <span className='title'>
                { data.title }
             </span>
             <span className='counter'>
                     {data.ismoney && "&"}
                     {type === "students" &&  dataStudent.length}
                     {type === "earning" &&  dataCourses.length}
             </span>
             <span className='link'>
              <Link  to ={link}>
               {data.link} 
              </Link>
             </span>
           </div>
            <div className='right'> 
               <div  className='icon'>
                     {data.icon}
               </div>
            </div>
        </div>
  )
}

export default Wediget
