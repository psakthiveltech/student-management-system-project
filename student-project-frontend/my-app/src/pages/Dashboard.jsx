import React, { useContext, useEffect, useState } from 'react'
import StudentTable from '../components/StudentTable'
import { ThemeContexts } from '../components/ThemeProvider'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getAllStudents } from '../Service/studentApi';
import { getAllParents } from '../Service/parentsApi';
import { getAllCourse } from '../Service/courseApi';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';


const Dashboard = () => {
  const {darkOrLight,setLightOrDark} = useContext(ThemeContexts);

  const[studentsShow,setStudentsShow] =useState(null)
  const[parentsShow,setParentsShow] = useState(null)
  const [courseShow,setCourseShow] = useState(null)
  

  useEffect(()=>{
    getAllStudents()
    .then((res)=>{
      const value = res.data.length;
      
      setStudentsShow(value);
      console.log(studentsShow);
      
    })
    .catch((error)=>{
      console.log("error",error.response.data);
      
    })

    getAllParents()
    .then((res)=>{
      const value = res.data.length;
      
      setParentsShow(value);
      console.log(parentsShow);
      
    })
    .catch((error)=>{
      console.log("error",error.response.data);
      
    })

    getAllCourse()
    .then((res)=>{
      const value = res.data.length;
      
      setCourseShow(value);
      console.log(courseShow);
      
    })
    .catch((error)=>{
      console.log("error",error.response.data);
      
    })

  },[])

  const navigate = useNavigate();

  const navigateToParents = useNavigate(null);

  const navigateToCourse = useNavigate(null);

  const handleNavigate=()=>{
    navigate("/student")
  }

  const handleNavigateToParents=()=>{
    navigateToParents("/parents")
  }

  const handleNavigateToCourse=()=>{
    navigateToParents("/course")
  }
  return (
    <Box >
      <Box sx={{py:2,px:4,display:'flex',justifyContent:'end'}}>
        <Button onClick={()=>handleNavigate()} sx={{backgroundColor:'lightblue',color:darkOrLight?'white':'grey'}}>
          <PersonAddIcon sx={{color:darkOrLight?'white':'grey'}}/>  Students
        </Button>
      </Box>
      <Box sx={{width:'100%' , px:4,py:4,display:'flex',justifyContent:'center'}}>

      <Grid  container spacing={2} sx={{width:'100%',py:2,px:4}}>
        
        <Grid size={{md:4,sm:6,xs:12}}  >
        <Paper onClick={handleNavigate} elevation={4} sx={{width:'100%',py:2,px:4, borderTop:'4px solid lightblue',transition:'transform 0.5s ease', ":hover":{transform:'scale(1.01)',boxShadow:8,cursor:'pointer'}}}>
          <Typography variant='h5' sx={{textAlign:'center'}}>
          Students Total Count
        </Typography>
        <Typography sx={{textAlign:'center',fontSize:44,color:'primary.main'}}>
          <Box>
            <SchoolIcon/>
          </Box>
          
          {
            studentsShow
          }</Typography>
          
        </Paper>
        </Grid>
        
        <Grid size={{md:4,sm:6,xs:12}} >
        <Paper onClick={handleNavigateToParents} elevation={4} sx={{width:'100%',py:2,px:4, borderTop:'4px solid lightblue',transition:'transform 0.5s ease', ":hover":{transform:'scale(1.01)',boxShadow:8,cursor:'pointer'}}}>
          <Typography variant='h5' sx={{textAlign:'center'}}>
          Parent's Total Count
        </Typography>
        <Typography sx={{textAlign:'center',fontSize:44,color:'primary.main'}}>
          <Box>
            <FamilyRestroomIcon/>
          </Box>
          
          {
            parentsShow
          }</Typography>
          
        </Paper>
        </Grid>

        <Grid size={{md:4,sm:6,xs:12}} >
        <Paper onClick={handleNavigateToCourse} elevation={4} sx={{width:'100%',py:2,px:4, borderTop:'4px solid lightblue',transition:'transform 0.5s ease', ":hover":{transform:'scale(1.01)',boxShadow:8,cursor:'pointer'}}}>
          <Typography variant='h5' sx={{textAlign:'center'}}>
          Courses Total Count
        </Typography>
        <Typography sx={{textAlign:'center',fontSize:44,color:'primary.main'}}>
          
          <Box>
            <MenuBookIcon/>
          </Box>
          {
            courseShow
          }</Typography>
          
        </Paper>
        </Grid>
      </Grid>
      </Box>
      <StudentTable/>
      
    </Box>
  )
}

export default Dashboard