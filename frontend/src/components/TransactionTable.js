import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date, desc, category, amount, balance) {
  return { date, desc, category, amount, balance};
}

const rows = [
  createData('05/05/2021', 'Cali Fresh', 'Groceries', '-$36.49', '$3,409.16'),
  createData('05/01/2021', 'May rent', 'Home & Utilities', '-$1,025.00', '$3,445.65'),
  createData('04/26/2021', 'Amazon purchase', 'Shopping & Entertainment', '-$29.35', '$4,470.65'),
  createData('04/25/2021', 'April paycheck', 'Cash, Checks, & Misc.', '$4,500.00', '$4,500.00'),
];

function TransactionTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Fat&nbsp;(g)</TableCell>
            <TableCell>Carbs&nbsp;(g)</TableCell>
            <TableCell>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>{row.desc}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionTable;