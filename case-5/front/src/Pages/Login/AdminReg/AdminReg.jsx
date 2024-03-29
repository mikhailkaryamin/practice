
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Card, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';


const AdminReg = () => {
  const [loginData,setLoginData] = useState({})
  const handleOnChange = e => {
    const feild = e.target.name;
    const value = e.target.value;
    console.log(feild, value)
    const newLoginData = { ...loginData }
    newLoginData[feild] = value;
    setLoginData(newLoginData);
}

  const handleLoginSubmit = e => {
    e.preventDefault();
}
  return (
    <div>
         
    <Container fixed >
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12} sm={12} >
        <Typography variant="h5" gutterBottom component="div" sx={{backgroundColor:'white'}}>
           Залогинен как админ
          </Typography>
          <form onClick={handleLoginSubmit}>
          <TextField
              sx={{width:'50%',m:1}}
              id="standard-basic"
              label="Ваш email"
              name='email'
              onChange={handleOnChange}
              variant="standard" />

            <TextField
              sx={{width:'50%',m:1}}
              id="standard-basic"
              label="Пароль"
              name='password'
              onChange={handleOnChange}
              variant="standard"
              type="password"  
            />  
             <Button
            sx={{ width: '50%', m: 1 }}
            varient="contained"
            type="submit"
            style={{
              backgroundColor: ' #e6ecf0',
              color: 'black'
            }}>Войти</Button>
           <Typography>----------или----------</Typography>
            <GoogleIcon 
            sx={{ width: '50%', m: 1 }}
            varient="contained"
            type="submit"
            style={{
            color: 'linear-gradient(to right bottom,(2, 89, 87, 0),(234, 67, 53))'
            }}
            ></GoogleIcon>
          </form>
        </Grid>
      
      </Grid>
    </Box>
    </Container>
       
  
    </div>
  )
}

export default AdminReg