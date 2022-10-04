import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const CheckoutStepper = (props) => {
  const {activeStep} = props
  return (
    <Stepper activeStep={activeStep}>
      <Step>
        <StepLabel>Escoge Bateria</StepLabel>
      </Step>
      <Step>
        <StepLabel>Ingresa Direccion</StepLabel>
      </Step>
      <Step>
        <StepLabel>Confirma tu orden</StepLabel>
      </Step>
    </Stepper>
  );
};

export default CheckoutStepper;
