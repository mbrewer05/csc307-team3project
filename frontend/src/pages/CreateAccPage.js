import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {pink} from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

function CreateAccPage() {
	const classes = useStyles();
    const axios = require('axios');
    const history = useHistory();
    const [newUser, setNewUser] = React.useState({name:'', username:'', password:''});
    const [error, setError] = React.useState('');
    
    function handleChange(event){
        const {name, value} = event.target;
        if (name === 'name'){
            setNewUser({name:value, username:newUser['username'], 
                password:newUser['password']});
        }
        else if (name === 'username'){
            setNewUser({name:newUser['name'], username:value, 
                password:newUser['password']});
        }
        else if (name === 'password'){
            setNewUser({name:newUser['name'], username:newUser['username'], 
                password:value});
        }
    }
    
    function submitForm(){
        if(newUser['name'] && newUser['username'] && newUser['password']){
            makePostCall().then(result => {
                if(result.status == 201){
                    setNewUser({name:'', username:'', password:''});
                    history.push("/login");
                }
            });
        }
        else {
            setError("error: missing fields");
        }
    }
    
    async function makePostCall(){
        try {
            const response = await axios.post('http://localhost:5000/users', newUser);
            return response;
        }
        catch (error) {
            console.log(error);
            if (error.response){
                if( error.response.status == 409){
                    setError("error: username taken");
                }
                else{
                    setError("error: server side error");
                }
            }
            else{
                setError("error: cannot connect to server");
            }
            return false;
        }
    };
    

	return (
		<Container component="main" maxWidth="xs">
		<div className={classes.paper}>
			<Avatar className={classes.avatar} variant="rounded">
				<CreateIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Create Account
			</Typography>
			<form className={classes.form} noValidate>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="name"
					label="Enter Full Name"
					name="name"
                    value={newUser.name}
                    onChange={handleChange}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="username"
					label="Enter username"
					name="username"
                    value={newUser.username}
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
                    value={newUser.password}
                    onChange={handleChange}
				/>
                <Typography component="h1" variant="subtitle1" color="secondary">
                    {error}
    			</Typography>
				<Button
					fullWidth
					variant="contained"
					color={pink[500]}
					className={classes.submit}
                    onClick={() => submitForm()}
				>
					Create Account
				</Button>
				<Grid item>
					<Link href="login" variant="body2">
						{"Already Have a Budget Planner Account? Sign In Here"}
					</Link>
				</Grid>
			</form>
		</div>
		</Container>
	)
}

export default CreateAccPage;