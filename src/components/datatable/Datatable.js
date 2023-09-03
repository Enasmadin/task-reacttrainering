import React from 'react';
import "./datatable.scss"
import { Link } from 'react-router-dom';
import DataTableCourses from './DataTableCourses';
import DataTableStudent from './DataTableStudent';

const Datatable = ({title ,link}) => {
  return (

    <div className='datatable'>
      <div  className='datatabletitle'>
     {title} 
        <Link to={link} className='link'>
          Add New
        </Link>
      </div>
      {
        title === "Add New Courses" && <DataTableCourses/>
      }
      {
        title === "Add New Student" && <DataTableStudent/>
      }
     
    </div>
  )
}

export default Datatable;

