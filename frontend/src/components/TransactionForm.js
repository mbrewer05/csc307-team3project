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
import Button from '@material-ui/core/Button';

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

function TransactionForm(props) {
  const [transaction, setTransaction] = React.useState({userID: localStorage.getItem('currentUser'), date: '', amount: 0, spent: '', category: '', description: ''});
  const classes = useStyles();
  const [val, setVal] = React.useState('');
  const [value, setValue] = React.useState('spend');

  const handleChangeCategory = (event) => {
    setVal(event.target.value);
    handleChange(event);
  };    
  const handleSpendGain = (event) => {
    setValue(event.target.value);
  };

  function handleChange(event) {
    if (event.target.name === "date")
      setTransaction(
        {date: event.target.value, amount: transaction['amount'], spent: transaction['spent'], 
        category: transaction['category'], description: transaction['description']});
    else if (event.target.name === "amount") {
      setTransaction(
        {date: transaction['date'], amount: Number(event.target.value), spent: transaction['spent'],
        category: transaction['category'], description: transaction['description']});
      }
    else if (event.target.name === "category") {
      setTransaction(
        {date: transaction['date'], amount: transaction['amount'], spent: transaction['spent'], 
        category: event.target.value, description: transaction['description']});
    }
    else if (event.target.name === "spent") {
      if (event.target.checked)
        setTransaction(
          {date: transaction['date'], amount: transaction['amount'], spent: '1',
          category: transaction['category'], description: transaction['description']});
    }
    else if (event.target.name === "gained") { 
      if (event.target.checked)
        setTransaction(
          {date: transaction['date'], amount: transaction['amount'], spent: '0',
          category: transaction['category'], description: transaction['description']});
    }
    else if (event.target.name === "description")
      setTransaction(
        {date: transaction['date'], amount: transaction['amount'], spent: transaction['spent'],
        category: transaction['category'], description: event.target.value});
  }

  function submitTransactionForm() {
    props.handleSubmit(transaction);
    setVal('');
    setValue('spend');
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="date"
        label="date"
        name="date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
      <TextField id="description" name="description" label="description" variant="outlined" onChange={handleChange}/>
      <TextField id="amount" name="amount" label="amount" variant="outlined" onChange={handleChange}/>
      
      <FormControl component="fieldset">
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleSpendGain}>
          <FormControlLabel value='-' control={<Radio />} label="spent" name="spent" onChange={handleChange}/>
          <FormControlLabel value='' control={<Radio />} label="gained" name="gained" onChange={handleChange}/>
        </RadioGroup>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel shrink id="category">
            Category
        </InputLabel>
        <Select
          labelId="category"
          id="category"
          name="category"
          value={val}
          onChange={handleChangeCategory}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>Select One</em>
          </MenuItem>
          <MenuItem value={'HomeAndUtilities'}>Home & Utilities</MenuItem>
          <MenuItem value={'Transportation'}>Transportation</MenuItem>
          <MenuItem value={'Groceries'}>Groceries</MenuItem>
          <MenuItem value={'PersonalAndFamilyCare'}>Personal & Family Care</MenuItem>
          <MenuItem value={'Health'}>Health</MenuItem>
          <MenuItem value={'Insurance'}>Insurance</MenuItem>
          <MenuItem value={'RestaurantsAndDining'}>Restaurants & Dining</MenuItem>
          <MenuItem value={'ShoppingAndEntertainment'}>Shopping & Entertainment</MenuItem>
          <MenuItem value={'Travel'}>Travel</MenuItem>
          <MenuItem value={'CashChecksAndMisc'}>Cash, Checks, & Misc.</MenuItem>
          <MenuItem value={'Giving'}>Giving</MenuItem>
          <MenuItem value={'BusinessExpenses'}>Business Expenses</MenuItem>
          <MenuItem value={'Education'}>Education</MenuItem>
          <MenuItem value={'Finance'}>Finance</MenuItem>
          <MenuItem value={'Uncategorized'}>Uncategorized</MenuItem>
        </Select>
      </FormControl> 
      <Button
        id="button-submit"
        color="primary"
        variant="contained"
        value="Submit"
        onClick={submitTransactionForm}
        disableElevation
      >
        SUBMIT
      </Button>

    </form>
  );
}

export default TransactionForm