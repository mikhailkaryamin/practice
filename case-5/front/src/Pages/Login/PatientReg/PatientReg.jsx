import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Card, TextField, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Gender from "../../Shared/Gender/Gender";

const PatientReg = () => {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const feild = e.target.name;
    const value = e.target.value;
    console.log(feild, value);
    const newLoginData = { ...loginData };
    newLoginData[feild] = value;
    setLoginData(newLoginData);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    alert('Successfully logged in!')
  };

  return (
    <div>
      <Container fixed>
        <Typography variant="h5" gutterBottom component="div">
          Регистрация как пациент
        </Typography>
        <Box>
          <form className="text-center" onSubmit={handleSignUpSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12}>
                <TextField
                  sx={{ width: "70%", m: 1 }}
                  id="standard-basic"
                  label="Имя"
                  name="name"
                  onChange={handleOnChange}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: "70%", m: 1 }}
                  id="standard-basic"
                  label="Адрес"
                  name="text"
                  onChange={handleOnChange}
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12}>
                <TextField
                  sx={{ width: "70%", m: 1 }}
                  id="standard-basic"
                  label="Ваш email"
                  name="email"
                  onChange={handleOnChange}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: "70%", m: 1 }}
                  id="standard-basic-1"
                  label="Ваше телефон"
                  name="email"
                  onChange={handleOnChange}
                  variant="standard"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12}>
                <TextField
                  sx={{ width: "70%", m: 1 }}
                  id="standard-basic"
                  label="Ваш пароль"
                  name="password"
                  onChange={handleOnChange}
                  variant="standard"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: "70%", m: 1 }}
                  id="standard-basic"
                  label="Подтвердите пароль"
                  name="password2"
                  onChange={handleOnChange}
                  variant="standard"
                  type="password"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12}>
                <Gender></Gender>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <div>{ error }</div> */}
              </Grid>
            </Grid>
            <Button
            sx={{ width: "30%", m: 3 }}
            varient="contained"
            type="submit"
            style={{
              backgroundColor: "green",
              color: "#fff",
            }}
          >
            Зарегистрироваться
          </Button>
          </form>
        </Box>
          {/* Go to login Page */}
        <NavLink to="/login" style={{
          textDecoration: 'none'
        }}>
          <Button sx={{ width: "100%", m: 1 }} color="inherit">
            Уже есть аккаунт? 
          </Button>
        </NavLink>
      </Container>
    </div>
  );
};

export default PatientReg;
