import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DoctorReg from '../DoctorReg/DoctorReg';
import PatientReg from '../PatientReg/PatientReg';
import { Card, Container } from '@mui/material';

function TabPanel(props) {


  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Register() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const boxSX = {
    "&:focus": {
      backgroundColor: "white",
      borderRadius: '30px',
      color: 'black'
    }
  };

  return (
    <Card sx={{
      minWidth: 300,
      maxWidth: '100vw',
      background: 'rgb(45, 225, 240)',
      marginTop: '50px',
      borderRadius: '5px',
      backgroundColor: 'white',
    }}  >

      <Container fixed >
        <Box >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
            sx={{
              backgroundColor: '#e6ecf0',
              borderRadius: '100px',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }} >
            <Tab label="Patient" {...a11yProps(0)} sx={boxSX} />
            <Tab label="Doctor" {...a11yProps(1)} sx={boxSX} />
          </Tabs>
        </Box>
        {/* for patient */}
        <TabPanel value={value} index={0}>
          <PatientReg />
        </TabPanel>
        {/* for doctor */}
        <TabPanel value={value} index={1}>
          <DoctorReg />
        </TabPanel>
      </Container>
    </Card>
  );
}
