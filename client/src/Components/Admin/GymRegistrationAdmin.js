import React, {useEffect, useState, useRef} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { DownloadTableExcel } from 'react-export-table-to-excel';

export default function GymRegistreationAdmin() {

    const [users, setUsers] = useState([]);
    const [date, setDate] = useState("");
    const tableRef = useRef(null);

    // console.log(users.filter(user => user.bookingdate.includes(date)));

    const getallusers = async () => {
        const result = await axios.get("http://localhost:5000/getall");
        console.log(result.data);
        setUsers(result.data); 
    }

    const clearFilter = () => {
        window.location.reload();
    }

    useEffect(() => {
        getallusers();
    }, [])

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
      noValidate
      autoComplete="off"
    >
        <Button variant="outlined" size="large" sx={{marginTop: 0.5}} onClick={() => {clearFilter()}}>
            Clear Filter
        </Button>
        <TextField
          id="date"
          label="Booking Date"
          type="date"
          value={date}
          size="small"
          sx={{ width: 220 }}
          InputLabelProps={{
              shrink: true,
            }}
          onChange={e => setDate(e.target.value)}
          />
        <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >
                <Button variant="contained" size="large" sx={{marginTop: 0.5}} color="success" startIcon={<TextSnippetIcon/>}>
                Export excel
                </Button>
        </DownloadTableExcel>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table"  ref={tableRef}>
            <TableHead>
            <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">EPF Number</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Booking Date</TableCell>
                <TableCell align="right">Booking Time</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.filter(user => user.bookingdate.includes(date)).map((row) => (
                <TableRow
                key={row.epfnumber}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.username}
                </TableCell>
                <TableCell align="right">{row.epfnumber}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.bookingdate.split('T')[0]}</TableCell>
                <TableCell align="right">{row.timeslot_value}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
  );
}
