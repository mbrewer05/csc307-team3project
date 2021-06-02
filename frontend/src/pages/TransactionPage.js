import React from "react";
import Appbar from "../components/Appbar.js";
import TransactionForm from "../components/TransactionForm.js";
import RemainingBalance from"../components/RemainingBalance.js";
import TransactionTable from "../components/TransactionTable.js";
import Grid from "@material-ui/core/Grid";
import {Redirect} from "react-router-dom";

function TransactionPage(props) {
    const [transactions, setTransactions] = React.useState([]);
    const axios = require("axios");

    async function removeOneTransaction(index) {
        const _id = transactions[index]["_id"];
        const transaction = await axios.get("http://localhost:5000/users/" + localStorage.getItem("currentUser") + "/transactions/".concat(
            _id));

        try {
            let deleteOne =
                "http://localhost:5000/users/" + localStorage.getItem("currentUser") + "/transactions/".concat(_id);
            let patchTwo =
                "http://localhost:5000/users/" + localStorage.getItem("currentUser") + "/remainingBalance";

            const requestDeleteOne = axios.delete(deleteOne);
            const requestPatchTwo = axios.delete(patchTwo, transaction);

            axios.all([requestDeleteOne, requestPatchTwo]).then(
                axios.spread((...responses) => {
                    const responseDeleteOne = responses[0];
                    const responsePatchTwo = responses[1];
                })
            );
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
        }
        const updated = transactions.filter((character, i) => {
            return i !== index;
        });
        setTransactions(updated);
    }
    
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
        makePostCall(transaction).then((result) => {
            if (result)
                setTransactions(
                    [...transactions, result.data].sort(compareDates)
                );
        });
    }

    async function makePostCall(transaction) {
        try {
            var requestPostOne = ''
            let postOne =
                "http://localhost:5000/users/" + localStorage.getItem("currentUser") + "/transactions";
            let patchTwo =
                "http://localhost:5000/users/" + localStorage.getItem("currentUser") + "/remainingBalance";

            requestPostOne = axios.post(postOne, transaction);
            const requestPatchTwo = axios.patch(patchTwo, transaction);

            axios.all([requestPostOne, requestPatchTwo]).then(
                axios.spread((...responses) => {
                    const responsePostOne = responses[0];
                    const responsePatchTwo = responses[1];
                })
            );
            return requestPostOne
            // const response = await axios.post('http://localhost:5000/users/60a483f4cc4a814ce0cb4139/transactions', transaction);
            // const response = await axios.patch(
            //     "http://localhost:5000/users/60a483f4cc4a814ce0cb4139/remainingBalance",
            //     transaction
            // );
            // return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function fetchAll() {
        try {
            const response = await axios.get(
                "http://localhost:5000/users/" + localStorage.getItem("currentUser") + "/transactions"
            )
            const updated = response.data.transaction_list.sort(compareDates);
            return updated
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    // async function getRemaining(){
    //     try{
    //         const response = await axios.get('')
    //     }
    // }

    React.useEffect(() => {
        fetchAll().then((result) => {
            if (result) setTransactions(result);
        });
    }, []);

    if (localStorage.getItem('currentUser')) 
    {
        return(
            <div className="transaction-page">
                <Appbar curUser={props.curUser} setCurUser={props.setCurUser}/>
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
                    <RemainingBalance />
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
    else {
        return <Redirect to="/login" />
    }
}

export default TransactionPage;
