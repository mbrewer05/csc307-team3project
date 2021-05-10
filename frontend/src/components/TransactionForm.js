import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '&:hover': {
        backgroundColor: 'transparent',
      },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },

}));


function TransactionForm() {
  const classes = useStyles();
  const [val, setVal] = React.useState('');
  const [value, setValue] = React.useState('spend');

  const handleChangeCategory = (event) => {
    setVal(event.target.value);
  };    
  const handleSpendGain = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue=""
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField id="description" label="Description" variant="outlined" />
      <TextField id="amount" label="$ Amount" variant="outlined" />
      
      <FormControl component="fieldset">
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleSpendGain}>
          <FormControlLabel value="spent" control={<Radio />} label="Spent" />
          <FormControlLabel value="gained" control={<Radio />} label="Gained" />
        </RadioGroup>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel shrink id="category">
            Category
        </InputLabel>
        <Select
          labelId="category"
          id="category"
          value={val}
          onChange={handleChangeCategory}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>Select One</em>
          </MenuItem>
          <MenuItem value={0}>Home & Utilities</MenuItem>
          <MenuItem value={1}>Transportation</MenuItem>
          <MenuItem value={2}>Groceries</MenuItem>
          <MenuItem value={3}>Personal & Family Care</MenuItem>
          <MenuItem value={4}>Health</MenuItem>
          <MenuItem value={5}>Insurance</MenuItem>
          <MenuItem value={5}>Restaurants & Dining</MenuItem>
          <MenuItem value={6}>Shopping & Entertainment</MenuItem>
          <MenuItem value={7}>Travel</MenuItem>
          <MenuItem value={8}>Cash, Checks, & Misc.</MenuItem>
          <MenuItem value={9}>Giving</MenuItem>
          <MenuItem value={10}>Business Expenses</MenuItem>
          <MenuItem value={11}>Education</MenuItem>
          <MenuItem value={12}>Finance</MenuItem>
          <MenuItem value={13}>Uncategorized</MenuItem>
        </Select>
      </FormControl> 


    </form>
  );
}

export default TransactionForm