import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
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
                "http://localhost:5000/users/60a483f4cc4a814ce0cb4139/remainingBalance"
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
