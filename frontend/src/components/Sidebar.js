import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import '@fontsource/roboto'
import {AppBar} from '@material-ui/core'
import {Toolbar} from '@material-ui/core'
import {IconButton} from '@material-ui/core'
import {Typography} from '@material-ui/core'
import {Drawer} from '@material-ui/core'
import {Button} from '@material-ui/core'
import {Grid} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import MeetingRoom from '@material-ui/icons/MeetingRoom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginRight: theme.spacing(2)
    },
  }));

function Sidebar(props) {
    const classes = useStyles();
    return(
        <div className={classes.root}>
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>

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
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="right"
                >
                    <Button color="default"
                        variant="contained" 
                        startIcon={<MeetingRoom/>}
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

export default Sidebar