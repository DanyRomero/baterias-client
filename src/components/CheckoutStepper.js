import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const CheckoutStepper = (props) => {
  const {activeStep} = props
  return (
    <Stepper activeStep={activeStep}>
      <Step>
        <StepLabel>Escoge tu Bateria</StepLabel>
      </Step>
      <Step>
        <StepLabel>Prográmala y confírmala</StepLabel>
      </Step>
      <Step>
        <StepLabel>Recíbela en hasta 24hrs</StepLabel>
      </Step>
    </Stepper>
  );
};

export default CheckoutStepper;
