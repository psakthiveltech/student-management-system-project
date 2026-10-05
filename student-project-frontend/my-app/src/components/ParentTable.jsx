import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { deleteParentsById, getAllParents, updateParentsById } from '../Service/parentsApi'
import { ThemeContexts } from './ThemeProvider';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const ParentTable = () => {

  const [ parents,setParents] = useState([]);

  const {darkOrLight,showMessage} =useContext(ThemeContexts);

  const [page,setPage]=useState(0);
  const [rowPage,setRowPage]=useState(10);

  const [deleteDialogOpen,setDeleteDialogOpen]= useState(false);
  const [deleteparents,setDeleteParents] = useState(null);

  const [editDialogOpen,setEditDialogOpen] = useState(false);
  const [editParents,setEditeParents] = useState(null);

  const [form,setForm]=useState({
    nameOfFather:'',
    nameOfMother:'',
    phoneNumber:'',
    currentAddress:'',
    homeTown:'',
    email:''
  })

  const handleEditParent=(parents)=>{
    setEditeParents(parents);
    setEditDialogOpen(true);
  }

  useEffect(()=>{
    if(editParents){
      setForm(editParents)
    }
  },[editParents])


  const handleForm=(e)=>{
    const {name,value}=e.target;
    setForm({
      ...form,
      [name]:value
    });
  }

  const handleSaveEdit =(e)=>{
    e.preventDefault();
    updateParentsById(editParents.parentId,form)
    .then((response)=>{
      setEditDialogOpen(false);
      showMessage("Student Updated Successfully","success")
      handleGetAllParents()
    })
    .catch((error)=>{
  console.log("UPDATE ERROR:", error);
  console.log("STATUS:", error.response?.status);
  console.log("BACKEND DATA:", error.response?.data);
  showMessage("Student Updation Failed","error")
})
  }

  const closeEditParents=()=>{
    setEditDialogOpen(false);
    setEditeParents(null);
  }


  const handleDeleteClick = (id) =>{
      setDeleteParents(id);
      setDeleteDialogOpen(true);
    }
  
    const cancelDelete=()=>{
      setDeleteDialogOpen(false);
      setDeleteParents(null);
    }
    const confirmDelete=()=>{

      console.log(deleteparents +" this is the id");
      
      
      deleteParentsById(deleteparents)
      .then((response)=>{
        setDeleteDialogOpen(false);
        handleGetAllParents();
        showMessage("Student Deletion Successfull"," success")
      })
      .catch((error)=>{
        console.log("Failed to Delete Student",error);
        showMessage("Student Deletion Failed","error")
      })
    }

  useEffect(()=>{
    handleGetAllParents();
  },[])

  const handleGetAllParents=()=>{
    getAllParents()
    .then((response)=>{
      console.log(response.data);
      setParents(response.data);
      
    })
    .catch((error)=>{
      console.log("Server not responding",error.response.data);
    })
  }

  const handlePage=(event,newPage)=>{
      setPage(newPage);

    }

    const handleChangeRowPerPage=(event)=>{
      setRowPage(+event.target.value);
      setPage(0);
    }

  const column=[
    {id:'parentId',label:'Parents Id',minWidth:70},
    {id:'nameOfFather',label:'Father Name',minWidth:170},
    {id:'nameOfMother',label:'Mother Name',minWidth:170},
    {id:'phoneNumber',label:'Phone Number',minWidth:150},
    {id:'currentAddress',label:'Current Address',minWidth:150},
    {id:'homeTown',label:'Home Town',minWidth:120},
    {id:'email',label:'Email',minWidth:140},
    {id:'action',label:'Action',minWidth:200}
  ]
  return (
    <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
      
    <Paper sx={{width:'90%',overflow:'hidden',boxShadow:3,p:3, borderTop:'6px solid lightblue'}}>

      <TableContainer sx={{maxHeight:440}}>

        <Table>
        <TableHead>

          <TableRow>
            {
              column.map((value)=>(
                <TableCell
                minWidth={value.minWidth}
                key={value.id}
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
            parents.slice(page*rowPage,page*rowPage+rowPage)
            .map((parents)=>{
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={parents.parentId}>

                  {
                    column.map((value)=>{
                      return (
                        <TableCell key={value.id}>
                          {
                            value.id==="action" ?
                            (
                              <Box sx={{display:'flex',justifyContent:'center',gap:1}}>

                                <Button onClick={()=>handleEditParent(parents)} size='small' sx={{backgroundColor:'lightblue',color:darkOrLight?'white':'grey'}}>
                                Edit <ModeEditIcon/>
                                </Button>

                                <Button onClick={()=>handleDeleteClick(parents.parentId)} size='small' sx={{backgroundColor:'red',color:darkOrLight?'white':'grey'}}>
                                Delete <DeleteIcon/>
                                </Button>
                              </Box>
                            ):(
                              parents[value.id]
                            )
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
      
      rowsPerPageOptions={[10,20,100]}
      component="div"
      rowsPerPage={rowPage}
      page={page}
      count={parents.length}
      onPageChange={handlePage}
      onRowsPerPageChange={handleChangeRowPerPage}


      
      />

      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>

        <DialogTitle>
          Conform Deletion
        </DialogTitle>

          <DialogContent>
        <DialogContentText>
          Are you sure you want to delete parents Id {deleteparents} ? This will be delete permenently 
        </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={cancelDelete} color='primary'>
          Cancel
          </Button>
          <Button onClick={confirmDelete} color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={closeEditParents} fullWidth maxWidth='sm'>
           <Box component='form' onSubmit={handleSaveEdit}>
           <DialogTitle>
            Edit Parent's
           </DialogTitle>

           <DialogContent>
            <DialogContentText sx={{mb:2}}>
            Update Information 
            </DialogContentText>

            <Box component="form"  sx={{display:'flex',flexDirection:'column',gap:2,mt:1}}>

              <TextField
              label="Father Name"
              name="nameOfFather"
              value={form.nameOfFather || ''}
              required
              onChange={handleForm}
              />

              <TextField
              label="Mother Name"
              name="nameOfMother"
              value={form.nameOfMother || ''}
              required
              onChange={handleForm}
              />

              <TextField
              label="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber || ''}
              required

              onChange={handleForm}
              />


                <TextField
              label="Home Town"
              name="homeTown"
              value={form.homeTown || ''}
              required

              onChange={handleForm}
              />

              <TextField
              label="Current Address"
              name="currentAddress"
              value={form.currentAddress || ''}
              required

              onChange={handleForm}
              />

              <TextField
              label="Email"
              name="email"
              value={form.email || ''}
              required

              onChange={handleForm}
              />
              

            </Box>
           </DialogContent>

           <DialogActions>
            <Button onClick={closeEditParents} color='error'>
            Cancel
            </Button>
            <Button type='submit'>
              Save Changes
            </Button>
           </DialogActions>

</Box>
      </Dialog>

    </Paper>



    </Box>
  )
}

export default ParentTable