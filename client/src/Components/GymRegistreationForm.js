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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
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

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  
  const getAllTimeSlots = async () => {
    const timedata = await axios.get("http://localhost:5000/timeslot/api/gettimeslots");
    setTimeSlots(timedata.data.timeSlots);
    // console.log(timedata);
  }

  //delay function
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const testingfun = (id) => {
    setBookingTimeSlot(id);
  }
  
  const warningAlert = async() => {
    setOpenInfo(true);
    await timeout(3000); //3s delay
    setOpenInfo(false);
    await timeout(1000); //1s delay
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
          <Collapse in={openError}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error" >
                <AlertTitle>Error</AlertTitle>
                  This is an error alert — <strong>check it out!</strong>
              </Alert>
            </Stack>
          </Collapse>
          <Collapse in={openInfo}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                    All the details will be deleted — <strong>check it out!</strong>
              </Alert>
            </Stack>
          </Collapse>
          <Collapse in={openSuccess}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                    You can Book this Time Slot — <strong>check it out!</strong>
              </Alert>
            </Stack>
          </Collapse>
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