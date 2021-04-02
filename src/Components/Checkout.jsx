import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SharedStepper from './Stepper';
import { SecondStep, FirstStep } from './Steps';
import { postCustomerRequest, successToast, errorToast } from '../service/httpService';

function Checkout({ cartTotal }) {
    
    const [state, setState] = React.useState({
        activeStep: 0,
        hasLoan: 'no',
        shoppingCredit: 0,
        minPayable: 0,
        monthlyInstl: 0,
        salary: 0,
        clicked: false
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [selectedDate, setDate] = React.useState(new Date().now);
    const [careerId, setCareer] = React.useState(1);
    const [tenure, setTenure] = React.useState(1);
    const [placeholderAmount, setAmount] = React.useState(0);

    useEffect(() => {
        initializeMin();
    }, []);

    const handleNext = () => {
        // if (activeStep === 0 && !clicked) {
        //     initializeMin();
        // }

        if (activeStep > 0)
            return submitForm();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (event) => {
        const userObj = { ...state, [event.target.name]: event.target.value };
        setState(userObj);
    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const initializeMin = () => {
        let userObj = state;
        userObj.minPayable = (0.3 * cartTotal);
        setAmount(userObj.minPayable);
        userObj.shoppingCredit = (cartTotal - state.minPayable);

        const interest = (0.04 * state.shoppingCredit);
        userObj.monthlyInstl = Math.floor(((state.shoppingCredit)/tenure) + interest);
        setState(userObj);
        console.log(state);
    }

    const handleTenureChange = (id) => {
        setTenure(id);
        let userObj = state;
        const interest = (0.04 * state.shoppingCredit);

        userObj.monthlyInstl = Math.floor(( state.shoppingCredit/tenure) + interest);
        setState(userObj);
    }

    const updateBreakdown = () => {
        let userObj = state;
        userObj.minPayable = parseInt(placeholderAmount);
        userObj.shoppingCredit = (cartTotal - state.minPayable);

        const interest = (0.04 * state.shoppingCredit);
        userObj.monthlyInstl = Math.floor(((state.shoppingCredit)/tenure) + interest);
        setState(userObj);
    }

    const submitForm = () => {
        
        setLoading(true);
        const data = {
            loanTenure: tenure,
            careerId: careerId,
            payDate: selectedDate,
            totalCost: cartTotal,
            hasLoan: state.hasLoan,
            shoppingCredit: state.shoppingCredit,
            minPayable: state.minPayable,
            monthlyInstl: state.monthlyInstl,
            salary: state.salary
        }

        console.log(data);

        postCustomerRequest(data)
            .then(res => {
                successToast(res.data);
            })
            .catch((err) => {
                errorToast(err.response.data)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="text-center">
            <SharedStepper handleBack={handleBack} activeStep={activeStep} />
            { activeStep === 0 ? 
                (
                    <FirstStep
                        state={state}
                        handleChange={handleChange}
                        selectedDate={selectedDate}
                        setDate={setDate}
                        careerId={careerId}
                        setCareer={setCareer}
                    />
                ) : (
                    <SecondStep
                        tenure={tenure}
                        handleTenureChange={handleTenureChange}
                        state={state}
                        handleChange={handleChange}
                        placeholderAmount={placeholderAmount}
                        handleAmountChange={handleAmountChange}
                        updateBreakdown={updateBreakdown}
                    />
                )
            }
            <Grid>
                <Button variant="outlined" className={"outlined-btn"} 
                    onClick={handleNext} color="secondary" disabled={state.salary < 1000 || !selectedDate || loading}>
                    Continue
                </Button>
            </Grid>
        </div>
    );
}

export default Checkout;
