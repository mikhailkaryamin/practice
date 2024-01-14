import React, { useEffect, useState, } from "react";
import { Grid, Typography, } from "@mui/material";
import Box from "@mui/material/Box";
import "./Appointment.css";
import { useParams } from "react-router-dom";

const Appointment = () => {
  const {email} = useParams();
  const [doctorInfo, setDoctorInfo] = useState([])
  useEffect(()=>{
    fetch(`http://localhost:3001/doctors/${email}`)
    .then(res => res.json())
    .then(data => setDoctorInfo(data[0]))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Box
        sx={{ background: "#fff", height:{md:'80vh', lg:'80vh', xs:'100%',sm:'100%'},}}
        style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <form onSubmit={handleSubmit} className="text-center" >
          <Box className="appointment" sx={{ paddingTop:{md:'5rem', lg:'5rem'} }}>
            <Typography variant="h6" style={{ padding: "2rem 0", marginTop: "-1rem" }}>Запись к врачу выбрана</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Доктор</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{background:'#6D67E4', borderRadius:'3px',color:'#fff'}}>{doctorInfo.name}</Typography> 
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{my:2}}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6"sx={{marginLeft:{md:'-3rem'}}}>Плата за посещение</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{background:'#6D67E4', borderRadius:'3px',color:'#fff'}}>{doctorInfo.fee}</Typography> 
              </Grid>
            </Grid>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} >
            <Typography variant="h6">Дата</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{mt:2}} >
              <Typography variant="h6" sx={{background:'#6D67E4', width:'98%', margin:'0 auto', borderRadius:'3px',color:'#fff'}}>{doctorInfo.time}</Typography> 
            </Grid>
          </Grid>
          <hr style={{marginTop:"2rem", width:'80%'}}/>
        </form>
      </Box>
  )
}

export default Appointment