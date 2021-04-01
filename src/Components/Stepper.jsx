import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import StepLabel from '@material-ui/core/StepLabel';
import '../Styles/Styles.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

function getSteps() {
  return [0, 1, 2, 3];
}

export default function SharedStepper({ activeStep, handleBack }) {

    const classes = useStyles();
    const steps = getSteps();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid className="mx-auto" item xs={3}>
                    { activeStep === 1? 
                        <Button className="mx-auto" onClick={handleBack} startIcon={<KeyboardBackspaceIcon/>}>
                            Back
                        </Button>: ''
                    }
                </Grid>
                <Grid item xs={6}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel></StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                </Grid>
                <Grid className="mx-auto" item xs={3}>
                </Grid>
            </Grid>
            
        </div>
    );
}
