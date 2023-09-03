
import "./new.scss";
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar';

import FormCourses from './FormCourses';
import FormStudents from "./FormStudents";

const New = ({title}) => {

  return (
    <div className='new'>
      <Sidebar/>
      <div  className='newContainer'>
        <Navbar/>
           <div className='top'>
            <h1>  {title} </h1>
           </div>
           {
            title === "Add New Courses" && <FormCourses />
           }
           {
            title === "Add New Student" && <FormStudents />
           }
           
      </div>
    </div>
  )
}

export default New
