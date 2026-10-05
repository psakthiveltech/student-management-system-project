import React, { Component, useContext, useEffect, useState } from 'react'
import { deleteStudentById, getAllStudents, updateStudent } from '../Service/studentApi';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { ThemeContexts } from './ThemeProvider';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const StudentTable = () => {

  const {darkOrLight,showMessage} = useContext(ThemeContexts);

  const [ students,setStudents] = useState([]);

  const [page,setPage] = useState(0);
  const [rowPerPage,setRowPerPage] = useState(10);

  const [deleteDialogOpen,setDeleteDialogOpen] = useState(false);
  const [studentToDelete,setStudentToDelete ] = useState(null);

  const [editDialogOpen,setEditDialogOpen] = useState(false);
  const [studentToEdit,SetStudentToEdit] = useState(null);

  

  const handleDeleteClick = (id) =>{
    setStudentToDelete(id);
    setDeleteDialogOpen(true);
  }

  const cancelDelete=()=>{
    setDeleteDialogOpen(false);
    setStudentToDelete(null);
  }
  const confirmDelete=()=>{

    deleteStudentById(studentToDelete)
    .then((response)=>{
      setDeleteDialogOpen(false);
      handleAllStudents();
      showMessage("Student Deleted Successfully","info")
    })
    .catch((error)=>{
      console.log("Failed to Delete Student",error);
      showMessage("Student Deletion Failed","error")
    })
  }

  useEffect(()=>{
    handleAllStudents();

  },[])

  const [formData,setFormData ] = useState({
    studentName:'',
    courseId:'',
    dateOfBirth:'',
    gender:'',
    parentId:'',
    bloodGroup:'',
    phoneNumber:'',
    email:'',
    studentRecord:''
  })

  const handleAllStudents=()=>{

    getAllStudents()
    .then((result)=>{
      const studentsData = result.data
      setStudents(studentsData);
      console.log(studentsData);
      
    }
      
    )
    .catch((error)=>{
      console.log("Error happend ",error);
      
    })
  }

  const column = [
    {id:'id',label:'Id' ,minWidth:70},
    {id:'studentName',label:'Student Name' ,minWidth:170},
    {id:'courseId',label:'Course ID' ,minWith:70 ,align:'center'},
    {id:'dateOfBirth',label:'Date OF Birth' ,minWidth:100},
    {id:'gender',label:'Gender' ,minWidth:100},
    {id:'parentId',label:'Parents Id' ,minWidth:70,align:'center'},
    {id:'bloodGroup',label:'BloodGroup' ,minWidth:70,align:'center'},
    {id:'phoneNumber',label:'Phone Number' ,minWidth:170},
    {id:'email',label:'Email' ,minWidth:170},
    {id:'studentRecord',label:'Student Record' ,minWidth:120},
    {id:'action',label:'Action',minwidth:70}
  ]
  

  const handleEditClick = (student)=>{
    SetStudentToEdit(student);
    setEditDialogOpen(true);
  } 

  useEffect(()=>{
    if(studentToEdit){
      setFormData(studentToEdit);
    }
  },[studentToEdit]);

  const handleFormChange=(e)=>{
    const{name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    });
  }

  const handleSaveEdit=(e)=>{
    e.preventDefault();
    const fixedData = {
      ...formData,
      courseId:parseInt(formData.courseId) || 0,
      parentId:parseInt(formData.parentId) ||0
    };
    updateStudent(studentToEdit.id,formData)
    .then((response)=>{
      setEditDialogOpen(false);
      showMessage("Student Updated Successfully","success")
      handleAllStudents();
    })
    .catch((error)=>{
      console.log("Failes to update student :",error);
      showMessage("Student Updation Failed","error")      
    })
  }

  const closeEditDialog=()=>{
    setEditDialogOpen(false);
    SetStudentToEdit(null);
  }

    const handlePage=(event,newPage)=>{
      setPage(newPage);

    }

    const handleChangeRowPerPage=(event)=>{
      setRowPerPage(+event.target.value);
      setPage(0);
    }
  return (
    <>
      <Box sx={{px:4}}>
        <Paper sx={{width:'100%',overflow:'hidden',boxShadow:3}}>

          <TableContainer sx={{maxHeight:440}}>

            <Table stickyHeader aria-label="sticky table">

              <TableHead sx={{backgroundColor:'lightblue'}}>

              <TableRow sx={{backgroundColor:'lightblue'}}>

                {
                  column.map((value)=>(
                    <TableCell
                    key={value.id}
                    align={value.align}
                    sx={{minWidth:value.minWidth,backgroundColor:  'lightblue',color: 'black' }}


                    >
                      {
                        value.label
                      }
                  
                </TableCell>
                  ))
                }
              </TableRow>
              
              </TableHead>

              <TableBody>


                {
                  students.slice(page*rowPerPage,page*rowPerPage+rowPerPage)
                  .map((student)=>{
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={student.id}>

                        {
                          column.map((sides)=>{
                            return (
                              <TableCell key={sides.id} align={sides.align}>
                                {
                                  sides.id === 'action' ? 
                                  (
                                  <Box sx={{display:'flex',justifyContent:'center' ,gap:1}}>
                                    <Button
                                    sx={{backgroundColor:'lightblue',color:darkOrLight?'white':'grey'}}
                                    size='small'
                                    onClick={()=>handleEditClick(student)}
                                    >
                                      Edit 
                                      <ModeEditIcon/>


                                  </Button>

                                  <Button
                                  variant='outlined'
                                  color='error'
                                  size='small'
                                  onClick={()=>handleDeleteClick(student.id)}>
                                    Delete
                                    <DeleteIcon sx={{color:'red'}}/>
                                  </Button>
                                  </Box>
                                  
                                  ):

                                 (  student[sides.id])

                                }
                                
                              </TableCell>
                            )
                          })
                        }

                      </TableRow>
                    )
                  })
                }
              </TableBody>

            </Table>

          </TableContainer>
          <TablePagination
          
          rowsPerPageOptions={[10,20,100]
          
          }
          
          component="div"
          count={students.length}
          rowsPerPage={rowPerPage}
          page={page}
          onPageChange={handlePage}
          onRowsPerPageChange={handleChangeRowPerPage}
          />


        </Paper>

        <Dialog open={deleteDialogOpen} onClose={cancelDelete} >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{color:'black'}}>
              Are you sure you want to delete student Id {studentToDelete} ? This will delete permenently
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color='primary'>
              Cancel
            </Button>
            <Button onClick={confirmDelete} color='error' varient="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={editDialogOpen} onClose={closeEditDialog} fullWidth maxWidth='sm'>
          <Box component='form' onSubmit={handleSaveEdit}>
          <DialogTitle >
            Edit Student
          </DialogTitle>
          <DialogContent>
          <DialogContentText sx={{mb:2}}>
            Update Information for: {studentToEdit ? studentToEdit.studentName:''}
          </DialogContentText>
          <Box component="form" sx={{display:'flex',flexDirection:'column',gap:2,mt:1}}>

            <TextField
            label="Student Name "
            required
            name="studentName"
            value={formData.studentName || ''}
            onChange={handleFormChange}
            fullWidth/>

            <Box sx={{ display: 'flex', gap: 2 }}>
             <TextField
            label="Course ID "
            required
            name="courseId"
            value={formData.courseId || ''}
            onChange={handleFormChange}
            fullWidth/>

             <TextField
            label="Parents ID "
            name="parentId"
            required
            value={formData.parentId || ''}
            onChange={handleFormChange}
            fullWidth/>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
             <TextField
            label="Date Of Birth "
            name="dateOfBirth"
            required
            value={formData.dateOfBirth || ''}
            onChange={handleFormChange}
            fullWidth/>

             <TextField
            label="Gender "
            name="gender"
            required
            value={formData.gender || ''}
            onChange={handleFormChange}
            fullWidth/>

             <TextField
            label="Blood Group "
            name="bloodGroup"
            value={formData.bloodGroup || ''}
            onChange={handleFormChange}
            required
            fullWidth/>
            </Box>

             <TextField
            label="Phone Number "
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleFormChange}
            required
            fullWidth/>

             <TextField
            label="Email "
            name="email"
            value={formData.email || ''}
            onChange={handleFormChange}
            required
            fullWidth/>

             <TextField
            label="Student Record "
            name="studentRecord"
            value={formData.studentRecord || ''}
            onChange={handleFormChange}
            required
            fullWidth/>

          </Box>

          </DialogContent>

          <DialogActions>
            <Button onClick={closeEditDialog} color='error'>
              Cancel
            </Button >

            <Button type='submit' variant="contained" color='primary'>
              Save Changes
            </Button>
          </DialogActions>
          </Box>
        </Dialog>

        
 


      </Box>


    </>
  )
}

export default StudentTable