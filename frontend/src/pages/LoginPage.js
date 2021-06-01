import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {blue} from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
}));

function LoginPage(props) {
	const classes = useStyles();
    const axios = require('axios');
    const history = useHistory();
    const [user, setUser] = useState({username: '', password: ''});
    
    function handleChange(event){
        const {name, value} = event.target;
        if (name === 'username'){
            setUser({username: value, password: user['password']});
        }
        else if (name === 'password'){
            setUser({username: user['username'], password: value});
        }
    }
    
    function submitForm(){
        if(user['username'] && user['password']){
            makeGetCall().then(result => {
                if (result){
                    if(result.data.user_list.length){
                        props.setCurUser(result.data.user_list[0]._id);
                        localStorage.setItem('currentUser', result.data.user_list[0]._id);
                        history.push("/transactions");
                    }
                    else{
                        //error message
                    }
                }
                else{
                    //error message
                }
                setUser({username: user['username'], password: ''});
            });
        }
        else {
            //error message
        }
    }
    
    async function makeGetCall(){
        try {
            const response = await axios.get('http://localhost:5000/users?'
                                                .concat("username=").concat(user['username'])
                                                .concat("&password=").concat(user['password']));
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    if (localStorage.getItem('currentUser')) 
    {
        return <Redirect to="/transactions" />
    }
    else{
    	return (
    		<Container component="main" maxWidth="xs">
    		<div className={classes.paper}>
    			<Avatar className={classes.avatar} variant="rounded">
    				<LockOutlinedIcon />
    			</Avatar>
    			<Typography component="h1" variant="h5">
    				Sign In
    			</Typography>
    			<form className={classes.form} noValidate>
    				<TextField
    					variant="outlined"
    					margin="normal"
    					required
    					fullWidth
    					id="username"
    					label="Enter username"
    					name="username"
                        value={user.username}
                        onChange={handleChange}
    				/>
    				<TextField
    					variant="outlined"
    					margin="normal"
    					required
    					fullWidth
    					id="password"
    					label="Enter password"
    					name="password"
    					type="password"
                        value={user.password}
                        onChange={handleChange}
    				/>
    				<Button
    					fullWidth
    					variant="contained"
    					color="primary"
    					className={classes.submit}
                        onClick={() => submitForm()}
    				>
    					Sign In
    				</Button>
    				<Grid item>
    					<Link href="signup" variant="body2">
    						{"New to Budget Planner? Create an Account Here"}
    					</Link>
    				</Grid>
    			</form>
    		</div>
    		</Container>
    	)
    }
}

export default LoginPage;