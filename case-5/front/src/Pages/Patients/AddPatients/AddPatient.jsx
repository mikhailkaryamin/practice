import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Calender from "../../Shared/Calender/Calender";
import { useState } from "react";


const AddPatient = () => {
  const [packageName, setpackageName] = React.useState([]);
  const [date, setDate] = React.useState(new Date().toDateString()); // take only date not time

  const [file, setFile] = useState(null);
  const [prepscription, setPrepscription] = useState(null);
  const [error, setError] = useState(null);

  const types = ["application/pdf", "text/plain"];

  const changeHandler = (event) => {
    let selected = event.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
    }
  };

  const form = useRef(null);
  const handleReset = () => {
    let text = "Are you sure you want to reset?";
    if (window.confirm(text) == true) {
      form.current.reset();
    } else {
      console.log("cancelled");
    }
  };
  // get doctors email from url
  const url = window.location.href;
  const doctorEmail = url.substring(url.lastIndexOf("/") + 1);
  const [doctorInfo, setDoctorInfo] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/doctors/${doctorEmail}`)
      .then((res) => res.json())
      .then((data) => setDoctorInfo(data[0]));
  }, []);
  // form data submit
  // formData.append("file", file);
  // fetch("/upload", {
  //   method: "POST",
  //   body: formData,
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patientName = formData.get("name");
    const phone = formData.get("phone");
    const age = formData.get("age");
    const weight = formData.get("weight");
    // const SelectedPackage = packageName;
    const address = formData.get("address");
    const medicalHistory = formData.get("medicalHistory");
    const gender = formData.get("radio-buttons-group");
    const blood = formData.get("blood");
    const doctorName = doctorInfo.name;
    const doctorEmail = doctorInfo.email;
    const doctorPhone = doctorInfo.phone;
    const doctorFee = doctorInfo.fee;
    const data = {
      doctorName,
      doctorEmail,
      doctorPhone,
      doctorFee,
      patientName,
      phone,
      age,
      weight,
      address,
      medicalHistory,
      gender,
      blood,
      date,
    };

    fetch("http://localhost:3001/appoinments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((success) => {
        if (success) {
          alert("Appointment Created Successfully");
        }
      });
  };

  return (
    <Box
      style={{
        border: "2px solid #ccc",
        padding: "1rem 1rem",
        background: "#fff",
      }}
    >
      <Box style={{ display: "flex" }}>
        <Button variant="contained" sx={{ fontWeight: 700 }}>
          <NavLink
            to="/doctors"
            style={{ textDecoration: "none", width: "100%", color: "#fff" }}
          >
            Список докторов
          </NavLink>
        </Button>
        {/* Package button */}
        <Button
          variant="contained"
          sx={{ ml: 2, fontWeight: 700 }}
          color="warning"
        >
          <NavLink
            to="/packages"
            style={{ textDecoration: "none", width: "100%", color: "#fff" }}
          >
            Наши пакеты
          </NavLink>
        </Button>
        {/* selected doctor info button */}
        <Button
          variant="contained"
          sx={{ ml: 2, fontWeight: 700 }}
          color="success"
        >
          <NavLink
            to={`/appointment/${doctorEmail}`}
            style={{ textDecoration: "none", width: "100%", color: "#fff" }}
          >
            Информация о докторе
          </NavLink>
        </Button>
      </Box>
      <hr></hr>
      <form ref={form} onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: ".5rem 2rem",
            textAlign: "start",
          }}
        >
          {/* Add Name */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Имя пациента</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Имя пациента"
              required
              fullWidth
              name="name"
            />
          </Grid>
          {/* Phone */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Телефон</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Телефон"
              required
              fullWidth
              name="phone"
            />
          </Grid>
          {/* Age */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Возраст</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Возраст"
              required
              fullWidth
              name="age"
            />
          </Grid>
          {/* weight */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Вес</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Вес"
              // required
              fullWidth
              name="weight"
            />
          </Grid>
          
          {/* Appointment date */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Выберите дату</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              marginLeft: { md: "-6.5rem" },
              display: "flex",
              width: "100%",
            }}
          >
            <Calender value={date} setValue={setDate} />
          </Grid>
          {/* Address */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Адрес</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Введите ваш адрес"
              multiline
              rows={3}
              fullWidth
              name="address"
            />
          </Grid>
          {/* Medical History */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Медицинская история</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Опишите историю и симптомы"
              multiline
              rows={3}
              fullWidth
              name="medicalHistory"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Пол</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group-label"
              name="radio-buttons-group"
              required
            >
              <FormControlLabel value="male" control={<Radio />} label="Муж" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Жен"
              />
            </RadioGroup>
          </Grid>
          {/* Blood group */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Группа крови</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <RadioGroup
              row
              aria-labelledby="blood-label"
              name="blood"
              required
            >
              <FormControlLabel value="O+" control={<Radio />} label="O+" />
              <FormControlLabel value="O-" control={<Radio />} label="O-" />
              <FormControlLabel value="A+" control={<Radio />} label="A+" />
              <FormControlLabel value="A-" control={<Radio />} label="A-" />
              <FormControlLabel value="B+" control={<Radio />} label="B+" />
              <FormControlLabel value="B-" control={<Radio />} label="B-" />
              <FormControlLabel value="AB+" control={<Radio />} label="AB+" />
              <FormControlLabel value="AB-" control={<Radio />} label="AB-" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Резюме</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
              <Button variant="contained" color="error" onClick={handleReset}>
                Сбросить
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ ml: 2 }}
                type="submit"
              >
                Добавить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddPatient;
