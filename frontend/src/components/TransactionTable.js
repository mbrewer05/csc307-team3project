import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    align: "right",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
    maxWidth: 1000,
  },
});

function createData(date, desc, category, amount, balance) {
  return { date, desc, category, amount, balance};
}

function TransactionTable(props) {
  const classes = useStyles();
  const rows = props.transactionData;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Spent/Gained</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.date}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.balance}</TableCell>
              <TableCell align="left">{row.spent=="1" ? "Spent" : "Gained"}</TableCell>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                &nbsp;
                &nbsp;
                &nbsp;
                <Button
                  id="button-delete"
                  color="secondary"
                  variant="contained"
                  disableElevation
                  onClick={() => props.removeTransaction(index)}
                >
                      DELETE
                </Button>
              </Grid>
 
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionTable;