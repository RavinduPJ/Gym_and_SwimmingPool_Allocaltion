//import React from 'react'
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import './Component.css';

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

export default function timeSlot() {
  return (
    <center>
        <div className='center'>
            <Grid container spacing={2}>
            {[lightTheme].map((theme, index) => (
                <Grid item xs={6} key={index}>
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
    </center>
  );
}