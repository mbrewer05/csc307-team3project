import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom"
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon : {
    marginTop: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

function LoadingPage(props) {
	const classes = useStyles();
    
    if (localStorage.getItem('currentUser')){
        return <Redirect to="/transactions" />
    }
    else {
        return <Redirect to="/login" />
    }
    
	return (
        <div className="loading-page">
            <Grid className={classes.icon}
                container 
                justify = "center"
            >
    			<Typography component="h1" variant="h5">
    				Loading...
    			</Typography>
                <CircularProgress />
            </Grid>
        </div>
	);
}

export default LoadingPage;