import React, { useContext, useEffect, useRef, useState } from 'react'
import { createSubject, deleteSubjectById, getAllSubject, getSubjectByCourse, getSubjectByCourseIdAndSemester, updateSubjectById } from '../Service/subject';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { getAllCourse } from '../Service/courseApi';
import { ThemeContexts } from '../components/ThemeProvider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SubjectPage = () => {


  const inputref = useRef(null);


  const{showMessage} = useContext(ThemeContexts);

  const [allSubject,setALlSubject] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [semester, setSemester] = useState('ALL');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched,setHasSearched] = useState(false);
  const [saveSubject,setSaveSubject] = useState({
    subjectName:'',
    subjectCode:'',
    semester:'',
    courseId:'',
    date:''
  })

  const [editOpen,setEditOpen] = useState(false);
  const [deleteOpen,setDeleteOpen] =useState(false);

  const [editingSubject,setEditingSubject] = useState(null);
  const [deletingSubject,setDeletingSubject] = useState(null);
  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState({
  subjectName: '',
  subjectCode: '',
  semester: 1,
  courseId: '',
  date: ''
});
 

  const handleOpenEdit=(subject)=>{
    setEditingSubject(subject);

    setEditForm({
      subjectName: subject.subjectName,
    subjectCode: subject.subjectCode,
    semester: subject.semester,
    courseId: subject.courseId,
    date: subject.date
    });

    setEditOpen(true);
  }

  const handleOpenDelete = (subject) =>{
    setDeletingSubject(subject);
    setDeleteOpen(true);
  }

  const handleEditChange=(event)=>{
    const {name,value} = event.target;

    setEditForm((previous)=>({
      ...previous,
      [name]:value
    }))
  }




  useEffect(()=>{
inputref.current.focus();
  },[])

  const handleSaveSubject=(e)=>{
    e.preventDefault();
    createSubject(saveSubject)
    .then((response)=>{
      showMessage("Subject Created Successfully","success");
      
    }).catch((error)=>{
      showMessage("Failed To Create Subject","error");
    })
  }

  useEffect(()=>{
    handleGetAllSubject();
  },[])

  const handleGetAllSubject=()=>{
    getAllSubject()
    .then((response)=>{
      const data = response.data;
      setALlSubject(data);
    })
    .catch((error)=>{
      alert("error" ,error.response.data);
    })
  }

  const handleClearAll=()=>{
    setSaveSubject({
    subjectName:'',
    subjectCode:'',
    semester:'',
    courseId:'',
    date:''
    })
  }

  useEffect(()=>{
    getAllCourse()
    .then((response)=>setCourses(response.data))
    .catch((error)=>setError("Failed To Load Courses"))
  },[]);


  const handleSeach = async()=>{
     if (!courseId) {
    setError('Please select a course.');
    return;
  }

    setLoading(true);
    setError('');
    setSubjects('');
    setHasSearched(true);

    try{
      const response = semester==='ALL' ? await getSubjectByCourse(courseId): await getSubjectByCourseIdAndSemester(courseId,semester);
      setSubjects(response.data);
    }
    catch(error){
      setError('Failed To Load Subjects.Please Try Again.');
      console.log(error);
      
    }
    finally{
      setLoading(false);
    }
  };


  const handlesaveEdit=async ()=>{
    if(!editingSubject) return ;

    setSaving(true);

    try{
      await updateSubjectById(editingSubject.id,{
        ...editForm,
        semester:Number(editForm.semester),
        courseId:Number(editForm.courseId)
      });

      setEditOpen(false);
      showMessage("Update Subject Successfully","success")

      await handleSeach();
      
    }catch(error){
      console.error(error);
      showMessage("Update Failed","error");
    }
    finally{
      setSaving(false);
    }
  }
    
  const handleConfirmDelete = async () =>{
    if(!deletingSubject) return ;

    try{
      await deleteSubjectById(deletingSubject.id);


      setDeleteOpen(false);
      showMessage("Subject Deletion Successfull","success")

      await handleSeach();
    }

    catch(error){
      console.log(error);

      showMessage("Deletion Failed","error")
      
    }
  }



  return (
    
    <Box sx={{
    width: '100%',
    maxWidth: 1100,
    mx: 'auto',
    mt: 6,
    px: 2,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    alignItems: 'stretch'
  }}>

    <Box >

      <Paper sx={{ py:3,display:'flex',flexDirection:'column',px:3}} component="form" onSubmit={handleSaveSubject}>
        <Typography sx={{textAlign:'center'}} variant='h4'>
          Create Subject
        </Typography>
        <TextField
        inputRef={inputref}
        sx={{my:3}}
        required
        label='Subject Name'
        value={saveSubject.subjectName}
        onChange={(e)=>setSaveSubject({
          ...saveSubject,
          subjectName:e.target.value
        })}/>

        <TextField
        sx={{my:3}}
        required
        label='Subject Code'
        value={saveSubject.subjectCode}
        onChange={(e)=>setSaveSubject({
          ...saveSubject,
          subjectCode:e.target.value
        })}/>


        <Box sx={{display:'flex' ,gap:2}}>
        <TextField
        sx={{my:3}}
        required
        label='Semester'
        value={saveSubject.semester}
        onChange={(e)=>setSaveSubject({
          ...saveSubject,
          semester:e.target.value
        })}/>

        <TextField
        sx={{my:3}}
        required
        label='Course Id'
        value={saveSubject.courseId}
        onChange={(e)=>setSaveSubject({
          ...saveSubject,
          courseId:Number(e.target.value)
        })}/>

        </Box>

        <TextField
        sx={{my:3}}
        required
        label='yyyy-MM-dd'
        value={saveSubject.date}
        onChange={(e)=>setSaveSubject({
          ...saveSubject,
          date:e.target.value
        })}/>

        <Box sx={{display:'flex',flexDirection:'row',width:"100%",justifyContent:'space-evenly',alignItems:'center'}}>
          <Button 
          type='button'
          sx={{backgroundColor:'lightblue'}}
          onClick={handleClearAll}>Clear</Button>

          <Button
          sx={{backgroundColor:'lightblue'}}
          type='submit'>
            Save
          </Button>
        </Box>

        
        
      </Paper>
    </Box>

    
      <Box>
        <Paper elevation={4} sx={{
      width: '100%',
      boxSizing: 'border-box',
      borderRadius: 3,
      py: 3,
      px: 3,
      borderTop: '4px solid lightblue',
      mb:3
    }}>

          <Typography  variant='h4' sx={{my:3,textAlign:'center'}}>
            Filter Subject By Course And Semester 
          </Typography>

          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel>
              Course
              </InputLabel>
                <Select 
                sx={{mb:3}}
                labelId='course-label'
                value={courseId}
                lable="Course"
                onChange={(event)=>{
                  setCourseId(event.target.value);
                  setSubjects([]);
                  setError('');
                  setHasSearched(false);
                }}
                >

                  {
                    courses.map((course)=>(
                      <MenuItem
                      key={course.courseId}
                      value={course.courseId}
                        >
                          {course.courseName}
                      </MenuItem>
                    ))
                  }

                </Select>

            </FormControl>

            <FormControl>
              <InputLabel>
              Semester
              </InputLabel>
            <Select 
            sx={{mb:3}}
            labelId='semester-label'
            value={semester}
            label="Semester"
            onChange={(event)=>{
              setSemester(event.target.value)
              setSubjects([]);
                  setHasSearched(false);


            }}>
              {
                [1,2,3,4,5,6].map((number)=>(
                  <MenuItem key={number} value={number}>
                    Semester : {number}
                  </MenuItem>
                  
                ))
              }
              <MenuItem value="ALL" > ALL Semesters</MenuItem>
            </Select>
            </FormControl>
              <Button sx={{mb:3,backgroundColor:'lightblue'}} variant='contained' onClick={handleSeach} disabled={!courseId||loading}>
                {loading?'Searching...':'Search Subjects'}

              </Button>

              

                {!loading && subjects.length === 0 && !error && (
  <Box >
    {
      hasSearched? <Typography sx={{color:'red',textAlign:'center'}}>
No subjects found for the selected course and semester.
      </Typography> :<Typography sx={{color:'grey',textAlign:'center'}}>
      Select a course and semester, then click Search Subjects.
      </Typography>
    }
  </Box>
)}
            

          </Stack>
       
        </Paper>



          {
                !loading && subjects.length >0 && (
         <Paper elevation={4} sx={{
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        borderRadius: 3,
        p: 3,
        borderBottom: '4px solid lightblue',
        mt:3,
        my:3
      }}>

                  <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ p: 2 }}>
                      Subject Records
                    </Typography>

                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Subject ID</TableCell>
          <TableCell>Subject Name</TableCell>
          <TableCell>Subject Code</TableCell>
          <TableCell>Semester</TableCell>
          <TableCell>Course</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                          {
                            subjects.map((subject)=>(
                              <TableRow key={subject.id} hover>
            <TableCell>{subject.id}</TableCell>
            <TableCell>{subject.subjectName}</TableCell>
            <TableCell>{subject.subjectCode}</TableCell>
            <TableCell>{subject.semester}</TableCell>
            <TableCell>{subject.courseName}</TableCell>
            <TableCell>{subject.date}</TableCell>
            <TableCell sx={{display:'flex',flexDirection:'row',gap:2}}>
              <Button sx={{backgroundColor:'lightblue'}}
              
              onClick={() => handleOpenEdit(subject)}>
                <EditIcon/>
                Edit
                </Button>
            <Button sx={{backgroundColor:'red',color:'white'}}
            onClick={()=>handleOpenDelete(subject)}>
              <DeleteIcon/>
              Delete
              </Button>
            </TableCell>
            
          </TableRow>
                            ))
                          }
                      </TableBody>
                    </Table>
                  </TableContainer>
                  </Paper>
                )
              

              }
          
      </Box>

      <Dialog
      open={editOpen}
      onClose={()=>{
        if(!saving) setEditOpen(false);
      }}
      fullWidth
      maxWidth='sm'
      >
        <DialogTitle>
          Edit Subject
        </DialogTitle>

        <DialogContent>


          <Stack spacing={2} sx={{mt:1}}>
          <TextField
          label='Subject Name'
          name='subjectName'
          value={editForm.subjectName}
          onChange={handleEditChange}
          fullWidth
          />

          <FormControl fullWidth>

            <InputLabel id='edit-semester-label'>Semester</InputLabel>

            <Select
            labelId='edit-semester-label'
            name='semester'
            value={editForm.semester}
            label="Semester"
            onChange={handleEditChange}
            >
              {
                [1,2,3,4,5,6].map((num)=>(
                  <MenuItem key={num} value={num}>
                  Semester : {num}
                  </MenuItem>
                ))
              }

            </Select>
          </FormControl>

          <FormControl fullWidth>

            <InputLabel>Course</InputLabel>

            <Select
            labelId='edit-course-lable'
            name='courseId'
            value={editForm.courseId}
            label="Course"
            onChange={handleEditChange}>
              {
                courses.map((course)=>(
                  <MenuItem key={course.courseId} value={course.courseId}>
                    {course.courseName}
                  </MenuItem>
                ))
              }

            </Select>

          </FormControl>



          <TextField
          label='Date'
          name='date'
          value={editForm.date}
          onChange={handleEditChange}
          fullWidth
          />

          </Stack>
        </DialogContent>

        <DialogActions sx={{p:2}}>

          <Button onClick={()=>setEditOpen(false)} disabled={saving}>
              Cancel
          </Button>

          <Button disabled={saving} onClick={handlesaveEdit}>
           { saving? 'Saving' : "Save Changes"}
          </Button>



        </DialogActions>


      </Dialog>

      <Dialog
  open={deleteOpen}
  onClose={() => setDeleteOpen(false)}
>
  <DialogTitle>Confirm Delete</DialogTitle>

  <DialogContent>
    Are you sure you want to delete{' '}
    <strong>{deletingSubject?.subjectName}</strong>?
    This action cannot be undone.
  </DialogContent>

  <DialogActions sx={{ p: 2 }}>
    <Button onClick={() => setDeleteOpen(false)}>
      Cancel
    </Button>

    <Button
      color="error"
      variant="contained"
      onClick={handleConfirmDelete}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>


    </Box>
  )
}

export default SubjectPage