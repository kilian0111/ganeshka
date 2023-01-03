import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import {AiOutlineSend} from "react-icons/ai";
import React, { useEffect } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { getPrivateMessage } from "../../slices/privatemessage";
import { getUserAuth } from "../../slices/user";
import { useTheme } from "@mui/material/styles";
import './Conversation.css'


const Conversation = () => {
    const user = useSelector((state) => state.users.me);
    const { privateMessage } = useSelector((state) => state);
    const theme = useTheme();
console.log(theme.palette);
    const dispatch = useDispatch();

    console.log("PrivateMessage", privateMessage.message);
    console.log('User', user)
    useEffect(() => {
        dispatch(getUserAuth());
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
                <div className="scroll">
                <List className={{
                    height: '70vh',
                    overflowY: 'auto',
                }}>
                    {privateMessage.message?.map((message, key) => (
                        <ListItem key={message.id}>
                            {message.user_created.id === user.id ? (
                                <>
                                <Grid container className="flex-end">
                                    <div className="containerMessage">
                                        <ListItemText key={message} className="message" style={{ backgroundColor: theme.palette.primary.main, color:'white' }} align="right" primary={message.content_pm}></ListItemText>
                                        <ListItemText align="right" secondary={(new Date(message.date_created)).toLocaleTimeString()}></ListItemText>
                                    </div>
                                </Grid>
                                </>
                            ):(
                                <>
                                    <Grid container className="flex-start">
                                        <div className="containerMessage">
                                            <ListItemText key={message} className="message" style={{ backgroundColor: 'white'}} align="left" primary={message.content_pm}></ListItemText>
                                            <ListItemText align="right" secondary={(new Date(message.date_created)).toLocaleTimeString()}></ListItemText>
                                        </div>
                                    </Grid>
                                </>
                            )}
                            
                        </ListItem>
                    ))}
                </List>
                </div>
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
