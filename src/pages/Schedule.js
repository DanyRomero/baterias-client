import { Box, Grid } from '@mui/material'
import React from 'react'
import CheckoutStepper from '../components/CheckoutStepper'
import Footer from '../components/Footer'
import Map from '../components/Map'
import ScheduleForm from '../components/ScheduleForm'
import WhatsApp from '../components/WhatsApp'

const Schedule = () => {
  return (
    <>
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid item xs={12} md={5}>
        <Box sx={{ p: 5 }}>
          <CheckoutStepper activeStep={1} />
        </Box>
        <ScheduleForm />  
      </Grid>
      <Grid item xs={12} md={7}>
        <Map />
      </Grid>
    </Grid>
    <Footer />
    <WhatsApp />
  </>
  )
}

export default Schedule