import React from 'react';
import Appbar from '../components/Appbar.js';
import TransactionForm from '../components/TransactionForm.js';
import TransactionTable from '../components/TransactionTable.js';
import Grid from '@material-ui/core/Grid';

function TransactionPage(){
    const [transactions, setTransactions] = React.useState([]);
    const axios = require('axios');
    
    async function removeOneTransaction (index) {
        const _id = transactions[index]['_id']
        try{
            const response = await axios.delete('http://localhost:5000/users/60a483f4cc4a814ce0cb4139/transactions/'.concat(_id));
        }
        catch(error){
            //We're not handling errors. Just logging into the console.
            console.log(error);
        }
        const updated = transactions.filter((character, i) => {
            return i !== index
        });
        setTransactions(updated);
    };
    function compareDates(a, b) {
        var resA = a.date.split("-");
        var resB = b.date.split("-");
        if (resA[0] < resB[0]) {
            return 1;
        }
        if (resA[0] > resB[0]) {
            return -1;
        }
        if (resA[1] < resB[1]) {
            return 1;
        }
        if (resA[1] > resB[1]) {
            return -1;
        }
        if (resA[2] < resB[2]) {
            return 1;
        }
        if (resA[2] > resB[2]) {
            return -1;
        }
        return 0;
    }
    
    function updateList(transaction) {
        makePostCall(transaction).then(result => {
            if(result)
                setTransactions([...transactions, result.data].sort(compareDates));
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
    
    async function fetchAll(){
        try {
            const response = await axios.get('http://localhost:5000/users/60a483f4cc4a814ce0cb4139/transactions');
            const updated = response.data.transaction_list.sort(compareDates);
            return updated;
        }
        catch (error){
            //We're not handling errors. Just logging into the console.
            console.log(error); 
            return false;         
        }
    };
    
    React.useEffect(() => {
        fetchAll().then(result => {
            if (result)
                setTransactions(result);
        });
    }, [] );

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
                <TransactionTable  transactionData={transactions} 
                    removeTransaction={removeOneTransaction}/>
            </Grid>
        </div>
    );
}

export default TransactionPage;