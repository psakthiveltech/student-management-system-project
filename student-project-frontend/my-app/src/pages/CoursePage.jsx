import { Box, Button, duration, Paper, TextField, Typography } from '@mui/material'
import React, { useState,useContext, useRef, useEffect } from 'react'
import { createCourse, getAllCourse, getCourseById, updateCourse } from '../Service/courseApi';
import { ThemeContexts } from '../components/ThemeProvider';
import CourseTable from '../components/CourseTable';


const CoursePage = () => {

  const {darkOrLight,showMessage} =useContext(ThemeContexts);

  const courseNameRef = useRef(null);

  const [searchingId,setSearchingId] = useState(null);

  const [courseValues,setCourseValues] = useState(null);

  const searchByIdref = useRef(null);

  const handleGetAndSetVal=(e)=>{

    e.preventDefault();
    getCourseById(searchingId)
    .then((response)=>{
      console.log("success");
      setCourseValues(response.data);
      console.log(courseValues);
      setSearchingId('');

      
    })
    .catch((error)=>{
      console.log(searchingId);
      
      console.log("Error",error.response.data);
    })
  }

  const handleCancelUpdate=()=>{
    setCourseValues('');
  }

  const handleUpdateCourseById=(e)=>{
    e.preventDefault();
    updateCourse(courseValues.courseId,courseValues)
    .then((res)=>{
      showMessage("Course updated successfully","success")
      setCourseValues('');
    })
    .catch((error)=>{
      showMessage("Course updation failed","error")
    })
  }

  useEffect(()=>{
    courseNameRef.current.focus();
  },[])

  const [course,setCourse] = useState({
    courseName:'',
    fee:'',
    duration:''
  });

  const [ success,setSuccess] = useState(false);

  const [ error , setError] = useState(false);

  const handleCreateCourse=(e)=>{

    e.preventDefault();
    console.log(course);
    
    createCourse(course)
    .then((responce)=>{
      setSuccess(true);
      console.log("Successfully");
      showMessage("Course created successfully","success")
      setCourse({courseName:'',fee:'',duration:''})
      
    })
    .catch((error)=>{
      setError(true);
      console.log("Request failed",error.responce?.data);
      showMessage("Course creation failed","error")
    })
  }

  const scrolltoSearchById=()=>{
    searchByIdref.current?.scrollIntoView({
      behavior:'smooth'
    })
  }

  
  return (
      <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', mt:2,mb:2,width:'100%'}}>

      <Box sx={{display:'flex',justifyContent:'end',width:'100%', mb:3}}>
          <Button onClick={scrolltoSearchById} sx={{backgroundColor:'lightblue', color:darkOrLight?'white':'grey'}}>
            SearchBy ID 

          </Button>
        </Box>
        <Paper component='form' onSubmit={handleCreateCourse} elevation={4} sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'70%',px:3,py:3}}>

          <Box>
            <Typography variant='h4' sx={{mb:4}}>
              Course Form
            </Typography>
          </Box>
        <TextField
        required
        inputRef={courseNameRef}
        sx={{width:'65%',mb:4}}
        label='Course Name'
        value={course.courseName}
        onChange={(e)=>setCourse({
          ...course,
          courseName:e.target.value
        })}
        />

        <TextField
        required
        sx={{width:'65%',mb:4}}
        label='Course Fee'
        value={course.fee}
        onChange={(e)=>setCourse({
          ...course,
          fee:e.target.value
        })}
        />

        <TextField
        required
        sx={{width:'65%',mb:4}}
        label='Course Duration'
        value={course.duration}
        onChange={(e)=>setCourse({
          ...course,
          duration:e.target.value
        })}
        />

        <Box sx={{mt:3,display:'flex',justifyContent:'space-evenly',alignItems:'center',width:'100%',gap:3}}>

          <Button onClick={()=>setCourse({courseName:''})} sx={{backgroundColor:'lightblue',color:darkOrLight?'white':'grey'}}>
            Clear
          </Button>

          <Button type='sumbmit' sx={{backgroundColor:'lightblue',color:darkOrLight?'white':'grey'}}>
          Save
        </Button>
        </Box>

        
        </Paper>
        <CourseTable/>

        <Box sx={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' ,mt:2,mt:4}}>


        <Paper elevation={4} sx={{borderBottom:'4px solid lightblue',width:'70%',display:'flex',flexDirection:'column'}}>
        <Box sx={{textAlign:'center',mt:3,mb:3}}>
          <Typography variant='h4'>
            UpdateBy Course
          </Typography>
        </Box>
        <Box component='form'  onSubmit={handleGetAndSetVal} sx={{display:'flex',gap:3,justifyContent:'space-evenly',alignItems:'center',my:3,mx:3    }}  ref={searchByIdref}>
        
        <TextField
        required
        label='Course Name'
        value={searchingId}
        onChange={(e)=>setSearchingId(Number(e.target.value))} 
        />

        <Button type='submit' sx={{color:darkOrLight?"white":'grey',backgroundColor:'lightblue'}}>
          Search By Id
        </Button>
        </Box>

        {
          courseValues && (
            <Box component='form' aria-required onSubmit={handleUpdateCourseById} sx={{width:'90%',display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center',ml:3,mr:3}}>
              <TextField
              sx={{mb:4}}
              required
              value={courseValues.courseName}
              label='Course Name'
              onChange={(e)=>setCourseValues({
                ...courseValues,
                courseName:e.target.value
              })}
              />

              <TextField
              sx={{mb:4}}
              required
              value={courseValues.fee}
              label='Course Fee'
              onChange={(e)=>setCourseValues({
                ...courseValues,
                fee:e.target.value
              })}
              />

              <TextField
              sx={{mb:4}}
              required
              value={courseValues.duration}
              label='Course Duration'
              onChange={(e)=>setCourseValues({
                ...courseValues,
                duration:e.target.value
              })}
              />


              <Box sx={{display:'flex',width:'100%',justifyContent:'space-evenly',alignItems:'center',pb:3,pt:3}}>
                <Button onClick={handleCancelUpdate} sx={{backgroundColor:'lightblue',color:darkOrLight?'white':'grey'}}>
                Cancel
              </Button>

              <Button type='submit' sx={{backgroundColor:'lightblue',color:darkOrLight?'white':'grey'}}>
                Save
              </Button>
              </Box>
              
            </Box>
          )
        }
        </Paper>
        </Box>
      </Box>
      )
}

export default CoursePage