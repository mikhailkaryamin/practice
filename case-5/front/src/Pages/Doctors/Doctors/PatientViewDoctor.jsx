import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function PatientViewDoctor() {
  const fetchApprovedDoctors = async () => {
    let response = await fetch("http://localhost:3001/approvedDoctors")
    console.log('fetching data...')
    const data = await response.json()
    return data;
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['approvedDoctors'],
    queryFn: fetchApprovedDoctors,
  })
  if (isLoading) {
    return <span>Загрузка докторов</span>
  }

  if (isError) {
    return <span>Ошибка загрузки</span>
  }

  return (
    <TableContainer component={Paper}>
      {
        <Typography Typography variant="h6" sx={{ my: 3 }}>
          Всего докторов: {data?.length}
        </Typography>
      }
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ padding: "20px 0" }}>
              Имя
            </TableCell>
            <TableCell align="center">Специальность</TableCell>
            <TableCell align="center">Доступность</TableCell>
            <TableCell align="center">Цена</TableCell>
            <TableCell align="center">Телефон</TableCell>
            <TableCell align="center">Пол</TableCell>
            <TableCell align="center">Записаться на прием</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((doctorData) => (
            <TableRow
              key={doctorData.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ borderRight: "1px solid #ccc" }}
              >
                {doctorData.name}
              </TableCell>
              <TableCell align="center" style={{ borderRight: "1px solid #ccc" }}>{doctorData.specialist}</TableCell>
              <TableCell align="center">{doctorData.time}</TableCell>
              <TableCell align="center">{doctorData.fee}</TableCell>
              <TableCell align="center">{doctorData.phone}</TableCell>
              <TableCell align="center">{doctorData.gender}</TableCell>
              <TableCell align="center">
                <NavLink to={`/addPatient/${doctorData.email}`}>
                  <input
                    style={{
                      color: "#fff",
                      background: "#000",
                      padding: "5px 10px",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#224B0C",
                    }}
                    id="submit"
                    type="submit"
                    name="appointment"
                    value="Запись на прием"
                  />
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}
