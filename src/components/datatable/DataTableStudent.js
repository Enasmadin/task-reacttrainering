import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { userColumnsStudens } from './database';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Masonry } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import "./datatablestudent.scss"
const DataTableStudent = () => {
const [data,setData]=useState([{}]);
const [open, setOpen] =useState(false);
const[nameStudent,setnameStudent]=useState("");
const[emailStudent,setEmailStudent]=useState("");
const[address,setAddress]=useState("");
const[telphone ,setTelphone]=useState("");
const [dataSingleStudent,setDataSingleStudent]=useState("");
const [openDiolgEdit, setOpenDiolgEdit] =useState(false);
const [dataCourses, setDataCourses]=useState([{}]);
const[courseName,setCourseName] = useState("");


useEffect(() => {
    fetchDataStudent();
    getAllCourses();
  },[]);
  
function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
 }
 const fetchDataStudent = async () => {
    try {
      const response = await fetch('http://localhost:500/students');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
        return  ('Error fetching data:', error) ;
    }
  }
  const fetchDataStudentById = async (id) => {
    try {
      const response = await fetch(`http://localhost:500/students/${id}`);
      const jsonData = await response.json();
      setDataSingleStudent(jsonData);
      setnameStudent(jsonData.name);
      setEmailStudent(jsonData.email);
      setAddress(jsonData.address);
      setTelphone(jsonData.telphone);
    } catch (error) {
        return  ('Error fetching data By Id :', error) ;
    }
  }
  const handelUpdate = (id)=>{
    fetchDataStudentById(id);
   
  }
  const getAllCourses =async()=>{
    try {
        const response = await fetch('http://localhost:500/courses');
        const jsonData = await response.json();
         setDataCourses(jsonData);
        // jsonData.map((alldata)=>console.log(alldata.nameCourse));
        console.log(dataCourses ,"allcourses")
      } catch (error) {
          return  ('Error fetching data:', error) ;
      }
  }
  const handelAddToCourse = async(e ,id)=>{
    e.preventDefault()
    const updateCourse = { ...dataSingleStudent, coursename:courseName }
    console.log(updateCourse ,"updateCourse");
    const res = await fetch(`http://localhost:500/students/${id}`, {
      method: "PUT",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(updateCourse)
  })

  const data = await res.json();
  setDataSingleStudent( dataSingleStudent.id === id ? { dataSingleStudent, name: data.coursename, } && fetchDataStudent() && handleCloseDiolgAdd() : dataSingleStudent && handleCloseDiolgAdd())
  }

  const handelDelte= async(id)=>{
    console.log(id,"id")
   fetch(`http://localhost:500/students/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            fetchDataStudent()
        });
  }

  const handelEdit =async (e,id)=>{
    console.log(e ,"e");
    console.log(id ,"id");
    e.preventDefault();
    const updateCourse = { ...dataSingleStudent, name:nameStudent, email: emailStudent , telphone:telphone , address:address }
    console.log(updateCourse ,"updateCourse");
    const res = await fetch(`http://localhost:500/students/${id}`, {
      method: "PUT",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(updateCourse)
  })

  const data = await res.json();
  setDataSingleStudent( dataSingleStudent.id === id ? { dataSingleStudent, name: data.name, email: data.email ,address:data.address,telphone:data.telphone } && fetchDataStudent() && setOpen(false) : dataSingleStudent && setOpen(false))
  }

  const actionColumn = [ {
    field: 'actionButton',
    headerName: 'Actions',
    width: 300,
   renderCell:(parms)=>{
        return(
                <div className="cellActions">
                  <div  className='viewButton' onClick={()=>{handelUpdate(parms.row.id); getAllCourses(); handleClickOpen();}} > Edit </div>
                  <div  className='delteButton' onClick={()=>{handelDelte(parms.row.id)}}> Delete </div>
                  <div  className='AddButton' onClick={()=>{handelUpdate(parms.row.id) ; handleClickOpenDiolgAdd()}}> Add To course </div>
                </div> 
              )
         }
  },] 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dataCourses.map((datcourse)=> console.log(datcourse.nameCourse))
  };
  const handleClickOpenDiolgAdd = () => {
    setOpenDiolgEdit(true);
  };

  const handleCloseDiolgAdd  = () => {
    setOpenDiolgEdit(false);
  };

  return (
    <div className='datatablestudent'>
        <DataGrid
        className='datagrid'
        getRowId={(row) =>  generateRandom()}
        rows={data}
        columns={userColumnsStudens.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
     <Dialog open={open} onClose={handleClose} className='dialog-data'>
     <div  className='dialog-title' >
        <DialogTitle>Edit Student </DialogTitle>
        <CloseIcon  className='closeicon' onClick={handleClose}/> 
        </div>
        <DialogContent  >
        <form onSubmit={(e) => handelEdit(e ,dataSingleStudent.id)} className='update-student'>  
        <Masonry columns={1} spacing={2}>
        <div  className='formInputupdate' >
        <label htmlFor="name" className="form-label "> Name</label>
          <input type="text" className="form-control " id="name" placeholder="Student Name"  value={nameStudent} onChange={(e)=> setnameStudent(e.target.value)}/>          
        </div>
        <div  className='formInputupdate' >
        <label htmlFor="email" className="form-label "> Email </label>
                  <input type="email" className="form-control " id="email" placeholder="Student Email"  value={emailStudent} onChange={(e)=> setEmailStudent(e.target.value)}/>
        </div>
        <div  className='formInputupdate' >
        <label htmlFor="telphone" className="form-label "> Telephone </label>
         <input type="tel" className="form-control " id="telphone" placeholder="Student Telphone"  value={address} onChange={(e)=> setAddress(e.target.value)}  />
        </div>
        <div  className='formInputupdate' >
        <label htmlFor="address" className="form-label "> Address </label>
        <input type="text" className="form-control " id="address" placeholder="Student Address"  value={telphone} onChange={(e)=> setTelphone(e.target.value)}/>
        </div>
       <div   className='formInputupdatebutton '>
       <button className='saveData'    type="submit" > Updat </button>
     </div> 
    </Masonry>
    </form>
    </DialogContent>
    </Dialog>

    {/* dialog add to course  */}

   
    <Dialog open={openDiolgEdit} onClose={handleCloseDiolgAdd} className='dialog-data'>
     <div  className='dialog-title' >
        <DialogTitle>Add Course Student  </DialogTitle>
        <CloseIcon  className='closeicon' onClick={handleCloseDiolgAdd}/> 
        </div>
        <DialogContent  >
        <form onSubmit={(e) => handelAddToCourse(e ,dataSingleStudent.id)} className='update-student'>  
        <Masonry columns={1} spacing={2}>
        <div  className='formInputupdate' >
        <div  className='formInputupdate' >
               <label htmlFor="name" className="form-label ">Status Courses </label>
                <select className="form-select" aria-label="Default select example"  value={courseName}  onChange={(e)=>setCourseName(e.target.value)}>  
                {
                    dataCourses.map((datcourse)=> <option value={datcourse.nameCourse} key={datcourse.id} >{datcourse.nameCourse}</option>)
                }
             </select>  
         </div>      
        </div>
       <div   className='formInputupdatebutton '>
       <button className='saveData'    type="submit" > Add  </button>
     </div> 
    </Masonry>
    </form>
    </DialogContent>
    </Dialog>
   </div>
  )
}

export default DataTableStudent
