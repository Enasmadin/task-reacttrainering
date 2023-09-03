import React, { useContext } from 'react';
import "./Feauture.scss";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { FunctionContext } from '../../context/functionContext';

const Feature = () => {
    const{dataCourses}=useContext(FunctionContext);
  return (
    <div className='all-courses'>
        <div  className='top'>
            <h1 className='title'> All Courses </h1>
            <MoreVertIcon fontSize='small'/>
        </div> 
        <div  className='bottom' >
             <div  className='all-card'>
             <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: 2 }} >
             {dataCourses.map((dataCourse)=> 
              <Grid item xs={12} sm={6} md={4}  >   
               <Card sx={{ maxHeight: 345 }}   >
              <CardContent >
                  <Typography gutterBottom variant="h5" component="div"   >
                  {dataCourse.nameCourse}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="div"  >
                  <p> <small > cost : </small> 400</p>
                  <p> <small>  Status : </small> cancel </p>
                 <p>  <small>   start : </small> 12/12/2023  <small> to: </small>  12/12/2023 </p>
                  </Typography>
              </CardContent>
            </Card>
            </Grid>
             )}
            </Grid>
           </div>
       </div>
  </div>
  )
}

export default Feature
