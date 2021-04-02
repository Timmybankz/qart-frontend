import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CalenderCard from '../Common/CalendarCard';
import maleImage from '../assets/better-man.jpg';
import ladyImage from '../assets/lady-working.jpg';
import companyImage from '../assets/offices.jpg';
import '../Styles/Styles.css';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    flex: {
        flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(3),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
    right: {
        textAlign: 'left',
        paddingLeft: 20
    }
}));


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
      />
    );
}

export function FirstStep({ state, handleChange, careerId, setCareer, selectedDate, setDate }) {

    const classes = useStyles();

    const isActive = (value) => {
        return 'link h-container ' + ((value === careerId) ?'link-active':'');
    }

    return (
        <div className="text-center">
            <p>What Do You Do?</p>
            <Grid container justify="center" spacing={2}>
                {careerType.map(career => (
                    <Grid item key={career.id} onClick={() => setCareer(career.id)}>
                        <div className={isActive(career.id)}>
                            <div className="card larger mx-auto">
                                <img src={career.img} alt="Avatar" className="img" />
                            </div>
                            <span>{career.comment}</span>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <Grid>
                <p>How much do you get paid monthly?</p>
                <FormControl className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount" color="secondary">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={state.amount}
                        color="primary"
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                        labelWidth={60}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            color="secondary"
                            id="date-picker-dialog"
                            label="What is your next salary date?"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={setDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid>
                <p>Do you have any existing loan(s)?</p>
                <Paper className="w48 mx-auto p-10">
                    <RadioGroup row aria-label="hasLoan" name="hasLoan" value={state.hasLoan} onChange={handleChange}>
                        <FormControlLabel className="mx-auto purple" color="secondary" value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel className="mx-auto purple" color="secondary" value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </Paper>
            </Grid>
        </div>
    );
}

export function SecondStep({ state, handleChange, tenure, updateBreakdown,
        handleTenureChange, handleAmountChange, placeholderAmount }) {

    const classes = useStyles();

    const isActive = (value, cssClass) => {
        return cssClass + ((value === tenure) ?' calender-card-focus':'');
    }

    useEffect(() => {

    }, [state]);

    return(
            <Grid className={classes.margin}>
                <h3>Choose yoor plan</h3>
                <Grid container spacing={0}>
                    {calender.map(calObj => (
                        <Grid item key={calObj.id} onClick={() => handleTenureChange(calObj.id)}>
                            <CalenderCard calObj={calObj} isActive={isActive} />
                        </Grid>
                    ))}
                </Grid>
                <h3>Payment Breakdown</h3>
                <div className="summary">
                    <div className="row">
                        <div className="column cOne">
                            <ul className="o-list">
                                <li>Shopping Credit</li>
                                <li>Down Payment</li>
                                <li>Monthly Installment</li>
                                <li>Tenure</li>
                            </ul>
                        </div>
                        <div className="column cTwo">
                            <div className="cTwoo">
                                <ul className="o-list">
                                    <li><strong>{`₦ ${addCommas(state.shoppingCredit)}`}</strong></li>
                                    <li><strong>{`₦ ${addCommas(state.minPayable)}`}</strong></li>
                                    <li><strong>{`₦ ${addCommas(state.monthlyInstl)}`}</strong></li>
                                    <li><strong>{tenure} {tenure < 2 ? 'Month': 'Months' }</strong></li>
                                </ul>
                            </div>
                        </div>
                        <div className="column cThree">
                            <div className="cThreee">
                                <p className="white f-12 mx-10 mt-10">Customize Down Payment</p>
                                <FormControl className={classes.margin}>
                                    {/* <InputLabel htmlFor="outlined-adornment-amount" color="secondary">Amount</InputLabel> */}
                                    <OutlinedInput
                                        value={placeholderAmount}
                                        color="primary"
                                        name="minPayable"
                                        className="inputBox"
                                        onChange={handleAmountChange}
                                        startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                        labelWidth={0}
                                        type="number"
                                    />
                                </FormControl>
                                <Grid>
                                    <Button variant="outlined" className={"white btn-outline"} disabled={state.minPayable > placeholderAmount} onClick={updateBreakdown}>
                                        Update Breakdown
                                    </Button>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
    );
}

const calender = [
    { id: 1, comment: 'Aggresive', cssClass: 'calender-card reddish' },
    { id: 2, comment: 'Stretching', cssClass: 'calender-card purplish' },
    { id: 3, comment: 'Focused', cssClass: 'calender-card bluish' },
    { id: 4, comment: 'Casual', cssClass: 'calender-card limesh' },
    { id: 5, comment: 'Mild', cssClass: 'calender-card goldish' },
    { id: 6, comment: 'Gentle', cssClass: 'calender-card greenish' }
];

const careerType = [
    { id: 1, comment: 'Paid Employment', img: maleImage },
    { id: 2, comment: 'Self Employed/Freelance', img: ladyImage },
    { id: 3, comment: 'Corporate Organization', img: companyImage }
];

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