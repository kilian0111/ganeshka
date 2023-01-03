import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FaBars } from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import { deleteToken } from "../../../slices/auth";
import {useNavigate} from "react-router-dom";
import {Logo} from "../../atoms/Logo/Logo";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const Navbar = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let navigate = useNavigate()

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const menu = [
        { text: 'Accueil', link: '/' },
    ];
    if (isLoggedIn) {
        menu.push({ text: 'Messages', link: '/messages' });
        menu.push({ text: 'Paramètre', link: '/parametre'});

        menu.push({ text: 'Logout', link: '#', action: () => {dispatch(deleteToken());  navigate("/login"); } });

    } else {
        menu.push({ text: 'Connexion', link: '/login' });
        menu.push({ text: 'Inscription', link: '/register'  });

    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <FaBars />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Squirrel
                    </Typography>
                    <Logo png={true} width={50} onClick={ () => { navigate("/"); }} />
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <List>
                    {menu.map((item) => (
                        <ListItem  button key={item.text} component="a" href={item.link} onClick={item.action}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
