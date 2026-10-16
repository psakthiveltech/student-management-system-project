import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContexts } from '../components/ThemeProvider';

const LonginPage = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {showMessage} = useContext(ThemeContexts);

  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:8080/api/admin/login',{
        email:email,
        password:password
      });

      if(response.status === 200){
        navigate('/dashboard');
        showMessage("Login Successfully","success")
      }
    }
    catch(error){
      console.log(error);
      
      showMessage("Invalid email or password","error")
    }
  }
  return (
    <Box sx={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Paper elevation={4} component='form' sx={{display:'flex',flexDirection:'column' ,py:4,px:6,borderBottom:'solid 4px lightblue',borderRadius:'0px 20px'}} onSubmit={handleLogin}>
        <Typography variant='h6' sx={{mb:4,textAlign:'center',cursor:'zoom-in'}}>
          Login Form
        </Typography>
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center', mb:4,alignItems:'center'}}>
          <AccountCircleIcon
          sx={{
            fontSize:'100px',
            textAlign:'center',
            color:'lightblue'
          }}
          />
          Admin
        </Box>
          
        <TextField
        label='Email'
        sx={{mb:4}}
        required
        type='email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}

        />
        <TextField
        label='Password'
        required
        type='password'
        sx={{mb:4}}
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <Button type='submit' sx={{backgroundColor:'lightblue',color:'white'}}>
          login
        </Button>
      </Paper>
    </Box>
  )
}

export default LonginPage