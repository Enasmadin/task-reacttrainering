import React from 'react';
import "./home.scss"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Wediget from '../../components/weidgets/Wediget';
import Feature from '../../components/feauture/Feature';



const Home = () => {
  return (
    <div className='home'>
       <Sidebar/>
       <div className='homecontainer'>
         <Navbar/>
         <div className='wedigets'>
            <Wediget type="students" link="/students"/>
            <Wediget type="earning"  link="/courses"/>
        </div> 
        <div  className='charts'>
              <Feature/> 
        </div>
       </div>
    </div>
  )
}

export default Home
