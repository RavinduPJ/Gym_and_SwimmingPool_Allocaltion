// import React from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

// const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });
const data = ['5.30 AM', '6.30 AM', '7.30 AM', '4.30 PM', '5.30 PM', '6.30 PM', '7.30 PM', '8.30 PM']

const SPRegistreationForm = () => {

  return (
    <div>
      <h3>Swimming Pool Time Allocation Form</h3>
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
          id="date"
          label="Birthday"
          type="date"
          defaultValue=""
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField
          required
            id="outlined-time"
            label="Booking Time Slot"
            placeholder='Booking Time Slot'
          />
        </div>
      </Box>
      <div className='center'>
            <Grid container spacing={2} justifyContent="center">
            {[lightTheme].map((theme, index) => (
                <Grid item xs={10} key={index}>
                <ThemeProvider theme={theme}>
                    <Box
                    sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        display: 'grid',
                        gridTemplateColumns: { md: '1fr 1fr' },
                        gap: 2,
                    }}
                    >
                    {data.map((elevation) => (
                        <Item key={elevation} elevation={4}>
                        {`${elevation}`}
                        </Item>
                    ))}
                    </Box>
                </ThemeProvider>
                </Grid>
            ))}
            </Grid>


        </div>  
    </div>
  )
}

export default SPRegistreationForm;