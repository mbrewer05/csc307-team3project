import React from "react";
import clsx from "clsx";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom"

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
});
function TempDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button key={"Profile"} component={Link} to="/profile">
                    <ListItemText primary={"Profile"} />
                </ListItem>
                <ListItem button key={"Transactions"} component={Link} to="/transactions">
                    <ListItemText primary={"Transactions"} />
                </ListItem>
                <ListItem button key={"Statistics"} component={Link} to="/stats">
                    <ListItemText primary={"Statistics"} />
                </ListItem>
            </List>

            <Divider />
            <List>
                <ListItem button key={"Settings"} component={Link} to="/settings">
                    <ListItemText primary={"Settings"} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button
                        onClick={toggleDrawer(anchor, true)}
                        color="inherit"
                    >
                        <MenuIcon />
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                    
                </React.Fragment>
            ))}
        </div>
    );
}

export default TempDrawer;
