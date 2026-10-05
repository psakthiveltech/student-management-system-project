import React, { useContext, useState } from 'react'
import {Box, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, ThemeProvider, Typography} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContexts } from './ThemeProvider';

const NavBar = () => {

  const navigation = useNavigate(null);

  const handleNavigarion=()=>{
    navigation("/")
  }
  
  const {darkOrLight,setDarkOrLight} = useContext(ThemeContexts);

  const [sidebar,setSidebar] = useState(false);

  const setSideMenu=()=>{
    setSidebar(!sidebar);
  }

  const navItems =[
    {title:'Dashboard',path:'/',no:1},{title:'Student',path:'/student',no:2},{title:'Parents',path:'/parents',no:3},{title:'Course',path:'/course',no:4}
  ];
  return (
      
    <Box 
    component="nav"
    
    sx={{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      py:2,
      px:4,
      backgroundColor:'lightblue',
    }}>
      <CssBaseline/>

      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer', gap:1}} onClick={handleNavigarion}>        
        <SchoolIcon sx={{color:darkOrLight?'white':'gray'}} fontSize='large'/>
        <Typography variant='h4' sx={{color:darkOrLight?'white':'gray'}}>
          MyStudent's
        </Typography>
      </Box>
      <Box sx={{display:{xs:'none',md:'flex'},gap:2}}>

        {
          navItems.map((items)=>(
            <Button key={items.no} component={Link} to={items.path}  sx={{color:darkOrLight?'white':'gray' ,textTransform:'none',fontSize:20}}>
        {items.title}
        </Button>
          ))
        }

      </Box>

      <Box >

        <IconButton onClick={()=>setDarkOrLight()}>
          {
              darkOrLight?<LightModeIcon  sx={{color:'white'}}/> : <DarkModeIcon/>
          }
        </IconButton>

      </Box>

      <Box sx={{display:'flex',justifyContent:'center',alignContent:'center'}}>
          <IconButton sx={{display:{xs:'flex',md:'none'}}} onClick={()=>setSideMenu()}>
          <HomeFilledIcon sx={{color:darkOrLight?'white':'gray'}}/>
        </IconButton>
      </Box>

      <Drawer 
      open={sidebar}
      anchor='right'
      onClose={setSideMenu}

      sx={{
        display:{xs:'flex',md:'none'},
        '& .MuiDrawer-paper':{boxSizing:'border-box',backgroundColor:'lightblue'}
      }}
        >

          <Box onClick={setSideMenu} sx={{textAlign:'center',width:'100%'}}>

            <Typography variant='h4' sx={{color:darkOrLight?'white':'black', mt:2}}>
              Menu
            </Typography>

            <List>
              {
                navItems.map((items)=>(
                  <ListItem key={items.no}>
                    <ListItemButton
                    
                    component={Link}
                    to={items.path}
                    sx={{":hover":{
                      backgroundColor:'grey',
                      
                    }}}>
                      <ListItemText  primary={items.title} sx={{color:darkOrLight?'white':'black'}}/>
                    </ListItemButton>
                  </ListItem>
                ))
              }
            </List>

          </Box>

      </Drawer>

    </Box>
  )
}

export default NavBar