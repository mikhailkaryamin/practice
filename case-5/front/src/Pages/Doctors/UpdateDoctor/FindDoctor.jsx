import { ElevatorSharp } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './style.css'

const FindDoctor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [ifSearched, setIfSearched] = useState(false);
  console.log(doctors);

  useEffect(() => {
    fetch("http://localhost:3001/approvedDoctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setIfSearched(false);
  };

  const handleSearch = () => {
    if (searchTerm === "") {
      return alert("Please enter a valid name to search");
    } else {
      const filteredNames = doctors.filter((doctor) => {
        return doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredNames(filteredNames);
      setIfSearched(true);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredNames([]);
    setIfSearched(false);
  };


  return (
    <div style={{ height: "100%", background: '#fff', padding: '20px' }}>
      <input
        type="text"
        placeholder="Поиск доктора по имени"
        value={searchTerm}
        onChange={handleChange}
        className="input-button"
      />

      {
        ifSearched == false && filteredNames.length == 0 &&
        <button onClick={handleSearch} className="search-button">Поиск</button>
      }
      {ifSearched && filteredNames.length === 0 ? (
        <div>
          <h3>Нет докторов с таким именем</h3>
          <button onClick={handleReset} className="search-button">Сброс</button>
        </div>
      ) : (
        <ul>
          {filteredNames.map((doctor) => (
            <Grid key={doctor._id} container spacing={2} sx={{ mt: 4, pb: 4, borderBottom: "1px solid #ccc" }}>
              <Grid
                item
                xs={4}
                md={4}
                lg={4}
                sx={{ borderRight: "1px solid #ccc", pb: 10 }}
              >
                {/* image and name with speciality */}
                <img
                  src={`data:image/png;base64,${doctor.image}`}
                  alt="doctor Image"
                  style={{ width: "80%", height: "80%", borderRadius: "50%" }}
                />

                <Typography component="h1" variant="h5" sx={{ my: 1 }}>
                  {doctor.name.toUpperCase()}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {doctor.specialist}
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                md={8}
                lg={8}
                sx={{ textAlign: "left", textTransform: 'uppercase' }}
              >
                <Box sx={{ pl: 4 }}>
                  <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
                    Имя : {doctor.name}
                  </Typography>
                  <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
                    Телефон : {doctor.phone}
                  </Typography>
                  <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
                    Цена : {doctor.fee}
                  </Typography>
                  <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
                    Образование : {doctor.degrees}
                  </Typography>
                  <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
                    Зарплата : {doctor.salary}
                  </Typography>
                  <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
                    Время : {doctor.time}
                  </Typography>
                  <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
                    Пол : {doctor.gender}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FindDoctor;


