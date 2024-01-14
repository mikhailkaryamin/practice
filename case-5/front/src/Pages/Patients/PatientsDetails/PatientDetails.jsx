import { Button, Grid } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PatientDetails.css';
import avater from '../../../utils/patient.png'
import { Box } from '@mui/system';
const PatientDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3001/patients/${id}`)
      .then(res => res.json())
      .then(data => setDetails(data))
  }, [id])

  return (
    <Box className='Container' sx={{ height: { xs: '100%', md: '80vh', display: 'grid', } }}>
      <p className='header'>Профиль</p>
      <Grid container spacing={2} columns={12} >
        <Grid xs={12} md={6} lg={4} sx={{ marginTop: '10px' }}>
          {details && <p>Имя: {details?.patientName}</p>}
          {details.image ? <img
            src={`data:image/png;base64,${details.image}`}
            alt="Patient Image"
            style={{ width: "300px", height: "200px", borderRadius: "3px" }}
          /> :
            <img src={avater} style={{ width: "300px", height: "320px" }} />
          }
        </Grid>
        <Grid xs={12} md={6} lg={8} display="flex" justifyContent="flex-start" alignItems="flex-end" sx={{ position: 'relative' }}>
          <Box style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingLeft: '20px',
            height: '88%',
          }}>
            <p>Телефон: {details?.phone}</p>
            <p>Возраст: {details?.age}</p>
            <p>Вес: {details?.weight}</p>
            <p>Адрес: {details?.address}</p>
            <p>Пол: {details?.gender}</p>
            <p>Группа крови: {details?.blood}</p>
            <p>История: {details?.medicalHistory}</p>

          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PatientDetails