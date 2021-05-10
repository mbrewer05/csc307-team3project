import React from "react";
import TempDrawer from "./TempDrawer.js";
import { makeStyles } from "@material-ui/core/styles";
import "@fontsource/roboto";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        marginRight: theme.spacing(2),
    },
}));

function Appbar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    {/*"Hamburger" menu icon*/}
                    <TempDrawer />

                    {/*Title*/}
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Typography variant="h6" className={classes.title}>
                            Budget Planner
                        </Typography>
                    </Grid>

                    {/*Log out button*/}
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="right"
                    >
                        <Button
                            color="default"
                            variant="contained"
                            startIcon={<AccessibleForwardIcon />}
                            disableElevation
                        >
                            LOG OUT
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Appbar;
