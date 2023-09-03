import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/home/Login";
import List from "./pages/list/List";
import New from "./pages/list/New";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./components/style/dark.scss";
import TablesCurrentStudent from './components/table/StudentCourseTables';



function App() {
  const{darkMode}=useContext(DarkModeContext);
  console.log(darkMode);
  return (
    <div className={darkMode?"app dark" :"app"}>
    <Routes>
     <Route path="/">
     <Route   path="home"   element={<Home/>}/>
     <Route   index   element={<Login/>}/>
     </Route>
     <Route path="/students">
      <Route   index element={<List title="Add New Student" link="/students/new" linkSingle="/students"/>}/>
      <Route   path="new" element={<New  title="Add New Student"/>}/>
     </Route>
     <Route path="/courses">
      <Route   index element={<List title="Add New Courses" link="/courses/new"/>}/>
      <Route   path="new" element={<New  title="Add New Courses" />}/>
      <Route  path="studentcourse" element ={<TablesCurrentStudent />}/>
     </Route> 

    </Routes>

    </div>
    
  );
}

export default App;
