import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Appbar from "../components/Appbar.js";
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    }
  }));

function SettingsPage(props) {
  const classes = useStyles();
  const [user, setSettings] = React.useState({name: '', username: '', password: '', budget: '', timeInterval: -1, spendingAlter: false});
  const axios = require('axios');

  async function submitSettingsForm() {
    try{
      const response = await axios.patch('http://localhost:5000/users' + localStorage.getItem('currentUser'), {user})
      return response
    }
    catch(error){
      console.log(error)
    }
  }

  function handleChange(event) {
    if (event.target.name === "name")
      setSettings(
        {name: event.target.value, username: user['username'], password: user['password'], 
        budget: user['budget'], timeInterval: user['description'], spendingAlter: user['spendingAlter']});
    else if (event.target.name === "username") {
      setSettings(
        {name: user['name'], username: event.target.value, password: user['password'], 
        budget: user['budget'], timeInterval: user['description'], spendingAlter: user['spendingAlter']});
      }
    else if (event.target.name === "password") {
      setSettings(
        {name: user['name'], username: user['username'], password: event.target.value, 
        budget: user['budget'], timeInterval: user['description'], spendingAlter: user['spendingAlter']});
    }
    else if (event.target.name === "budget") {
      setSettings(
        {name: user['name'], username: user['username'], password: user['password'], 
        budget: (event.target.value), timeInterval: user['description'], spendingAlter: user['spendingAlter']});
    }
    else if (event.target.name === "timeInterval") { 
      setSettings(
        {name: user['name'], username: user['username'], password: user['password'], 
        budget: user['budget'], timeInterval: parseInt(event.target.value), spendingAlter: user['spendingAlter']});
    }
    else if (event.target.name === "SpendingAlter") {
      setSettings(
        {name: user['name'], username: user['username'], password: user['password'], 
        budget: user['budget'], timeInterval: user['description'], spendingAlter: event.target.value});
    }
  }
  if (localStorage.getItem('currentUser')) 
  {
      return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <Appbar curUser={props.curUser} setCurUser={props.setCurUser} />
            </div>
          <div>
            <Typography align ="center" variant="h1">Settings</Typography>
            <Typography variant = "h3" align="left">
              Change Name:
              <TextField
                id="filled-multiline-flexible"
                label="New Name"
                name = "name"
                type = "name"
                multiline
                rowsMax={4}
                onChange={handleChange}
                variant="filled"
              />
            </Typography>
          </div>
          <div>
            <Typography variant = "h3" align="left">
              Change Username:
              <TextField
                id="filled-multiline-flexible"
                label="New Username"
                name = "username"
                type = "username"
                multiline
                rowsMax={4}
                onChange={handleChange}
                variant="filled"
              />
            </Typography>
          </div>
          <div>
            <Typography variant = "h3" align="left">
              Change Password:
              <TextField
                id="filled-multiline-flexible"
                label="New Password"
                name = "password"
                type = "password"
                multiline
                rowsMax={4}
                onChange={handleChange}
                variant="filled"
              />
            </Typography>
          </div>
          <div>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
          </div>
          <div>
            <Typography variant = "h3" align="left">
              Change Spending Limit:
              <TextField
                id="filled-multiline-flexible"
                label="New Spending Limit"
                name = "budget"
                type = "budget"
                multiline
                rowsMax={4}
                onChange={handleChange}
                variant="filled"
              />
            </Typography>
          </div>
          <div>
            <Typography variant = "h3" align="left">
              Change Time Interval:
              <TextField
                id="filled-multiline-flexible"
                label="New Time Interval"
                name = "timeInterval"
                type = "timeInterval"
                multiline
                rowsMax={4}
                onChange={handleChange}
                variant="filled"
              />
            </Typography>
          </div>
          <div>
              <br>
              </br>
              <br>
              </br>
              <br>
              </br>
              <br>
              </br>
              <br>
              </br>
          </div>
          <div>
            <Typography variant = "h3" align="left">
              Alert When going over spending limit? 
              <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
            </Typography>
          </div>
          <div>
              <br>
              </br>
              <br>
              </br>
              <br>
              </br>
              <Button
                id="button-submit"
                color="primary"
                variant="contained"
                value="Submit"
                onClick={submitSettingsForm}
                disableElevation
          >
            SUBMIT
          </Button>
              <br>
              </br>
              <br>
              </br>
          </div>
        </form>
      )
  }
  else{
      return <Redirect to="/login" />
  }
}

export default SettingsPage