import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Appbar from "../components/Appbar.js";

const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    }
  }));

function SettingsPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <div>
            <Appbar/>
        </div>
      <div>
        <Typography align ="center" variant="h1">Settings</Typography>
        <Typography variant = "h3" align="left">
          Change Name:
          <TextField
            id="filled-multiline-flexible"
            label="New Name"
            multiline
            rowsMax={4}
            value={value}
            onChange={handleChange}
            variant="filled"
          />
        </Typography>
      </div>
      <div>
        <Typography variant = "h3" align="left">
          Change Username:
          <TextField
            id="filled-textarea"
            label="New Username"
            placeholder="Placeholder"
            multiline
            variant="filled"
          />
        </Typography>
      </div>
      <div>
        <Typography variant = "h3" align="left">
          Change Password:
          <TextField
            id="filled-multiline-static"
            label="New Password"
            multiline
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
            id="filled-multiline-static"
            label="New Spending Limit"
            multiline
            variant="filled"
          />
        </Typography>
      </div>
      <div>
        <Typography variant = "h3" align="left">
          Change Time Interval:
          <TextField
            id="filled-multiline-static"
            label="New Time Interval"
            multiline
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
          <br>
          </br>
          <br>
          </br>
          <br>
          </br>
      </div>
    </form>
  );
}

export default SettingsPage