import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContexts } from './ThemeProvider'
import { deleteCourseById, getAllCourse, updateCourse } from '../Service/courseApi';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const CourseTable = () => {

  

  const {darkOrLight,showMessage} = useContext(ThemeContexts);

  const [courses,setCourse] =useState([]);
  const [page,setPage] =useState(0);
  const [rowPerPage,setRowPerPage] =useState(10);

  const [deleteDialogOpen,setDeleteDialogOpen] = useState(false);
  const [deleteCourseId,setDeleteCourseId] =useState(null);
  const [editDialogOpen,setEditDialogOpen] = useState(false);
  const [editCourse,setEditCourse] = useState(null);

  const [form,setForm] =useState({
    courseName:''
  })

  const columns = [
    {id:'courseId',label:'Course Id',minWidth:100},  
      {id:'courseName',label:'Course Name',minWidth:100},
          {id:'action',label:'Action',minWidth:150,align:'center'}
  ]

  useEffect(()=>{
    handleGetAllCourse();
  },[])

  const handleGetAllCourse=()=>{
    getAllCourse()
    .then((response)=>{
      setCourse(response.data)
    })
    .catch((error)=>{console.log("Failed ",error.response?.data);
    })
  }

  const handleEditClick =(courses)=>{
    setEditCourse(courses);
    setForm({courseName:courses.courseName});
    setEditDialogOpen(true);
  };

  const handleSaveEdit=(e)=>{
    e.preventDefault();
    
    updateCourse(editCourse.courseId,form)
    .then((response)=>{
      setEditDialogOpen(false);
      showMessage("Student Update Successfully","success")
      handleGetAllCourse();
    })
    .catch((error)=>{
      showMessage("Student Updation Failed","error");
      console.log("error",error.response?.data)
  })
  };

  const confirmDelete=()=>{
    deleteCourseById(deleteCourseId)
    .then(()=>{
      setDeleteDialogOpen(false);
      handleGetAllCourse();
      showMessage("Student Deletion Successfully","success")
    })
    .catch((error)=>{console.log(error.response?.data,"error");
      showMessage("Student Deletion Failed","error")
  })
  }

  const handleDeleteClick=(id)=>{
    setDeleteCourseId(id);
    setDeleteDialogOpen(true);
  }

  const handleFormChange=(e)=>{
    const {name,value} =e.target;
    setForm({...form,
      [name]:value
    })
  }


  return (
    <Box sx={{width:'100%',display:'flex',justifyContent:'center',mt:4}}>
      <Paper sx={{ width: '80%', overflow: 'hidden', boxShadow: 3 }}>

      <TableContainer sx={{maxHeight:440}}>
      <Table stickyHeader>
        <TableHead>
      <TableRow>
        {
          columns.map((col)=>(
            <TableCell key={col.id} align={col.align} sx={{ minWidth: col.minWidth, backgroundColor: 'lightblue', fontWeight: 'bold' }}>
              {col.label}
            </TableCell>
          ))
        }
        
      </TableRow>
      </TableHead>
      

      <TableBody>
              {courses.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((course) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={course.courseId}>
                  {columns.map((col) => (
                    <TableCell key={col.id} align={col.align}>
                      
                      {col.id === "action" ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Button onClick={() => handleEditClick(course)} size='small' sx={{ backgroundColor: 'lightblue', color: darkOrLight ? 'white' : 'grey' }}>
                            Edit <ModeEditIcon fontSize="small" sx={{ ml: 0.5 }} />
                          </Button>
                          <Button onClick={() => handleDeleteClick(course.courseId)} size='small' variant='outlined' color="error">
                            Delete <DeleteIcon fontSize="small" sx={{ ml: 0.5 }} />
                          </Button>
                        </Box>
                      ) : (
                        course[col.id]
                      )}

                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            
      </Table>
      </TableContainer>
          <TablePagination
          rowsPerPageOptions={[10, 20, 100]}
          component="div"
          count={courses.length}
          rowsPerPage={rowPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowPerPage(+e.target.value);
            setPage(0);
          }}
        />

        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete Course ID {deleteCourseId}?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color='primary'>Cancel</Button>
            <Button onClick={confirmDelete} color='error' variant='contained'>Delete</Button>
          </DialogActions>
        </Dialog>
        
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth='sm'>
          <Box component='form' onSubmit={handleSaveEdit}>
            <DialogTitle>Edit Course</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>Update Course Information</DialogContentText>
            
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
              required
                label="Course Name"
                name="courseName"
                value={form.courseName}
                onChange={handleFormChange}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color='error'>Cancel</Button>
            <Button type='submit' variant="contained" color="primary">Save Changes</Button>
          </DialogActions>
          </Box>
        </Dialog>

      </Paper>
    </Box>
  )
}

export default CourseTable