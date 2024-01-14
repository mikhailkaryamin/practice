import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Calender from "../../Shared/Calender/Calender";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const degreeList = ["МГУ", "ВГУ", "НГУ", "НГТУ", "ТюмГУ"];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddDoctor = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [date, setDate] = React.useState(new Date().toDateString());
  const [image, setImage] = useState(null);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("image", image);
    formData.append("created_at", date);
    formData.append("approved", true);
    fetch("http://localhost:3001/doctors", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((success) => {
        if (success) {
          alert("Doctor added successfully");
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
        <Button variant="contained">
          <NavLink
            to="/doctors"
            style={{ textDecoration: "none", width: "100%", color: "#fff" }}
          >
            Список докторов
          </NavLink>
        </Button>
      </Box>
      <hr></hr>
      <form onSubmit={handleSubmit}>
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
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Имя</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Введите имя"
              name="name"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Email</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Введите email"
              name="email"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Телефон</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Введите телефон"
              name="phone"
              required
              fullWidth
            />
          </Grid>
          {/* Fees */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Сборы</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Цена"
              name="fee"
              required
              fullWidth
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
              name="age"
              required
              fullWidth
            />
          </Grid>
          {/* Specialist */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Специальность</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Специальность"
              name="specialist"
              required
              fullWidth
            />
          </Grid>
          {/* Address */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Адрес</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Введите адрес"
              variant="standard"
              name="address"
              multiline
              rows={5}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Образование</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <Box>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                name="degrees"
                multiple
                value={personName}
                onChange={handleChange}
                variant="standard"
                fullWidth
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>Можно выбрать несколько степеней</em>
                </MenuItem>
                {degreeList.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Зарплата</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Введите зарплату"
              name="salary"
              // required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Доступное время</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Например с 8 до 10"
              name="time"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Время посещения</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-6.5rem" } }}>
            <Calender value={date} setValue={setDate} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Пол</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
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
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Добавить изображение</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>

            <Fab color="primary" aria-label="add">
              <input
                accept="image/*"
                type="file"
                onChange={(e) => setImage(e.target.files[0])} // <-- set the selected file as the image state
                name="image" // <-- make sure this matches the property name used in the data object
                alt="image-upload"

                style={{
                  opacity: 0,
                  cursor: "pointer",
                  zIndex: 1,
                  height: "55px",
                }}
              />
              <AddIcon
                style={{
                  position: "absolute",
                  top: 15,
                  left: 17,
                }}
              />
            </Fab>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Общее</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
              <Button variant="outlined" color="error" type="reset">
                Сброс
              </Button>
              <Chip
                label="или"
                color="secondary"
                style={{
                  marginLeft: "-.8rem",
                  marginRight: "-.8rem",
                  marginTop: ".1rem",
                }}
              />
              <Button variant="outlined" color="success" type="submit">
                Сохранить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddDoctor;
