import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import {AiOutlineSend} from "react-icons/ai";
import React, { useEffect, useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { getPrivateMessage } from "../../slices/privatemessage";
import { clearMessage } from "../../slices/printError";
import { getUserAuth } from "../../slices/user";

const Conversation = () => {
    const user = useSelector((state) => state.users.me);
    const token = useSelector((state) => state.auth.token);
    const { privateMessage } = useSelector((state) => state);

    const dispatch = useDispatch();

    console.log("PrivateMessage", privateMessage.message);
    console.log('User', user)
    useEffect(() => {
        dispatch(getUserAuth({ token:token}));
        dispatch(getPrivateMessage());
    }, []);
    return (    
        <div>
            <Grid item xs={12}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List>
                <List className={{
                    height: '70vh',
                    overflowY: 'auto',
                }}>
                    <ListItem key="1">
                        <Grid container>
                            {privateMessage.message?.map((message, key) => (
                                <>
                                    {message.user_created.id === user.id ? (
                                        <>
                                            <Grid item xs={12}>
                                                <ListItemText key={message} style={{ backgroundColor: 'red'}} align="right" primary={message.content_pm}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="right" secondary={(new Date(message.date_created)).toLocaleTimeString()}></ListItemText>
                                            </Grid>
                                        </>
                                    ):(
                                        <>
                                            <Grid item xs={12}>
                                                <ListItemText style={{ backgroundColor: 'grey'}} align="left" primary={message.content_pm}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="right" secondary={(new Date(message.date_created)).toLocaleTimeString()}></ListItemText>
                                            </Grid>
                                        </>
                                    )}
                                </>
                            ))}
                            </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{padding: '5px'}}>
                    <Grid item xs={10}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={2} align="right">
                        <Fab color="primary" aria-label="add"><AiOutlineSend /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </div>);

}
export default Conversation;
