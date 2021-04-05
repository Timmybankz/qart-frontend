import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SharedStepper from './Stepper';
import { SecondStep, FirstStep, ThirdStep } from './Steps';
import http from '../service/httpService';

function Checkout({ cartTotal }) {
    
    const [state, setState] = React.useState({
        activeStep: 0,
        hasLoan: 'no',
        shoppingCredit: 0,
        minPayable: 0,
        monthlyInstl: 0,
        displayedShoppingCredit: '',
        displayedMinPayable: '',
        displayedMonthlyInstl: '',
        salary: 0,
        clicked: false
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [selectedDate, setDate] = React.useState(new Date().now);
    const [careerId, setCareer] = React.useState(1);
    const [tenure, setTenure] = React.useState(1);
    const [placeholderAmount, setAmount] = React.useState(0);
    const [refresh, setRefresh] = React.useState(false);
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    useEffect(() => {
        initializeMin();
    }, []);

    const handleNext = () => {
        // if (activeStep === 0 && !clicked) {
        //     initializeMin();
        // }

        if (activeStep === 1 && formSubmitted)
            return submitForm();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
        userObj.displayedShoppingCredit = addCommas(userObj.shoppingCredit);
        userObj.displayedMonthlyInstl = addCommas(userObj.monthlyInstl);
        userObj.displayedMinPayable = addCommas(userObj.minPayable)
    }

    const handleTenureChange = (id) => {
        setTenure(id);
        let userObj = state;
        const interest = (0.04 * state.shoppingCredit);

        const MonthlyPayment = Math.floor(( state.shoppingCredit/id) + interest);
        userObj.monthlyInstl = MonthlyPayment;
        userObj.displayedMonthlyInstl = addCommas(userObj.monthlyInstl);
        setState(userObj);
    }

    const updateBreakdown = () => {
        let userObj = state;
        userObj.minPayable = parseInt(placeholderAmount);
        userObj.shoppingCredit = (cartTotal - state.minPayable);

        const interest = (0.04 * state.shoppingCredit);
        userObj.monthlyInstl = Math.floor(((state.shoppingCredit)/tenure) + interest);
        userObj.displayedShoppingCredit = addCommas(userObj.shoppingCredit);
        userObj.displayedMonthlyInstl = addCommas(userObj.monthlyInstl);
        userObj.displayedMinPayable = addCommas(userObj.minPayable);
        setRefresh(!refresh);
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

        http.postCustomerRequest(data)
            .then(res => {
                // http.successToast(res.data);
                setFormSubmitted(true);
                handleNext();
            })
            .catch((err) => {
                http.errorToast(err.response.data)
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
                        activeStep === 1 ?
                            <SecondStep
                                tenure={tenure}
                                handleTenureChange={handleTenureChange}
                                state={state}
                                refresh={refresh}
                                cartTotal={cartTotal}
                                handleChange={handleChange}
                                placeholderAmount={placeholderAmount}
                                handleAmountChange={handleAmountChange}
                                updateBreakdown={updateBreakdown}
                            /> :
                            <ThirdStep
                                handleReset={handleReset}
                            />
                )
            }
            <Grid>
                { activeStep < 2 ?  
                     <Button variant="outlined" className={"outlined-btn"} 
                        onClick={handleNext} color="secondary" disabled={state.salary < 1000 || !selectedDate || loading}>
                        Continue
                    </Button> : ''
                }
            </Grid>
        </div>
    );
}

export default Checkout;


// const numberFormat = (value) => {
//   return new Intl.NumberFormat('en-IN').format(value);
// }

const addCommas = (num) => {
    const str = num.toString().split('.');
    if (str[0].length >= 4) {
        //add comma every 3 digits befor decimal
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    /* Optional formating for decimal places
    if (str[1] && str[1].length >= 4) {
        //add space every 3 digits after decimal
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }*/
    return str.join('.');
}