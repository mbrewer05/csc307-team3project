import React from 'react';
import Appbar from '../components/Appbar.js';
import TransactionForm from '../components/TransactionForm.js';
import TransactionTable from '../components/TransactionTable.js';
import Grid from '@material-ui/core/Grid';

function TransactionPage(){
    const [transactions, setTransactions] = React.useState([]);
    const axios = require('axios');

    function updateList(transaction) {
        makePostCall(transaction).then(result => {
            if(result)
                setTransactions([...transactions, result.data]);
        });
    }

    async function makePostCall(transaction) {
        try {
            const response = await axios.post('http://localhost:5000/users/60a483f4cc4a814ce0cb4139/transactions', transaction);
            return response;
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }

    return(
        <div className="transaction-page">
            <Appbar />
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="right"
            >
            <TransactionForm handleSubmit={updateList} />

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