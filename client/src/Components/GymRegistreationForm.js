// import React from 'react'
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import { Link } from '@mui/material';

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

const GymRegistreationForm = () => {

  //state variables
  const [username, setUserName] = useState("");
  const [epfnumber, setEPFNumber] = useState("");
  const [email, setEmail] = useState("");
  const [bookingdate, setBookingDate] = useState("");
  const [bookingtimeslot, setBookingTimeSlot] = useState("");

  const testingfun = (id) => {
    setBookingTimeSlot(id);
  }
  
  return (
    <div>
      <h3>Gym Time Allocation Form</h3>
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
            value={username}
            onChange={e => setUserName(e.target.value)}
          />
          <TextField
          required
            id="outlined-number"
            label="EPF Number"
            placeholder='EPF Number'
            value={epfnumber}
            onChange={e => setEPFNumber(e.target.value)}
          />
          <TextField
          required
            id="outlined-email"
            label="Email"
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
          id="date"
          label="Booking Date"
          type="date"
          value={bookingdate}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => setBookingDate(e.target.value)}
          />
          <TextField
          required
            id="outlined-time"
            label="Booking Time Slot"
            placeholder='Booking Time Slot'
            value={bookingtimeslot}
            onChange={e => setBookingTimeSlot(e.target.value)}
          />
        </div>
        <div>
          <h4>Available Time Slots</h4>
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
                        <Item key={elevation} elevation={4} onClick={() => {testingfun(elevation)}}>
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

export default GymRegistreationForm;