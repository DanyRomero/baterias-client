import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckBoxHours from './CheckBoxHours'



const ScheduleForm = () => {
  const [hour, setHour] = useState("")
  return (
    <Container>
      <form onSubmit={()=> handleZipCode(zipCode)}>
        <Stack p={5} spacing={3}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            Selecciona un horario para tu entrega
          </Typography>
          <CheckBoxHours/>
        </Stack>
      </form>
    </Container>
  )
}

export default ScheduleForm