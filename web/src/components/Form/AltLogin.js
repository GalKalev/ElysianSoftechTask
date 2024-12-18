import React from 'react'
import './AltLogin.css'

// MUI imports
import { Box, Typography } from '@mui/material'

// Assets import
import googleImg from '../../assets/Google.png'
import facebookImg from '../../assets/SocialIcon.png'

function AltLogin() {
  return (
    <Box className='alt-container'>
      <Box className='or-container'>
        <div className='or-line'></div>
        <Typography className='or-text' variant='p'>
          Or
        </Typography>
        <div className='or-line'></div>
      </Box>

      <Box className='alt-btns-container'>
        <button className='alt-btn'>
          <Box
            className='alt-btn-img'
            component={'img'}
            alt='google-btn'
            src={googleImg}
          />

          <p className='alt-btn-text'>Google</p>
        </button>

        <button className='alt-btn'>
          <Box
            className='alt-btn-img'
            component={'img'}
            alt='facebook-btn'
            src={facebookImg}

          />
          <p className='alt-btn-text'>Facebook</p>
        </button>
      </Box>

    </Box>
  )
}

export default AltLogin