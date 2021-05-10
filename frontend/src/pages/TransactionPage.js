import React from 'react';
import Appbar from '../components/Appbar.js';
import TransactionForm from '../components/TransactionForm.js';
import TransactionTable from '../components/TransactionTable.js';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function TransactionPage(){
    return(
        <div className="transaction-page">
            <Appbar />
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="right"
            >
            <TransactionForm />

            </Grid>

            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="right" 
            >
                <Button
                    id="button-submit"
                    color="primary"
                    variant="contained"
                    disableElevation
                >
                    SUBMIT
                </Button>
            </Grid>

            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="right" 
            >
                <TransactionTable />
            </Grid>
        </div>
    );
}

export default TransactionPage;