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
					id="full_name"
					label="Enter Full Name"
					name="full_name"
				/>
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
					color={pink[500]}
					className={classes.submit}
				>
					Create Account
				</Button>
				<Grid item>
					<Link href="signup" variant="body2">
						{"Already Have a Budget Planner Account? Sign In Here"}
					</Link>
				</Grid>
			</form>
		</div>
		</Container>
	)
}

export default CreateAccPage;