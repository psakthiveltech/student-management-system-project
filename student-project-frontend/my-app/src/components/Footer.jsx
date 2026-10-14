import { Box, Divider, Stack, Typography,Link } from '@mui/material'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    
    <Box
    component='footer'
    sx={{
      mt:5,
      px:{xs:3,md:6},
      py:4,
      bgcolor:'background.paper',
      borderTop:'1px solid',
      borderColor:'divider',
      width:'100%',
      boxSizing:'border-box'
    }}
    >
      <Stack
      direction={{xs:'column',md:'row'}}
      justifyContent="space-between"
      alignItems={{xs:'flex-start',md:'center'}}
      spacing={3}
      >
        <Box>
          <Typography variant='h6' fontWeight="bold">
            Student Management System
          </Typography>

          <Typography variant='body2' color='text.secondary' sx={{mt:1}}>
          Built with React, Material UI,Spring Boot And MySQL.
          </Typography>

        </Box>

        <Box>

          <Typography>
            About The Author
          </Typography>

          <Typography>
            Designed & developed by SAKTHIVEL PARAMASIVAM
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Link
            href="mailto:psakthivel.tech@gmail.com"
            underline="none"
            color="text.secondary"
            sx={{
              display: 'flex',
                alignItems: 'center',
                gap: 0.7,
                '&:hover': { color: 'primary.main' }
            }}
            >
              <EmailIcon fontSize='small'/>
              Email
            </Link>
            <Link
              href="https://github.com/psakthiveltech"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.7,
                '&:hover': { color: 'primary.main' }
              }}
            >
              <GitHubIcon fontSize="small" />
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/sakthivelparamasivam/"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.7,
                '&:hover': { color: 'primary.main' }
              }}
            >
              <LinkedInIcon fontSize="small" />
              LinkedIn
            </Link>
          </Stack>

          


        </Box>

      </Stack>
      
              <Divider sx={{my:3}}/>

          <Typography
        variant="caption"
        color="text.secondary"
        textAlign="center"
        display="block"
      >
        © {new Date().getFullYear()} Student Management System. All rights
        reserved.
      </Typography>


    </Box>
  )
}

export default Footer