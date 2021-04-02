import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Products from './Products';
import Checkout from './Checkout';
import '../Styles/Button.css';


const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      width: '99%'
    }
}));
  
export default function BasePage() {

    const classes = useStyles();

    const [cartTotal, setCartTotal] = useState(120000);

    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} md={7} sm={7}>
                <Products cartTotal={cartTotal} />
            </Grid>
            <Grid item xs={12} md={5} sm={5} component={Paper} elevation={6} square>
                <Checkout cartTotal={cartTotal} setCartTotal={setCartTotal} />
            </Grid>
        </Grid>
    )
}
