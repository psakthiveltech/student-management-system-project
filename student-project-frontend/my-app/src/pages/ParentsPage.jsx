import React, { useContext, useEffect, useRef, useState } from 'react'
import { backgroundColor, Box, color, textAlign, width } from '@mui/system'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { ThemeContexts } from '../components/ThemeProvider'
import { createParents, getParentsById, updateParentsById } from '../Service/parentsApi'
import ParentTable from '../components/ParentTable'

const ParentsPage = () => {

  const {darkOrLight,showMessage} =useContext(ThemeContexts);

  const ParentsNameref =useRef(null);

  const [searchById,setSearchById] = useState(null);

  const [parentsById,setParentsById] = useState(null);

  const [parents,setParents] = useState({
    nameOfFather:'',
    nameOfMother:'',
    phoneNumber:'',
    currentAddress:'',
    email:'',
    homeTown:''
  })

  const searchByIdref = useRef(null);
  
  
const scrolltoSearchById=()=>{
    searchByIdref.current?.scrollIntoView({
      behavior:'smooth'
    })
  }

  const handleUpdateById=(e)=>{
    e.preventDefault();
    getParentsById(searchById)
    .then((response)=>{
      console.log("Success ",response.data);
      setParentsById(response.data);
    })
    .catch((error)=>{
      console.log(error.response?.data);
      alert("Error Accure");
      console.log(searchById);
      
      
    })
  }

  const handleSaveUpdatedValue=(e)=>{
    e.preventDefault();
    updateParentsById(searchById,parentsById)
    .then((response)=>{
      console.log(response.data);
      showMessage("Student updated successfully","success")
      setParentsById(null);
      setSearchById('');
    })
    .catch((error)=>{
      console.log(parentsById);
      console.log(searchById);
      
      console.log("Error Occure",error.response?.data);
      showMessage("Student update Failed","error")
    })
  }

  const handleCreateStudent=(e)=>{
    e.preventDefault();
    createParents(parents)
    .then((response)=>{
      showMessage("Student created successfully","success")
      console.log("Success");

      setParents({
    nameOfFather:'',
    nameOfMother:'',
    phoneNumber:'',
    currentAddress:'',
    email:'',
    homeTown:''
      })
      
    })
    .catch((error)=>{
      console.log("Error Message",error );
      showMessage("Student creation failed","error")
      
    })
  }

  useEffect(()=>{
    ParentsNameref.current.focus();
  },[])

  const resetAllField=()=>{
    setParents({
    nameOfFather:'',
    nameOfMother:'',
    phoneNumber:'',
    currentAddress:'',
    email:'',
    homeTown:''
    })
  }

  return (
    <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' ,mt:3}}>
      <Box sx={{display:'flex',justifyContent:'end',width:'100%', mb:3}}>
          <Button onClick={scrolltoSearchById} sx={{backgroundColor:'lightblue', color:darkOrLight?'white':'grey'}}>
            SearchBy ID 

          </Button>
        </Box>
      <Paper component='form' onSubmit={handleCreateStudent} elevation={4} sx={{width:'70%',mt:4,px:3,py:3,mb:3}}>

        <Box sx={{display:'flex',flexDirection:'column',gap:3 ,mt:2}}>
        <Typography variant='h4' sx={{textAlign:'center',color:'grey'}}>
          Parents Form
        </Typography>
        <TextField
        required
        inputRef={ParentsNameref}
        label='Father Name'
        value={parents.nameOfFather}
        onChange={(e)=>setParents({
          ...parents,
          nameOfFather:e.target.value
        })}
        />

        <TextField
        required
        label='Mother Name'
        value={parents.nameOfMother}
        onChange={(e)=>setParents({
          ...parents,
          nameOfMother:e.target.value
        })}
        />

        <TextField
        required
        label='Email'
        value={parents.email}
        onChange={(e)=>setParents({
          ...parents,
          email:e.target.value
        })}
        />

        <TextField
        required
        label='Current Address'
        value={parents.currentAddress}
        onChange={(e)=>setParents({
          ...parents,
          currentAddress:e.target.value
        })}
        />

        <TextField
        required
        label='Phone Number'
        value={parents.phoneNumber}
        onChange={(e)=>setParents({
          ...parents,
          phoneNumber:e.target.value
        })}
        />

        <TextField
        required
        label='Home Town'
        value={parents.homeTown}
        onChange={(e)=>setParents({
          ...parents,
          homeTown:e.target.value
        })}
        />

        <Box sx={{display:'flex',justifyContent:'space-evenly'}}>

          <Button 
          sx={{backgroundColor:'lightblue',color:darkOrLight?'white':'grey'}}
          onClick={resetAllField}
          variant='outlined'
          color='primiry'
          >
            Reset
          </Button>

          <Button 
          type='sumbit'
          sx={{backgroundColor:'lightblue',color:darkOrLight?"white":'grey'}}>
            Save
          </Button>
          

        </Box>


          
        </Box>

      </Paper>


      <ParentTable/>

      <Box  sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',mt:4,mb:3}}>

        <Paper elevation={4} sx={{ width:'90%' ,display:'flex',flexDirection:'column',gap:2,justifyContent:'space-evenly',alignItems:'center',py:4, borderBottom:'4px solid lightblue'}}>


          <box sx={{width:'100%',textAlign:'center',py:3}}>
            <Typography variant='h4' sx={{color:darkOrLight?'white':'grey'}}>
        Update Parent's By Id
          </Typography>
          </box>

          <Box component='form' onSubmit={handleUpdateById} sx={{display:'flex',flexDirection:'row',width:'90%',justifyContent:'space-evenly',alignItems:'center'}} ref={searchByIdref}>
            <TextField
        required
        value={searchById}
        onChange={(e)=>setSearchById(Number(e.target.value))}
        label='Update By Id'
        />
        <Button type='submit' sx={{color:darkOrLight?'white':'grey',backgroundColor:'lightblue'}}>
          Search
        </Button>
          </Box>
          
        
        {
          parentsById && (
            <Box component='form' onSubmit={handleSaveUpdatedValue} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '80%', mt: 3, pt: 3, borderTop: '1px solid lightgray', borderBottom:'4px solid light blue'}}>
              <TextField
              required
              label="Father Name"
              value={parentsById.nameOfFather || ''}
              onChange={(e)=>setParents({
                ...parentsById,
                nameOfFather:e.target.value
              })}
              /><TextField
              required

              label="Mother Name"
              value={parentsById.nameOfMother || ''}
              onChange={(e)=>setParentsById({
                ...parentsById,
                nameOfMother:e.target.value
              })}
              />

              <TextField
              required
              label="CurrentAddress"
              value={parentsById.currentAddress || ''}
              onChange={(e)=>setParentsById({
                ...parentsById,
                currentAddress:e.target.value
              })}
              />

              <TextField
              required
              label="Home Town"
              value={parentsById.homeTown || ''}
              onChange={(e)=>setParentsById({
                ...parentsById,
                homeTown:e.target.value
              })}
              />

              <TextField
              required
              label="Phone Number"
              value={parentsById.phoneNumber || ''}
              onChange={(e)=>setParentsById({
                ...parentsById,
                phoneNumber:e.target.value
              })}
              />

              <TextField
              required
              label="Emai"
              value={parentsById.email || ''}
              onChange={(e)=>setParentsById({
                ...parentsById,
                email:e.target.value
              })}
              />
              
              <Box sx={{display:'flex',justifyContent:'center',gap:3,mt:3}}>


                <Button onClick={()=>setParentsById(null) }sx={{color:darkOrLight?'white':'grey',backgroundColor:'lightblue'}}>
                Cancel
                </Button>

                <Button type='submit' sx={{color:darkOrLight?'white':'grey',backgroundColor:'lightblue'}}>
                Save Changes
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

export default ParentsPage