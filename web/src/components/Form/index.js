import React, { useState } from 'react';
import axios from 'axios';
import './Form.css'

// MUI imports
import { Box, Button, FormControl, IconButton, Input, InputAdornment, TextField, Typography } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

// Components import
import AltLogin from './AltLogin';


function Form() {

    // User data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    const [showPassword, setShowPassword] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    // Handle user submitted data
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/submit', {
                password: formData.password,
                email: formData.email,
            });

            console.log(response.data.message)


        } catch (error) {
            console.error('Error submitting data:', error);

        }
    };

    return (
        <Box className='form-container'>
            <Box sx={{ marginBottom: '4vh' }}>
                <Typography variant='p' className='title'>
                    Log in
                </Typography>
            </Box>


            <form onSubmit={handleSubmit} className='inputs-container'>
                <Box mb={2}>
                    <TextField
                        className='email-input'
                        fullWidth
                        type='email'
                        name='email'
                        variant='outlined'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position='start'><EmailOutlinedIcon /></InputAdornment>
                            },

                        }}
                        size='small'
                        required
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        className='email-input'
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        variant='outlined'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position='start'><LockOutlinedIcon /></InputAdornment>,
                                endAdornment: <IconButton onClick={handlePasswordVisibility}>
                                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                </IconButton>
                            }
                        }}
                        size='small'
                        required
                    />
                </Box>

                <Box className='forgot-btn-container'>
                    <button className='forgot-btn'>
                        Forgot password?
                    </button>
                </Box>

                <Box className='log-in-btn-container'>
                    <button
                        className='log-in-btn'
                        type='submit'
                        disabled={formData.password === '' || formData === '' ? true : false}
                    >
                        Log in
                    </button>
                </Box>



            </form>

            {/* Alternative log in methods - google and facebook and register button */}
            <AltLogin />

        </Box>
    )
}

export default Form