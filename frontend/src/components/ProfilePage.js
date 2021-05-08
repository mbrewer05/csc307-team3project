import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';
import Appbar from "./Appbar.js";

const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    }
  }));

function ProfilePage() {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
            <Appbar />
      </div>
      <div>
        <Typography align ="center" variant="h3">
          {'Full Name\'s'}
        </Typography>
        <Typography align ="center" variant="h1">
          Profile
        </Typography>
      </div>
      <div>
        <Typography variant = "h3" align="left">
          Spending Limit:
          <TextField
            id="filled-multiline-flexible"
            label="$"
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
          Time Interval:
          <TextField
            id="filled-textarea"
            label="Days"
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
          <br>
          </br>
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

export default ProfilePage