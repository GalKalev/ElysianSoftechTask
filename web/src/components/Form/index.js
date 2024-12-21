import React, { useState } from 'react';
import axios from 'axios';
import './Form.css'

// MUI imports
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
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

    // State for password visibility
    const [showPassword, setShowPassword] = useState(false)

    // State to disabled button when needed
    const [disableBtns, setDisableBtns] = useState(false)

    // Updates the user data state from the inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    // Function to toggle password visibility
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    // Handle user submitted data
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setDisableBtns(true)
            console.log(`email: ${formData.email}, password: ${formData.password}`);

            const response = await axios.post(`http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/login`, {
                password: formData.password,
                email: formData.email,
            });

            alert(response.data.message)


        } catch (error) {
            console.error('Error submitting data:', error);
            if(error.response.data.message){
                alert(error.response.data.message)
            }else{
                alert('Error: please try again later')
            }
            

        }finally{
            setDisableBtns(false)
        }
    };


    // Function for registering users for testing
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            console.log(`REG email: ${formData.email}, password: ${formData.password}`);
            const response = await axios.post(`http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/register`, {
                password: formData.password,
                email: formData.email,
            });

            console.log(response.data.message)


        } catch (error) {
            console.error('Error submitting data:', error);

        }
    }

    return (
        <Box className='form-container'>
            {/* Log in title */}
            <Box sx={{ marginBottom: '4vh' }}>
                <Typography variant='p' className='title'>
                    Log in
                </Typography>
            </Box>

            {/* User form */}
            <form onSubmit={handleSubmit} className='inputs-container'>
                {/* Email input */}
                <Box mb={2}>
                    <TextField
                        className='input'
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
                {/* Password input */}
                <Box mb={2}>
                    <TextField
                        className='input'
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
                {/* Forgot password button */}
                <Box className='forgot-btn-container'>
                    <button className='forgot-btn'>
                        Forgot password?
                    </button>
                </Box>
                {/* Log in button */}
                <Box className='log-in-btn-container'>
                    <button
                        className='log-in-btn'
                        type='submit'
                        disabled={formData.password === '' || formData === '' || disableBtns ? true : false}
                    >
                        Log in
                    </button>
                </Box>



            </form>

            {/* Alternative log in methods - google and facebook */}
            <AltLogin disableBtns={disableBtns}/>

            <Box className='register-container'>
                <p className='register-text'>Have no account yet?</p>
            </Box>
            
            {/* Register button */}
            <Box className='register-btn-container'>
                <button className='register-btn' onClick={handleRegister} disabled={disableBtns}>
                    Register
                </button>
            </Box>

        </Box>
    )
}

export default Form