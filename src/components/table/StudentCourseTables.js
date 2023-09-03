import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import  "./StudentCourseTables.scss"

const StudentCourseTables = () => {
  const [data,setData]=useState([{}]);
  useEffect(() => {
    fetchDataStudent();
  },[]);

  const fetchDataStudent = async () => {
    try {
      const response = await fetch('http://localhost:500/students');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
        return  ('Error fetching data:', error) ;
    }
  }
  return (
    <div className='list'>
    <Sidebar/>
    <div className='listContainer'>
     <Navbar/>
    <div  className='listContainer-table'>
            <div  className='listTitle'>
             Curent Course Student 
            </div>

    <TableContainer component={Paper}  class="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className='tablecell' > Student Name </TableCell>
          <TableCell  className='tablecell'> Course Name </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((student) => (
          <TableRow
            key={student.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
           {
            student.coursename && (  <> <TableCell  className='tablecell' >{student.name}</TableCell> <TableCell  className='tablecell'>{student.coursename}</TableCell> </>) 
           }

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
     
  </div>
  </div>
  </div>
 
  )
}

export default StudentCourseTables;
