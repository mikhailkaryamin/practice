import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Card, TextField, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom'

const Login = () => {
  const [loginData, setLoginData] = useState({})
  const handleOnChange = e => {
    const feild = e.target.name;
    const value = e.target.value;
    console.log(feild, value)
    const newLoginData = { ...loginData }
    newLoginData[feild] = value;
    setLoginData(newLoginData);
  }

  return (

    <Card sx={{
      minWidth: 200,
      maxWidth: '100vw',
      height: '865px',
    }}
      xs={12} md={12} sm={12}>
      <Container fixed >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} >
            <Grid item xs={12} md={12} sm={12} sx={{ backgroundColor: 'white', borderRadius: '5px', marginTop: '15%', marginLeft: '14px' }}>
              <Typography variant="h5" gutterBottom component="div">
                Войти
              </Typography>
              <form >
                <TextField
                  sx={{ width: '50%', m: 1 }}
                  id="standard-basic-1"
                  label="Ваш email"
                  name='email'
                  variant="standard" />

                <TextField
                  sx={{ width: '50%', m: 1 }}
                  id="standard-basic-2"
                  label="Ваш пароль"
                  name='password'
                  variant="standard"
                  type="password"
                />
                <Button
                  sx={{ width: '50%', m: 1 }}
                  varient="contained"
                  type="submit"
                  style={{
                    backgroundColor: 'green',
                    color: 'white'
                  }}>Войти</Button>
                <Typography>-----------или-----------</Typography>
                <NavLink to='/registration' style={{
                  textDecoration: 'none',

                }}><Button sx={{ width: '50%', m: 1, background: '#F6FAFD' }} >Впервые у нас?</Button></NavLink>
              </form>
            </Grid>

          </Grid>
        </Box>
      </Container>
    </Card>

  )
}

export default Login