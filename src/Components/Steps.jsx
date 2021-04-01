import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
import ladyImage from '../assets/woman-working.jpg';
import companyImage from '../assets/building.jpg';
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

export function FirstStep({ 
    handleDateChange, selectedDate, amount, setAmount, hasLoan, handleLoanChange 
    }) {

    const classes = useStyles();

    return (
        <div className="text-center">
            <p>What Do You Do?</p>
            <Grid container justify="center" spacing={2}>
                {careerType.map(career => (
                    <Grid item key={career.id}>
                        <div className="link h-container">
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
                        value={amount}
                        color="primary"
                        onChange={setAmount}
                        startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                        labelWidth={60}
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
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid>
                <p>Do you have any existing loan(s)?</p>
                <Paper className="w50 mx-auto p-10">
                    <RadioGroup row aria-label="quiz" name="quiz" value={hasLoan} onChange={handleLoanChange}>
                        <FormControlLabel className="mx-auto purple" color="secondary" value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel className="mx-auto purple" color="secondary" value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </Paper>
            </Grid>
        </div>
    );
}

export function SecondStep({ amount, setAmount }) {

    const classes = useStyles();
    const [tenure, setTenure] = React.useState(0);

    return(
            <Grid className={classes.margin}>
                <h3>Choose yoor plan</h3>
                <Grid container spacing={0}>
                    {calender.map(calObj => (
                        <Grid item key={calObj.id} onClick={() => setTenure(calObj.id)}>
                            <CalenderCard calObj={calObj} />
                        </Grid>
                    ))}
                </Grid>
                <h3>Payment Breakdown</h3>
                <div className="main">
                    <div className="row">
                        <div className="column cOne">
                            <ul className="black">
                                <li>Shopping Credit</li>
                                <li>Down Payment</li>
                                <li>Monthly Installment</li>
                                <li>Tenure</li>
                            </ul>
                        </div>
                        <div className="column cTwo">
                            <div className="cTwoo">
                                <ul className="black">
                                    <li><strong>N45,000</strong></li>
                                    <li><strong>N48,000</strong></li>
                                    <li><strong>N25,000</strong></li>
                                    <li><strong>{tenure} month</strong></li>
                                </ul>
                            </div>
                        </div>
                        <div className="column cThree">
                            <div className="cThreee">
                                <p>Customize down payment</p>
                                <FormControl className={classes.margin} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount" color="secondary">Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={amount}
                                        color="primary"
                                        onChange={setAmount}
                                        startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                        labelWidth={60}
                                    />
                                </FormControl>
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
