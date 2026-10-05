import React, { useContext,  useEffect,  useRef,  useState } from 'react'
import { ThemeContexts } from '../components/ThemeProvider'
import {createStudent, updateStudent ,getStudentById} from '../Service/studentApi'
import {Alert, Box, Button, Paper, Snackbar, TextField, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StudentsPage = () => {
  
  const navigate = useNavigate(null);

  const [newStudent,setNewStudent] = useState({
    studentName:'',
    courseId:'',
    dateOfBirth:'',
    gender:'',
    parentId:'',
    phoneNumber:'',
    bloodGroup:'',
    email:'',
    studentRecord:''
  });

  const searchByIdref = useRef(null);

  const studentNameRef =useRef(null);

  const [errors,setErrors] = useState({});

  const [openSuccess,setOpenSuccess] = useState(false);

  const [searchId, setSearchId] = useState('');

  const [editStudent,setEditStudent] = useState(null);

  const[editErrors,setEditError] = useState({});
  
  const handleNavigation=()=>{
    navigate("/parents")
  }

  const scrolltoSearchById=()=>{
    searchByIdref.current?.scrollIntoView({
      behavior:'smooth'
    })
  }

  useEffect(()=>{
    studentNameRef.current.focus();
  },[])
  const handleSearch =(e)=>{

    e.preventDefault();
    if(!searchId) return;

    getStudentById(searchId)
    .then((response)=>{
      setEditStudent(response.data);
      setEditError({});
    })
    .catch((error)=>{
      alert("Student Id Not Found!");
      setEditStudent(null);
    })
  }

  const handleUpdateStudent=()=>{
    const fixedData={
      ...editStudent,
      courseId:Number(editStudent.courseId)||0,
      parentId:Number(editStudent.parentId)||0
    };

    updateStudent(editStudent.id,fixedData)
    .then((response)=>{
      setEditStudent(null);
      setSearchId('');
      setEditError({})
      showMessage("Student updated successfully")
      
    }).catch((error)=>{
      showMessage("Failed to update student","error")
      setEditError(error.response?.data||{});
    });
  };
  

  const handleCreateStudents=(e)=>{
    e.preventDefault();
    createStudent(newStudent)
    .then((response)=>{
    console.log(response.data);

    setNewStudent({
    studentName:'',
    courseId:'',
    dateOfBirth:'',
    gender:'',
    parentId:'',
    phoneNumber:'',
    bloodGroup:'',
    email:'',
    studentRecord:''
  });
  showMessage("Student Created Successfully ","success")
  setErrors({});
  setOpenSuccess(true);
  
  }
    )
    .catch((error)=>{
      console.log(error.response?.data);
      showMessage("Failed to create student","error")
      setErrors(error.response?.data||{})
    })
    
    
  }
  
  const{darkOrLight,showMessage} = useContext(ThemeContexts);
  return (
    
      <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',mt:2,mb:3}}>

        <Box sx={{display:'flex',justifyContent:'end',width:'100%', mb:3}}>
          <Button onClick={scrolltoSearchById} sx={{backgroundColor:'lightblue', color:darkOrLight?'white':'grey'}}>
            SearchBy ID 

          </Button>
        </Box>
         <Box sx={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',py:3 }}>
         <Alert variant="outlined" severity="info">
          Please create parent's record first. Once you receive the Parent ID, use it to create the student record.
          </Alert>

          <Button onClick={handleNavigation}  sx={{ backgroundColor:'lightblue',color:darkOrLight?'white':'grey',my:3}}>
           <ChevronRightIcon/> Parent's Form
          </Button>
        </Box>
      <Paper component='form' onSubmit={handleCreateStudents}  elevation={4} sx={{width:'70%',px:2,py:3}} >

        <Box sx={{display:'flex',justifyContent:'center'}}>
        <Typography variant='h4' sx={{color:'grey'}}>
        Student Form
        </Typography>
        </Box>

        <Box sx={{display:'flex',flexDirection:'column',gap:2,mt:2}}>
          
          <TextField 

          required
          inputRef={studentNameRef}
          value={newStudent.studentName}
          onChange={(e)=>setNewStudent({
            ...newStudent,
            studentName:e.target.value
          })}
          helperText={errors.studentName}
          error={!!errors.studentName}
          label="Student Name"
          />

          <TextField
          required
          label='Date Of Birth'
          value={newStudent.dateOfBirth}
          helperText={errors.dateOfBirth}
          onChange={(e)=>setNewStudent({
            ...newStudent,
            dateOfBirth:e.target.value
          })
        }
        error={!!errors.dateOfBirth}
          />

        <Box sx={{display:'flex',gap:2}}>
          <TextField
          required
          label='Parents ID'
          value={newStudent.parentId}
          helperText={errors.parentId}
          onChange={(e)=>setNewStudent({
            ...newStudent,
            parentId:Number(e.target.value)
          })}

          error={!!errors.parentId}
          />

          <TextField
          required
          label='Course Id'
          value={newStudent.courseId}
          helperText={errors.courseId}
          onChange={(e)=>setNewStudent({
            ...newStudent,
            courseId:Number(e.target.value)
          })}
          error={!!errors.courseId}
          />

        </Box>

        <Box sx={{display:'flex',gap:2}}>

          <TextField
          required
          value={newStudent.bloodGroup}
          helperText={errors.bloodGroup}
          label='Blood Group'
          onChange={(e)=>setNewStudent({
            ...newStudent,
            bloodGroup:e.target.value
          })}

          error={!!errors.bloodGroup}
          />

          <TextField
          required
          label='Gender'
          helperText={errors.gender}
          value={newStudent.gender}
          onChange={(e)=>setNewStudent({
            ...newStudent,
            gender:e.target.value
          })}

          error={!!errors.gender}
          />


        </Box>

        <TextField
        required
        label='Phone Number'
        helperText={errors.phoneNumber}
        value={newStudent.phoneNumber}
        onChange={(e)=>setNewStudent({
          ...newStudent,
          phoneNumber:e.target.value
        })}
        error={!!errors.phoneNumber}/>

        <TextField
        required
        label='Email'
        helperText={errors.email}
        value={newStudent.email}
        onChange={(e)=>setNewStudent({
          ...newStudent,
          email:e.target.value
        })}

        error={!!errors.email}
        />

        <TextField
        required
        helperText={errors.studentRecord}
        label='Student Record'
        value={newStudent.studentRecord}
        onChange={(e)=>setNewStudent({
          ...newStudent,
          studentRecord:e.target.value
        })}
        error={!!errors.studentRecord}
        />
        
        </Box>
        <Box sx={{display:'flex',justifyContent:'center',py:2}}>
        <Button
        type='submit'

        sx={{backgroundColor:'lightblue',color:darkOrLight?'white':'gray'}}
        >
          Save
        </Button>
        </Box>

        {
          Object.keys(errors).length>0&&(
            <Alert severity='error'>
              <Typography sx={{mt:2,textAlign:'left'}}>
                follow to know which cause error
              </Typography>
              {
                Object.values(errors).map((errorMessage,index)=>(
                  <div key={index}>.{errorMessage}</div>
                ))
              }
              
            </Alert>
          )
        }
        
      </Paper>
      <Paper elevation={4} sx={{width:'70%',px:2,py:3,mt:4,borderTop:'5px solid lightblue'}}>


        <Typography variant='h4' sx={{color:'grey' , textAlign:'center',mb:3}}>  
        Search & Update Student
        </Typography>

        <Box component='form' onSubmit={handleSearch} sx={{display:'flex',gap:2,justifyContent:'center' ,mb:3}} ref={searchByIdref}>

          <TextField
          required
          
          value={searchId}
          onChange={(e)=>setSearchId(e.target.value)}
          size='small'
          />

          <Button variant='contained' type='submit'  sx={{color:darkOrLight?'white':'grey',backgroundColor:'lightblue'}}>
          Search
          </Button>

        </Box>

        {
          editStudent&&(
            <Box sx={{display:'flex',flexDirection:'column' ,gap:2,mt:3,pt:3,borderTop:'1px solid lightgray'}}>
                <TextField
                label="Student Name"
                value={editStudent.studentName}
                onChange={(e)=> setEditStudent({
                  ...editStudent,
                  studentName:e.target.value
                })}
                error={!!editErrors.studentName}
                helperText={editErrors.studentName}
                />

                <TextField
                label="Parents Id"
                value={editStudent.parentId}
                onChange={(e)=> setEditStudent({
                  ...editStudent,
                  parentId:e.target.value
                })}
                error={!!editErrors.parentId}
                helperText={editErrors.parentId}
                />

                <TextField
                label="Date Of Birth"
                value={editStudent.dateOfBirth}
                onChange={(e)=> setEditStudent({
                  ...editStudent,
                  dateOfBirth:e.target.value
                })}
                error={!!editErrors.dateOfBirth}
                helperText={editErrors.dateOfBirth}
                />


                <TextField
                label="Blood Group"
                value={editStudent.bloodGroup}
                onChange={(e)=> setEditStudent({
                  ...editStudent,
                  bloodGroup:e.target.value
                })}
                error={!!editErrors.bloodGroup}
                helperText={editErrors.bloodGroup}
                />

                <TextField
                label="Phone Number"
                value={editStudent.phoneNumber}
                onChange={(e)=> setEditStudent({
                  ...editStudent,
                  phoneNumber:e.target.value
                })}
                error={!!editErrors.phoneNumber}
                helperText={editErrors.phoneNumber}
                />

                <TextField
                label="Email"
                value={editStudent.email}
                onChange={(e)=> setEditStudent({
                  ...editStudent,
                  email:e.target.value
                })}
                error={!!editErrors.email}
                helperText={editErrors.email}
                />


                
                <TextField
                label="Course Id"
                value={editStudent.courseId}
                onChange={(e)=> setEditStudent({
                  ...editStudent,
                  courseId:e.target.value
                })}
                error={!!editErrors.courseId}
                helperText={editErrors.courseId}
                />

                <TextField
                label="Gender"
                value={editStudent.gender}
                onChange={(e)=> setEditStudent({
                  ...editStudent,
                  gender:e.target.value
                })}
                error={!!editErrors.gender}
                helperText={editErrors.gender}
                />

                <TextField
                label="Student Record"
                value={editStudent.studentRecord}
                onChange={(e)=> setEditStudent({
                  ...editStudent,
                  studentRecord:e.target.value
                })}
                error={!!editErrors.studentRecord}
                helperText={editErrors.studentRecord}
                />

                <Box sx={{display:'flex',justifyContent:'center',py:2,gap:2}}>
                  <Button onClick={()=>setEditStudent(null)} color='error' variant='outlined'>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateStudent} variant='contained' sx={{backgroundColor:'lightblue'}}>
                    Update Student
                  </Button>
                </Box>


            </Box>
          )
        }
      </Paper>


      </Box>
      
  )
}

export default StudentsPage