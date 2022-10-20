// import React from 'react'
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import axios from 'axios';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
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
// const data = ['5.30 AM', '6.30 AM', '7.30 AM', '4.30 PM', '5.30 PM', '6.30 PM', '7.30 PM', '8.30 PM']

const GymRegistreationForm = () => {

  //state variables
  const [username, setUserName] = useState("");
  const [epfnumber, setEPFNumber] = useState("");
  const [email, setEmail] = useState("");
  const [bookingdate, setBookingDate] = useState("");
  const [bookingtimeslot, setBookingTimeSlot] = useState("");

  const [timeslots, setTimeSlots] = useState([]);
  
  const getAllTimeSlots = async () => {
    const timedata = await axios.get("http://localhost:5000/timeslot/api/gettimeslots");
    setTimeSlots(timedata.data.timeSlots);
    // console.log(timedata);
  }

  const testingfun = (id) => {
    setBookingTimeSlot(id);
  }
  
  const warningAlert = () => {
    // <Alert severity="warning">
    //   <AlertTitle>Warning</AlertTitle>
    //     The data you filled will be clear — check it out!
    // </Alert>
    alert("The data will be erased - It cannot be recoverable")
    window.location.reload();
  }
  
  useEffect(() => {
    getAllTimeSlots();
  }, [])
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
            disabled
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
                    {timeslots.map((elevation) => (
                        <Item key={elevation.SlotId} elevation={6} onClick={() => {testingfun(elevation.TimeSlot)}}>
                          {`${elevation.TimeSlot}`}
                        </Item>
                    ))}
                    </Box>
                </ThemeProvider>
                </Grid>
            ))}
            </Grid>
        </div>  
        <center>
          <Stack direction="row" spacing={37} justifyContent="center">
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={
              () => {
                warningAlert()
              }
            }>
              Clear
            </Button>
            <Button variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </Stack>
        </center>
    </div>
  )
}

export default GymRegistreationForm;