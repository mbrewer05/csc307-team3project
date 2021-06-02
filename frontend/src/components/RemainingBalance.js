import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function RemainingBalance() {
    const classes = useStyles();
    const [balanceObj, setBalance] = useState({ balance: 0 });

    async function getBalance() {
        return axios
            .get(
                "http://localhost:5000/users/" + localStorage.getItem("currentUser") + "/remainingBalance"
            )
            .then((response) => {
                return response.data;
            });
    }

    useEffect(() => {
        getBalance().then((result) => {
            console.log("Result: " + result);
            setBalance({balance: result["balance"]});
        });
    });

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    Remaining Balance
                </Typography>
                <Typography variant="h5" component="h2">
                    ${Math.round(balanceObj["balance"] * 100) / 100}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RemainingBalance;
