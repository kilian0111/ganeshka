import React from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from "@mui/material/Avatar";
import config from './../../../config';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

const UserAvatar = ({ user }) => {
    const classes = useStyles();

    return (
        <Avatar alt={user.first_name} src={config.API_URL + "assets/" + user.avatar} className={classes.avatar} />
    );
};

export default UserAvatar;
