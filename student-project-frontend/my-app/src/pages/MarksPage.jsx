import React, { useContext, useEffect, useRef, useState } from 'react'
import { createMark, deleteMarkById, getAllMarks, getByStudentId, getMarkById, updateMarkById } from '../Service/MarksApi'
import { ThemeContexts } from '../components/ThemeProvider'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography,Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
const MarksPage = () => {

  const formFocus = useRef(null);

  const {showMessage} = useContext(ThemeContexts)


const [createMarkData,setCreateMarkData] = useState({
  mark:'',
  studentId:'',
  semSubjectsId:''
})

  const [editDialogOpen, setEditDialogOpen] = useState(false);
const [editingMark, setEditingMark] = useState(null);
 const [openUpdate,setOpenUpdate] = useState(false);


const [editForm, setEditForm] = useState({
  mark: '',
  studentId: '',
  semSubjectsId: ''
});

  const [studentId,setStudentId] = useState(null);
  const [oldMarkData,setOldMarkData] = useState([]);

  const handleGetIdToUpdate=(e)=>{
    e.preventDefault();
    getByStudentId(studentId)
    .then((res)=>{
      setOldMarkData(res.data);
      showMessage("Update Form Opened ","info");
      setOpenUpdate(true);
      
      
    })
    .catch((error)=>{
      console.log("error");
      showMessage("Student ID Record Not Found ","error")
      
    })
  }

  const handleUpdateByStudentId=(e)=>{

    e.preventDefault();

    updateMarkById(studentId,oldMarkData)
    .then((res)=>{
      setOldMarkData({});
      setOpenUpdate(false);
      showMessage("Update Student Mark Successfully","success")
      setStudentId(null);
      console.log(openUpdate);
      
    })
    .catch((error)=>{
      showMessage("Update Failed","error")
    })
  }
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [deleteMarkId, setDeleteMarkId] = useState(null);
const [saving, setSaving] = useState(false);

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10); 
  const [marks,setMarks] = useState([]);

  useEffect(()=>{
handleGetAllMarks();
  },[])

  const handleGetAllMarks=()=>{

    getAllMarks()
    .then((res)=>{
      setMarks(res.data);
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }
  
  

  const columns = [
    { id: 'id', label: 'Mark ID', minWidth: 80 },
    { id: 'studentId', label: 'Student ID', minWidth: 100 },
    { id: 'courseName', label: 'Course', minWidth: 100 },
    { id: 'semester', label: 'Semester', minWidth: 100 },
    { id: 'subjectName', label: 'Subject', minWidth: 150 },
    { id: 'semSubjectId', label: 'Subject ID', minWidth: 100 },
    { id: 'mark', label: 'Mark', minWidth: 80, align: 'center' },
    { id: 'action', label: 'Action', minWidth: 170, align: 'center' }
  ];
useEffect(()=>{
formFocus.current.focus();
},[])

  const col = [
  { id: 'studentId', label: 'Student ID' },
  { id: 'subjectName', label: 'Subject Name' },
  { id: 'semester', label: 'Semester' },
  { id: 'id', label: 'Mark ID' },
  { id: 'mark', label: 'Mark' },
  { id: 'action', label: 'Action' }
];

const handleCreateMarks=(e)=>{
  e.preventDefault();
  createMark(createMarkData)
  .then((response)=>{
    showMessage("Student Mark Entered Successfully","success");
  })
  .catch((error)=>{
    showMessage("Failed To Enter Student Mark","error");
  })
}

const handleEditClick = (mark) => {
  setEditingMark(mark);

  setEditForm({
    mark: mark.mark,
    studentId: mark.studentId,
    semSubjectsId: mark.semSubjectId
  });

  setEditDialogOpen(true);
};

const handleEditChange = (event) => {
  const { name, value } = event.target;

  setEditForm((previous) => ({
    ...previous,
    [name]: value
  }));
};

const handleSaveEdit = async (event)=>{
  event.preventDefault()
  if(!editingMark) return;

  setSaving(true);

  try{
    await updateMarkById(editingMark.id,{
      mark:Number(editForm.mark),
      studentId: Number(editForm.studentId),
      semSubjectsId: Number(editForm.semSubjectsId)
    });
    
    setEditDialogOpen(false);
    showMessage("Mark Updated Successfully","success")
    handleGetAllMarks();
  }
  catch(error){
    console.error(error);
    showMessage('Failed to update mark', 'error');
    
  }
  finally{
    setSaving(false);
  }
}

    const handleDeleteClick = (id) => {
  setDeleteMarkId(id);
  setDeleteDialogOpen(true);
};

const handleConfirmDelete = async () => {

  if (deleteMarkId == null) return;
  try {
    await deleteMarkById(deleteMarkId);

    setDeleteDialogOpen(false);
    setDeleteMarkId(null);
    showMessage('Mark deleted successfully', 'success');
    handleGetAllMarks();
  } catch (error) {
    console.error(error);
    showMessage('Failed to delete mark', 'error');
  }
};


 
  return (
    <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column",my:4}}>
      
        <Paper sx={{width:'40%',display:'flex',flexDirection:'column',justifyContent:'center',px:3,mb:3,py:3}} elevation={4} component='form' onSubmit={handleCreateMarks}>
          <Typography variant='h4' sx={{textAlign:'center',mb:2}}>
            Create Marks
          </Typography>
          <TextField
          
          inputRef={formFocus}
          sx={{mb:3}}
          label='Student ID'
          value={createMarkData.studentId}
          required
          onChange={(e)=>setCreateMarkData({
            ...createMarkData,
            studentId:Number(e.target.value)
          })}
          />

          <TextField
          sx={{mb:3}}

          label='Subject Id'
          value={createMarkData.semSubjectsId}
          required
          onChange={(e)=>setCreateMarkData({
            ...createMarkData,
            semSubjectsId:Number(e.target.value)
          })}
          />

          <TextField
          sx={{mb:3}}

          label='Mark'
          value={createMarkData.mark}
          required
          onChange={(e)=>setCreateMarkData({
            ...createMarkData,
            mark:Number(e.target.value)
          })}
          />

          <Box sx={{width:'100%' , display:'flex',justifyContent:'space-evenly',alignItems:'center',mb:3}}>
            <Button sx={{backgroundColor:'lightblue'}} onClick={()=>setCreateMarkData(
              {mark:'',
              studentId:'',
              semSubjectsId:''})}>
          Clear
            </Button>

            <Button sx={{backgroundColor:'lightblue'}} type='submit'>
              Save
            </Button>
          </Box>
        </Paper>
                <Paper elevation={4} sx={{my:4}} >
                <TableContainer sx={{ maxHeight: 500, overflowX: 'auto' }}>

                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {
                        columns.map((onecol)=>(
                          <TableCell
                          key={onecol.id}
                          align={onecol.align}
                          sx={{
                            minWidth:onecol.minWidth,
                            backgroundColor:'lightblue',
                            fontWeight:'bold'
                          }}
                          >
                            {
                              onecol.label
                            }
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      marks.slice(
                        page*rowPerPage, 
                        page * rowPerPage + rowPerPage
                      )
                      .map((mark)=>(
                        <TableRow hover key={mark.id}>

                          {
                            columns.map((col)=>(
                              <TableCell key={col.id} align={col.align}>

                                {
                                  col.id==='action' ? (
                                    <Box
                                    sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 1
                                    }}>
                                      <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleEditClick(mark)}

                          >
                            Edit
                            <ModeEditIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          </Button>

                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              setDeleteMarkId(mark.id)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            Delete
                            <DeleteIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          </Button>

                                    </Box>
                                  ):(
                                    mark[col.id] ??'-'
                                  )
                                }

                              </TableCell>
                            ))
                          }

                          {
                            marks.length ===0 &&(
                              <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                  No Marks Found.

                                </TableCell>
                                </TableRow>
                            )
                          }

                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
                </TableContainer>

                <TablePagination
                component='div'
                count={marks.length}
                rowsPerPage={rowPerPage}
                page={page}
                rowsPerPageOptions={[10,20,50,100]}
                onPageChange={(event,newPage)=>setPage(newPage)}
                onRowsPerPageChange={(event)=>{
                  setRowPerPage(Number(event.target.value));
                  setPage(0);
                }}
                />


                </Paper>

                <Paper  elevation={4} sx={{width:'70',display:'flex',flexDirection:'column' ,gap:4,mt:2,borderTop:'4px solid lightblue',px:3}}>
                  <Box sx={{width:'70'}}>
                    <Typography variant='h4' sx={{textAlign:'center',mt:2}}>
                    Find Mark By Student Id
                  </Typography>

                  </Box>
                  
                  <Box onSubmit={handleGetIdToUpdate} component='form'  sx={{width:'70',display:'flex',alignItems:'center' ,gap:4,p:4}}>
                    <TextField
                    Number
                    required
                    value={studentId}
                    label='Student Id'
                    onChange={(e)=>setStudentId(Number(e.target.value))}
                  />
                  <Button sx={{backgroundColor:'lightblue'}} type='submit'> Search</Button>
                  </Box>
                </Paper>


                  {openUpdate && (
  <Paper elevation={4} sx={{ width: '80%', mt: 3, p: 2 ,borderBottom:'4px solid lightblue'}}>
    <Typography variant="h4" sx={{ mb: 2 ,textAlign:'center'}}>
      Marks for Student ID: {studentId}
    </Typography>

    {oldMarkData.length > 0 ? (
      <TableContainer sx={{ overflowX: 'auto',width:'100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              {col.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{ backgroundColor: 'lightblue', fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {oldMarkData.map((data) => (
              <TableRow key={data.id} hover>
                {col.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === 'action' ? (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleEditClick(data)}
                        >
                          <ModeEditIcon /> Edit
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteClick(data.id)}
                        >
                          <DeleteIcon /> Delete
                        </Button>
                      </Box>
                    ) : (
                      data[column.id] ?? '-'
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography color="text.secondary" sx={{ p: 2 }}>
        No marks found for this student.
      </Typography>
    )}
  </Paper>
)}

                  


                <Dialog
  open={editDialogOpen}
  onClose={() => !saving && setEditDialogOpen(false)}
  fullWidth
  maxWidth="sm"
>
  <Box component="form" onSubmit={handleSaveEdit}>
    <DialogTitle>Edit Student Mark</DialogTitle>

    <DialogContent>
      <DialogContentText sx={{ mb: 2 }}>
        Update the details for Mark ID: {editingMark?.id}
      </DialogContentText>

      <TextField
        label="Student ID"
        name="studentId"
        type="number"
        value={editForm.studentId}
        onChange={handleEditChange}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        label="Subject ID"
        name="semSubjectsId"
        type="number"
        value={editForm.semSubjectsId}
        onChange={handleEditChange}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        label="Mark"
        name="mark"
        type="number"
        value={editForm.mark}
        onChange={handleEditChange}
        inputProps={{ min: 0, max: 100 }}
        required
        fullWidth
        margin="normal"
      />
    </DialogContent>

    <DialogActions sx={{ p: 2 }}>
      <Button
        color="error"
        onClick={() => setEditDialogOpen(false)}
        disabled={saving}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        variant="contained"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </DialogActions>
  </Box>
</Dialog>

   <Dialog
  open={deleteDialogOpen}
  onClose={() => setDeleteDialogOpen(false)}
>
  <DialogTitle>Confirm Deletion</DialogTitle>

  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete Mark ID {deleteMarkId}?
      This action cannot be undone.
    </DialogContentText>
  </DialogContent>

  <DialogActions sx={{ p: 2 }}>
    <Button
      onClick={() => setDeleteDialogOpen(false)}
      color="primary"
    >
      Cancel
    </Button>

    <Button
      onClick={handleConfirmDelete}
      color="error"
      variant="contained"
    >
      Confirm Delete
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  )
}

export default MarksPage