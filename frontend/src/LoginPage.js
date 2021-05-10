import React from 'react';
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

function LoginPage() {
	const classes = useStyles();

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
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
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

export default LoginPage;