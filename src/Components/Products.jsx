import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import suitImage from '../assets/resized-suit.jpeg';
import phoneImage from '../assets/resized-phone.jpeg';
import '../Styles/Styles.css';


const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      width: '100%'
    }
}));

function Products(props) {
    
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={6} className="frame">
                <div className="top">
                    {/* <IconButton aria-label="back">
                        <KeyboardBackspaceIcon />
                    </IconButton> */}
                    <Button startIcon={<KeyboardBackspaceIcon/>} className={"btn-white"}>
                        Back To Store
                    </Button>
                </div>
                <div className="bottom">
                    <ul>
                        <li>Get pre-approved Instantly</li>
                        <li>Spread payment for up to six months</li>
                        <li>Provide some basic information to get started</li>
                    </ul>
                </div>
            </Grid>
            <Grid item xs={6} className="plt-10">
                <h3>ORDER SUMMARY</h3>
                <div className="main w90">
                    <div className="container">
                        <div className="card">
                            <img src={suitImage} alt="Avatar" className="img" />
                        </div>
                        <div className="text">
                            Men's Long Sleeve Shirt <br/> N15,000 <br /> Qty: 2
                        </div>
                    </div>

                    <div className="container">
                        <div className="card">
                            <img src={phoneImage} alt="Avatar" className="img" />
                        </div>
                        <div className="text">
                            Meeysoo P45 Pro <br/> N50,500 <br /> Qty: 1
                        </div>
                    </div>
                </div>
                <div className="main w90">
                    <p className="a-left black">
                        Total Cart Value:
                        <Typography variant="body1" className="f-right text-center black">
                            <strong>N80,500</strong>
                        </Typography>
                    </p>
                </div>
            </Grid>
        </Grid>
    );
}

export default Products;
