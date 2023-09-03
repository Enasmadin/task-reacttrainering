import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const FormStudents = () => {
    const[nameStudent,setnameStudent]=useState("");
    const[emailStudent,setEmailStudent]=useState("");
    const[address,setAddress]=useState("");
    const[telphone ,setTelphone]=useState("");
    const navigate = useNavigate();
    const [errorServer,setErrorServer] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const handeDataStudents = (e)=>{
      e.preventDefault();
      const newDataCourses = {
        name: nameStudent,
        email: emailStudent,
        telphone:address,
        address:telphone,
     };

 if((nameStudent  && emailStudent && address  && telphone   !== "")  && (nameStudent  && emailStudent && address  && telphone !== null)  ){
     // Simulate posting data to JSON file (client-side approach)
    fetch('http://localhost:500/students', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDataCourses)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data posted:', data);
      navigate("/students"); 
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
    //post data students 

  return (
    <div className='formstudents'>
              <div className='bottom'>
         <div className='errorr'>
           { errorServer && <p> {errorServer}</p>}
           { errorMessage && <p> {errorMessage}</p>}
           </div>
            <div  className='right'>
               <form  onSubmit={handeDataStudents}>
                <div  className='formInput-parent'>
                <div  className='formInput' >
                  <label htmlFor="name" className="form-label "> Name</label>
                  <input type="text" className="form-control " id="name" placeholder="Student Name"  value={nameStudent} onChange={(e)=> setnameStudent(e.target.value)}/>
                 </div>
                <div  className='formInput' >
                  <label htmlFor="email" className="form-label "> Email </label>
                  <input type="email" className="form-control " id="email" placeholder="Student Email"  value={emailStudent} onChange={(e)=> setEmailStudent(e.target.value)}/>
                 </div>
                </div>
                <div  className='formInput-parent'>
                <div  className='formInput' >
                  <label htmlFor="telphone" className="form-label "> Telephone </label>
                  <input type="tel" className="form-control " id="telphone" placeholder="Student Telphone"  value={telphone} onChange={(e)=> setTelphone(e.target.value)}  />
                 </div>
                <div  className='formInput' >
                  <label htmlFor="address" className="form-label "> Address </label>
                  <input type="text" className="form-control " id="address" placeholder="Student Address"  value={ address}  onChange={(e)=> setAddress(e.target.value)}/>
                 </div>
                </div>  
                <div className='formInput-parent'> 
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

export default FormStudents
