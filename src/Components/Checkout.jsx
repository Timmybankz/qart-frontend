import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SharedStepper from './Stepper';
import { SecondStep, FirstStep } from './Steps';

function Checkout(props) {
    
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedDate, setSelectedDate] = React.useState(new Date().now);
    const [amount, setAmount] = React.useState(0);
    const [hasLoan, setLoanChange] = React.useState('');

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const handleLoanChange = (event) => {
        setLoanChange(event.target.value);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(selectedDate);
    };

    return (
        <div className="text-center">
            <SharedStepper handleBack={handleBack} activeStep={activeStep} />
            { activeStep === 0 ? 
                (
                    <FirstStep
                        handleDateChange={handleDateChange} 
                        selectedDate={selectedDate}
                        amount={amount}
                        setAmount={handleAmountChange}
                        hasLoan={hasLoan}
                        handleLoanChange={handleLoanChange}
                    />
                ) : (
                    <SecondStep
                        handleDateChange={handleDateChange} 
                        selectedDate={selectedDate}
                        amount={amount}
                        setAmount={handleAmountChange}
                        hasLoan={hasLoan}
                        handleLoanChange={handleLoanChange}
                    />
                )
            }
            <Grid>
                <Button variant="outlined" className={"outlined-btn"} onClick={handleNext} color="secondary">
                    Continue
                </Button>
            </Grid>
        </div>
    );
}

export default Checkout;
