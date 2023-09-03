import moment from "moment";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
export const FunctionContext= createContext();


export const FunctionContextProvider=({children})=>{
    const [dataAdminEmail, setdataAdminEmail] = useState("");
    const [dataAdminPassword, setdataAdminPassword] = useState("");
    const [dataAdminUser, setdataAdminUser] = useState("");
    const [dataStudent,setDataStudent]=useState([{}]);
    const [dataCourses,setDataCourse]=useState([{}]);
  useEffect(() => {
  fetchDataLogin();
  fetchDataStudent();
  fetchDataCourses();
 
  }, []);

const fetchDataLogin = async () => {
    try {
      const response = await fetch('http://localhost:500/admin');
      const jsonData = await response.json();
      setdataAdminEmail(jsonData[0].email);
      setdataAdminPassword(jsonData[0].password);
      setdataAdminUser(jsonData[0].username);
     
       console.log(jsonData[0].username ,"jyu")
    } catch (error) {
        return  ('Error fetching data:', error) ;
    }
  }
 //  all data student 
const fetchDataStudent = async () => {
  try {
    const response = await fetch('http://localhost:500/students');
    const jsonData = await response.json();
    setDataStudent(jsonData);
  } catch (error) {
      return  ('Error fetching data:', error) ;
  }
}

// all data courses 
const fetchDataCourses = async () => {
  try {
    const response = await fetch('http://localhost:500/courses');
    const jsonData = await response.json();
    const dataAfterEdit = jsonData.map(obj => ({nameCourse: obj.nameCourse, cost: obj.cost,startDate: moment(obj.startDate).utc().format('MM/DD/YYYY'),endDate: moment(obj.endDate).utc().format('MM/DD/YYYY'),stataus:obj.stataus,id:obj.id}))
    setDataCourse(dataAfterEdit);
  } catch (error) {
      return  ('Error fetching data:', error) ;
  }
}   
    return(
        <FunctionContext.Provider value= {{ emailAdmin:dataAdminEmail ,PasswordAdmin:dataAdminPassword ,dataAdminUser,useradmin:dataAdminUser ,dataStudent:dataStudent ,dataCourses:dataCourses }}>
            {children}
        </FunctionContext.Provider>
    )
}
