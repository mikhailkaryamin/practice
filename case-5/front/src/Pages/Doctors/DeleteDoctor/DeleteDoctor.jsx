import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function DeleteDoctor() {
  const queryClient = useQueryClient();

  const fetchApprovedDoctors = async () => {
    let response = await fetch("http://localhost:3001/approvedDoctors")
    const data = await response.json()
    return data;
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ['approvedDoctors'],
    queryFn: fetchApprovedDoctors,
  })
  console.log(data)

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3001/doctors/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  };

  const { mutate } = useMutation(handleDelete, {
    onSuccess: () => {
      alert('Deleted doctor Successfully')
      // update the cache
      queryClient.refetchQueries(['approvedDoctors'])
    },
    onError: () => {
      console.log('Something went wrong')
    }
  })

  if (isLoading) {
    return <span>Loading doctors</span>
  }
  if(isError) {
    return <span>Internal server error</span>
  }
  if (!data) {
    return <span>No data available</span>
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ my: 3 }}>
        Число доступных докторов  : {data?.length}
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ padding: "20px 0" }}>
              Имя
            </TableCell>
            <TableCell align="center">Специалист</TableCell>
            <TableCell align="center">Доступность</TableCell>
            <TableCell align="center">Цена</TableCell>
            <TableCell align="center">Телефон</TableCell>
            <TableCell align="center">Пол</TableCell>
            <TableCell align="center">Удалить доктора</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((doctorData) => (
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
              <TableCell
                align="center"
                style={{ borderRight: "1px solid #ccc" }}
              >
                {doctorData.specialist}
              </TableCell>
              <TableCell align="center">{doctorData.time}</TableCell>
              <TableCell align="center">{doctorData.fee}</TableCell>
              <TableCell align="center">{doctorData.phone}</TableCell>
              <TableCell align="center">{doctorData.gender}</TableCell>
              <TableCell align="center">
                <input
                  style={{
                    color: "#fff",
                    background: "#000",
                    padding: "10px 15px",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "red",
                  }}
                  onClick={() => {
                    mutate(doctorData._id);
                  }}
                  id="submit"
                  type="submit"
                  name="delete"
                  value="Delete"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
