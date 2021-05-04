import React from 'react'
import clsx from 'clsx'

import {withStyles} from '@material-ui/core/styles'
import {makeStyles} from '@material-ui/core/styles'
import '@fontsource/roboto'
import {AppBar} from '@material-ui/core'
import {Toolbar} from '@material-ui/core'
import {IconButton} from '@material-ui/core'
import {Typography} from '@material-ui/core'
import {Drawer} from '@material-ui/core'
import {Button} from '@material-ui/core'
import {Grid} from '@material-ui/core'
import {List} from '@material-ui/core'
import {ListItem} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import MeetingRoom from '@material-ui/icons/MeetingRoom'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         marginRight: theme.spacing(2)
//     },
//   }));

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginRight: theme.spacing(2)
    },
});

// function Sidebar_drawer(){
//     // const classes = useStyles();
//     const [state, setState] = React.useState({
//         top: false,
//         left: false,
//         bottom: false,
//         right: false,
//     });

//     const toggleDrawer = (anchor, open) => (event) => {
//         if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
//             return;
//         }
//         setState({ ...state, [anchor]:open});
//     }

//     const list = (anchor) => (
//         <div
//             className={clsx(classes.list, {
//                 [classes.fullList]: anchor === 'top' || anchor === 'bottom'
//             })}
//             role="presentation"
//             onClick={toggleDrawer(anchor, false)}
//             onKeyDown={toggleDrawer(anchor, false)}
//         >
//             <List>
//                 {['A', 'B', 'C', 'D'].map((text, index) => (
//                     <ListItem button key={text}>
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     )
// }

class Sidebar extends React.Component{
    // const classes = useStyles();
    render(){
        const {classes} = this.props;
        return(
        <div className={classes.root}>
        <AppBar position="static" color="primary">
            <Toolbar>
                {/*"Hamburger" menu icon*/}
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>

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
}

export default withStyles(styles)(Sidebar);