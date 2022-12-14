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
import MenuItem from '@mui/material/MenuItem';
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
  const [deptname, setDeptName] = useState("");
  const [dept_id, setDept_id] = useState("");
  const [bookingdate, setBookingDate] = useState("");
  const [bookingtimslotid, setBookingTimeSlotId] = useState("");
  const [bookingtimeslot, setBookingTimeSlot] = useState("");
  const [dept, setDept] = useState([]);

  const [timeslots, setTimeSlots] = useState([]);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openSuccessReg, setOpenSuccessReg] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  
  const getAllTimeSlots = async () => {
    const timedata = await axios.get("http://localhost:5000/getalltimeslots");
    setTimeSlots(timedata.data);
    // console.log(timedata.data);
  }

  const getAllDepartments = async () => {
    const deptdata = await axios.get("http://localhost:5000/getalldepartments");
    setDept(deptdata.data);
    console.log(deptdata.data);
  }

  const handleChange = (event) => {
    setDeptName(event.target.value);
  };

  //delay function
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const setTimeSlotfun = async (id) => {
    setBookingTimeSlot(id.timeslot_value);
    setBookingTimeSlotId(id.timeslot_id)

    await timeout(2000);
    checkTimeSlot();
  }
  
  //warning alert
  const warningAlert = async() => {
    setOpenInfo(true);
    await timeout(3000); //3s delay
    setOpenInfo(false);
    await timeout(1000); //1s delay
    window.location.reload();
  }

  //error alert
  const errorAlert = async() => {
    setOpenError(true);
    await timeout(3000); //3s delay
    setOpenError(false);
    await timeout(1000); //1s delay
  }
  
  //success alert
  const SuccessAlert = async() => {
    setOpenSuccess(true);
    await timeout(3000); //3s delay
    setOpenSuccess(false);
    await timeout(1000); //1s delay
  }

  //success alert
  const SuccessRegAlert = async() => {
    setOpenSuccessReg(true);
    await timeout(3000); //3s delay
    setOpenSuccessReg(false);
    await timeout(1000); //1s delay
  }

  const checkTimeSlot = async () => {

    const data = {
      bookingdate,
      bookingtimslotid
    }
    
    const result = await axios.post("http://localhost:5000/checktimeavailablitygym", data);
    console.log(result);

    if(result.data.status === 'available'){
      SuccessAlert();
    } else {
      errorAlert();
    }
  }

  //add user
  const adduser = async () => {
    
    const data = {
      username,
      email,
      epfnumber,
      dept_id,
      bookingdate,
      bookingtimslotid
    };

    console.log(data);
    const result = await axios.post("http://localhost:5000/addgymuser", data);
    // console.log(result.data.rowCount);
    allocatetime();
    if(result.data.rowCount === 1){
      SuccessRegAlert();
    } else {
      errorAlert();
    }
  }

const allocatetime = async () => {

  const data = {
    bookingdate,
    bookingtimslotid
  };

  await axios.post("http://localhost:5000/gymallocatetime", data);

}


  useEffect(() => {
    getAllTimeSlots();
    getAllDepartments();
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
          id="outlined-select-currency"
          select
          label="Select"
          value={deptname}
          onChange={handleChange}
          helperText="Please select your department"
        >
          {dept.map((option) => (
            <MenuItem key={option.dept_id} value={option.dept_name} onClick={() => {setDept_id(option.dept_id)}}>
              {option.dept_name}
            </MenuItem>
          ))}
          </TextField>
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
                  This is an error alert ??? <strong>check it out!</strong>
              </Alert>
            </Stack>
          </Collapse>
          <Collapse in={openInfo}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                    All the details will be deleted ??? <strong>check it out!</strong>
              </Alert>
            </Stack>
          </Collapse>
          <Collapse in={openSuccess}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                    You can Book this Time Slot ??? <strong>check it out!</strong>
              </Alert>
            </Stack>
          </Collapse>
          <Collapse in={openSuccessReg}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                    You have successfully registered ??? <strong>check it out!</strong>
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
                        <Item key={elevation} elevation={6} onClick={() => {setTimeSlotfun(elevation)}}>
                          {`${elevation.timeslot_value}`}
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
            <Button variant="contained" endIcon={<SendIcon />} onClick={() => {adduser()}}>
              Send
            </Button>
          </Stack>
        </center>
    </div>
  )
}

export default GymRegistreationForm;