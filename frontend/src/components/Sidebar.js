import React from 'react'
import '@fontsource/roboto'
import {AppBar} from '@material-ui/core'
import {Toolbar} from '@material-ui/core'
import {IconButton} from '@material-ui/core'
import {Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'


function Sidebar(props) {
    return(
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton edge="start" className={props.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={props.title}>
                    Budget Planner
                </Typography>
             </Toolbar>
        </AppBar>
    );
}

export default Sidebar