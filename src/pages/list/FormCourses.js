import React, { useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import  "./formcourses.scss";
import { useNavigate } from 'react-router-dom';

const FormCourses = () => {

const [startDate,setstartDate]= useState(null);
const [endDate,setEndDate]=useState(null); 
const [nameCourse,setnameCourse]=useState(""); 
const [cost,setCost]= useState(1);
const[state,setState]=useState("");
const navigate = useNavigate();
const [errorServer,setErrorServer] = useState("");
const [errorMessage,setErrorMessage] = useState("");



 const handeDataCourses = (e)=>{

  e.preventDefault()
     const newDataCourses = {
        nameCourse: nameCourse,
        cost: cost,
        startDate:startDate,
        endDate:endDate,
        stataus:state, 
     };

 if((nameCourse  && startDate && endDate  && state && cost  !== "")  && (nameCourse  && startDate && endDate && state  && cost !== null)  ){
     // Simulate posting data to JSON file (client-side approach)
    fetch('http://localhost:500/courses', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDataCourses)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data posted:', data);
      navigate("/courses"); 
    })
    .catch((error) => {
      console.error('Error posting data:', error);
      setErrorServer("Please Check the server connect ")   
    });
     }
     else{
        setErrorMessage("enter correct data")
     }
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
  return (
    <div>
         <div className='bottom'>
         <div className='errorr'>
           { errorServer && <p> {errorServer}</p>}
           { errorMessage && <p> {errorMessage}</p>}
           </div>
            <div  className='right'>
               <form  onSubmit={handeDataCourses}>
                <div  className='formInput-parent'>
                <div  className='formInput' >
                  <label htmlFor="name" className="form-label ">Course Name</label>
                  <input type="text" className="form-control  input-course" id="name" placeholder="Course Name"  value={nameCourse} onChange={(e)=> setnameCourse(e.target.value)}/>
                 </div>
               <div  className='formInput' > 
               <label htmlFor="name" className="form-label">Status Courses </label>
               <select className="form-select" aria-label="Default select example"  onChange={(e)=>setState(e.target.value)} > 
                {
                    status.map((staue)=> <option value={staue.label} key={staue.value} >{staue.label}</option>)
                }  
               </select>
             </div>
         </div>  
       <div  className='formInput-parent'>
       <div className='formInput' >
     <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DemoContainer
        components={['DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}
         >
        <DemoItem label="Start Date">
        <DatePicker value={startDate} onChange={(newValue)=>setstartDate(newValue)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider> 
      </div> 
      <div className='formInput' >
     <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DemoContainer
        components={['DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}
         >
        <DemoItem label="End Date">
        <DatePicker value={endDate} onChange={(newValue)=>setEndDate(newValue)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider> 
      </div> 
         </div>
     
      <div className='formInput-parent'> 
      <div  className='formInput'>
       <label htmlFor="cost" className="form-label ">Cost Courses (EGP) </label>
       <input type="number" className="form-control input-course" id="cost" placeholder="cost" value={cost} onChange={(e)=>setCost(e.target.value)}/>
      </div>      
      <div   className='container-button'>
     <button className='saveData'   type="submit" > send </button>
     </div>
     </div>
     </form> 
     </div>
    </div> 
    </div>
  )
}

export default FormCourses
