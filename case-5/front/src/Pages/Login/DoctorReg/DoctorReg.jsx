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

const DoctorReg = () => {
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
    formData.append("approved", false);
    fetch("http://localhost:3001/doctors", {
      method: "POST",
      body: formData, 
    })
      .then((res) => res.json())
      .then((success) => {
        if (success) {
          alert("Успешно зарегистрирован");
        }
      });
  };

  return (
    <Box
      style={{
        border: "2px solid #ccc",
        padding: "1rem 1rem",
        background: "#fff",
        borderRadius: "10px",
      }}
    >
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
          {/* Add Name */}
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
          {/* Email */}
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
          {/* Phone */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Телефон</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Введите номер"
              name="phone"
              required
              fullWidth
            />
          </Grid>
          {/* Fees */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Цена</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Установите цену"
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
              label="Установите возраст"
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
          {/* Degrees */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Выберите образование</Typography>
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
                  <em>Вы можете выбрать множество </em>
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

          {/* available date */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Доступное время</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Eg: 8pm-10pm"
              name="time"
              required
              fullWidth
            />
          </Grid>
          {/* Joining date */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Дата присоединения</Typography>
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
              <FormControlLabel value="male" control={<Radio />} label="Male" />

              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Grid>
          {/* add image */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Добавить фото</Typography>
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
            <Typography variant="OVERLINE TEXT">Резюме</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
              <Button variant="outlined" color="error" type="reset">
                Сброс
              </Button>
              <Chip
                label="OR"
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

export default DoctorReg;
