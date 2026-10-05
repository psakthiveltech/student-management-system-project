import { Alert, CssBaseline, Snackbar } from '@mui/material';
import React, { useState,createContext, useMemo } from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from '@mui/material/styles';


export  const ThemeContexts = createContext();
export const ThemeProvider = ({children}) => {

  const [message,setMessage] = useState('');
  const [severity,setSeverity] = useState('success');
  const [openSnackbar,setOpenSnacbar] = useState(false);

   const [darkOrLight,setLightOrDark] = useState(false);
    const setDarkOrLight=()=>{
    darkOrLight?setLightOrDark(false):setLightOrDark(true);

    console.log(darkOrLight);
    
  }

  const theme = useMemo(()=>{
    return createTheme({
      palette:{
        mode:darkOrLight?'dark':'light',

        primary:{
          main: darkOrLight?'#90caf9':'#1976d2'
        },

        background:{
          default:darkOrLight?'#121212':'#f5f7fa',
          paper:darkOrLight?'#1e1e1e':'#ffffff',
        },

        text:{
          primary:darkOrLight?'#ffffff':'#666666'
        }
      }
    })
  },[darkOrLight])

  const showMessage = (message,severity='success')=>{
    setMessage(message);
    setSeverity(severity);
    setOpenSnacbar(true);
  }

  const handleCloseSnackbar=(event,reason)=>{
    if(reason==='clickaway'){
      return;
    }
    setOpenSnacbar(false);
  }
  return (
      <MuiThemeProvider theme={theme}>

        <CssBaseline/>

      <ThemeContexts.Provider value={{darkOrLight,showMessage,setDarkOrLight}}>
        {children}

        <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical:'top',
          horizontal:'center'
        }}
        >
          
          <Alert 
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{width:'100%'}}
          >
            {message}
          </Alert>

        </Snackbar>


      </ThemeContexts.Provider>
      </MuiThemeProvider>
      
    
  )
  
}

export default ThemeProvider