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
import { getUserAuth } from "../../slices/user";
import { useTheme } from "@mui/material/styles";
import './Conversation.css'
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import privateMessageService from "../../services/privateMessage.service";


const Conversation = () => {
    const theme = useTheme();
    let navigate = useNavigate();

    const user = useSelector((state) => state.users.me);
    const { privateMessage } = useSelector((state) => state);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserAuth());
        dispatch(getPrivateMessage());
    }, []);

    const [formData, setFormData] = useState({
        content_pm: '',
        status: 'published',
        id_privateCall: 9,
        user_created: user?.id || "27f6d091-d0ad-4758-a73d-29027f12f1d4",
    });
    
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const sendMessage = async (e) => {
        e.preventDefault();
        console.log(formData);
        if(!user) {
            navigate("/login");
        }

        const response = await privateMessageService.postPrivateMessage(formData);

        if (response.status === 200) {
            navigate("/conversation/1");
        }
        
      };

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
                <Box component="form" onSubmit={sendMessage} noValidate sx={{ mt: 1 }}>
                    <Grid container style={{padding: '5px'}}>
                        <Grid item xs={10}>
                            <TextField id="outlined-basic-email" name="content_pm" label="Type Something" fullWidth onChange={(e) => onChange(e)} />
                        </Grid>
                        <Grid xs={2} align="right">
                            <Fab type="submit" color="primary" aria-label="add"><AiOutlineSend /></Fab>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </div>);

}
export default Conversation;
