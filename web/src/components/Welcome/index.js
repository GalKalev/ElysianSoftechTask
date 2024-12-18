import React from 'react'
import './Welcome.css'

// MUI imports
import { Box } from '@mui/material'

// Assets import
import illustration from '../../assets/Illustration.png'
import logo from '../../assets/logo.png'

function Welcome() {
  return (
    <Box className='welcome-container'>
      <Box>
        <Box
          className='logo'
          component={'img'}
          alt='logo'
          src={logo}
        />
      </Box>
      <Box className='illustration-container'>
        <Box
          className='illustration'
          component={'img'}
          alt='illustration'
          src={illustration}
        />

        <p className='text1'>Welcome aboard my friend</p>
        <p className='text2'>just a couple of clicks and we start</p>

      </Box>
    </Box>
  )
}

export default Welcome