// import React from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const RegistreationForm = () => {
  return (
    <div>
      RegistreationForm
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Username"
            placeholder='Username'
            defaultValue=""
          />
          <TextField
          required
            id="outlined-number"
            label="EPF Number"
            placeholder='EPF Number'
          />
          <TextField
          required
            id="outlined-email"
            label="Email"
            placeholder='Email'
          />
          <TextField
          required
            id="outlined-date"
            label="Booking Date"
            placeholder='Booking Date'
            defaultValue=''
          />
          <TextField
          required
            id="outlined-time"
            label="Booking Time Slot"
            placeholder='Booking Time Slot'
          />
        </div>
      </Box>  
    </div>
  )
}

export default RegistreationForm