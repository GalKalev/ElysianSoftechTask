
import React from 'react';
import './App.css'

// MUI imports
import Box from '@mui/material/Box';

// Components Import
import Form from './components/Form';
import Welcome from './components/Welcome';

function App() {

  return (
    <main >
      <Box className='log-in-container'>
        <Welcome />
        <Form />
      </Box>

    </main>
  );
}

export default App;
