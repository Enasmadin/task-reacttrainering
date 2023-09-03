import React, { useEffect, useState } from 'react';
import {userColumns} from "./database"
import moment from 'moment/moment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Masonry from '@mui/lab/Masonry';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import {  DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';

const DataTableCourses = () => {
    const [data,setData]=useState([{}]);
    const [open, setOpen] =useState(false);
    const[dataCourseSingle,setDataSingleCourse]= useState({});
    const[state,setState]=useState("");
    const[cost,setCost]=useState(Number);
    const [startDate,setstartDate]= useState(null);
    const [endDate,setEndDate]=useState(null);

function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
 }  
 const status = [
    {
      value: '1',
      label: 'Started',
    },
    {
      value: '2',
      label: 'Not-Started',
    },
    {
      value: '3',
      label: 'Canceled',
    },
  ];
  
  useEffect(() => {
      fetchDataCourses();
    },[]);
  
const fetchDataCourses = async () => {
    try {
      const response = await fetch('http://localhost:500/courses');
      const jsonData = await response.json();
      const dataAfterEdit = jsonData.map(obj => ({nameCourse: obj.nameCourse, cost: obj.cost,startDate: moment(obj.startDate).utc().format('MM/DD/YYYY'),endDate: moment(obj.endDate).utc().format('MM/DD/YYYY'),stataus:obj.stataus,id:obj.id}))
      setData(dataAfterEdit);
    } catch (error) {
        return  ('Error fetching data:', error) ;
    }
  }
  const fetchDataCoursesById = async (id) => {
    try {
      const response = await fetch(`http://localhost:500/courses/${id}`);
      const jsonData = await response.json();
      const dataAfterEditById ={nameCourse: jsonData.nameCourse, cost: jsonData.cost,startDate: moment(jsonData.startDate).utc().format('MM/DD/YYYY'),endDate: moment(jsonData.endDate).utc().format('MM/DD/YYYY'),stataus:jsonData.stataus,id:jsonData.id}
      setDataSingleCourse(jsonData);
      setCost(jsonData.cost);
      setState(jsonData.stataus);
      setstartDate(jsonData.startDate);
      setEndDate(jsonData.endDate);
      console.log(dataAfterEditById ,"dataEditgg")
    } catch (error) {
        return  ('Error fetching data By Id :', error) ;
    }
  }

   const handelUpdate = (id)=>{
    fetchDataCoursesById(id);
    handleClickOpen();
    console.log(state ,"status");
    console.log(cost ,"cost");
    

  }
  const handelEdit =async (e,id)=>{
    console.log(e ,"e");
    console.log(id ,"id");
    e.preventDefault();
    const updateCourse = { ...dataCourseSingle, cost:cost, startDate: startDate , endDate:endDate , stataus:state }
    console.log(updateCourse ,"updateCourse");
    const res = await fetch(`http://localhost:500/courses/${id}`, {
      method: "PUT",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(updateCourse)
  })

  const data = await res.json();
  setDataSingleCourse( dataCourseSingle.id === id ? { dataCourseSingle, cost: data.cost, startDate: data.startDate ,endDate:data.endDate,stataus:data.stataus } && fetchDataCourses() && setOpen(false) : dataCourseSingle && setOpen(false))
  }
  
  const handelDelte= async(id)=>{
    console.log(id,"id")
   fetch(`http://localhost:500/courses/${id}`, {
        method: "DELETE"
    })
        .then(() => {
          fetchDataCourses()
        });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const actionColumn = [ {
        field: 'actionButton',
        headerName: 'Actions',
        width: 200,
       renderCell:(parms)=>{
            return(
                    <div className="cellActions">
                      <div  className='viewButton' onClick={()=>{handelUpdate(parms.row.id)}}> Edit </div>
                      <div  className='delteButton' onClick={()=>{handelDelte(parms.row.id)}}> Delete </div>
                    </div> 
                  )
         }
 },]  

  return (
    <div className='datatablecourses'>
  <DataGrid
        className='datagrid'
        getRowId={(row) =>  generateRandom()}
        rows={data}
        columns={userColumns.concat(actionColumn)}
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
        <DialogTitle>Edit Courses </DialogTitle>
        <CloseIcon  className='closeicon' onClick={handleClose}/> 
        </div>
        <DialogContent  >
        <form onSubmit={(e) => handelEdit(e,dataCourseSingle.id )}>  
        <Masonry columns={1} spacing={2}>
        <div  className='formInputupdate' >
                  <label htmlFor="cost" className="form-label">Cost</label>
                  <input type="number" className="form-control " id="cost" placeholder="cost" value={cost} onChange={(e)=>setCost(e.target.value)} />
         </div>
         <div  className='formInputupdate' >
               <label htmlFor="name" className="form-label ">Status Courses </label>
               <select className="form-select" aria-label="Default select example"  value={state} onChange={(e)=>setState(e.target.value)}> 
                {
                    status.map((staue)=> <option value={staue.label} key={staue.value} >{staue.label}</option>)
                }
                 </select> 
         </div>         
       <div  className='formInputupdatedatabaker' > 
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
        components={['DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}
         >
        <DemoItem label="Start Date">
          <DatePicker   margin="normal"
          value= {dayjs(startDate)}
          onChange={(newValue)=>setstartDate(newValue)}  />
        </DemoItem>
        <DemoItem label="End Date">
        <DatePicker 
         value= {dayjs(endDate)}
         onChange={(newValue)=>setEndDate(newValue)}/>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider> 
    </div>
       <div   className='formInputupdatebutton '>
       <button className='saveData'    type="submit" > Updat </button>
     </div> 
    </Masonry>
    </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DataTableCourses
