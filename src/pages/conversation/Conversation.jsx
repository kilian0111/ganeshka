import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import { AiOutlineSend } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, getPrivateMessage } from "../../slices/privatemessage";
import { getUserAuth } from "../../slices/user";
import { useTheme } from "@mui/material/styles";
import "./Conversation.css";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import privateMessageService from "../../services/privateMessage.service";
import "./Conversation.css";
import { getPrivateCallById } from "../../slices/privatecall";
import config from "../../config/index";

const Conversation = () => {
  const theme = useTheme();
  let navigate = useNavigate();

  // Get id from url
  const { id } = useParams();

  const user = useSelector((state) => state.users.me);
  const { privateMessage } = useSelector((state) => state);
  const { privateCall } = useSelector((state) => state);
  const id_privateCall = parseInt(id);

  console.log("privateCall", privateCall);

  // Get current date
  var date = new Date().toISOString().split("T")[0];
  var time = new Date().toTimeString().split(" ")[0];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAuth());
    dispatch(getPrivateMessage(id_privateCall));
    dispatch(getPrivateCallById(id_privateCall));
  }, []);

  const [formData, setFormData] = useState({
    content_pm: "",
    date_created: date + " " + time,
    date_updated: date + " " + time,
    status: "published",
    id_privateCall: id_privateCall,
    user_created: user?.id || null,
  });

  useEffect(() => {
    const formDataCopy = { ...formData };
    formDataCopy.user_created = user?.id || null;
    setFormData(formDataCopy);
  }, [user]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendMessage = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, content_pm: "" });
    if (!user) {
      navigate("/login");
    }

    const response = await privateMessageService.postPrivateMessage(formData);

    if (response.status === 200) {
      let formDataCopy = { ...formData };
      formDataCopy.user_created = user;
      dispatch(addMessage(formDataCopy));

      navigate("/conversation/" + id_privateCall);
    }
  };

  return (
    <div>
      <Grid item xs={12}>
        <List className="containerHeaderConversation">
          {privateCall.conversation?.map((call, key) => (
            <ListItem button key={call.nom_PrivateCall}>
              <ListItemIcon>
                <Avatar
                  alt={call.nom_PrivateCall}
                  src={config.API_URL + "assets/" + call.Image}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  call.nom_PrivateCall ? call.nom_PrivateCall : "Conversation"
                }
              ></ListItemText>
            </ListItem>
          ))}
        </List>
        <div className="scroll">
          <List
            className={{
              height: "70vh",
              overflowY: "auto",
            }}
          >
            {privateMessage.message?.map((message, key) => (
              <ListItem key={key}>
                {message.user_created.id === user.id ? (
                  <>
                    <Grid container className="flex-end">
                      <div className="containerMessage">
                        <ListItemText
                          key={message}
                          className="message"
                          style={{
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                          }}
                          align="right"
                          primary={message.content_pm}
                        ></ListItemText>
                        <ListItemText
                          align="right"
                          secondary={new Date(
                            message.date_created
                          ).toLocaleTimeString()}
                        ></ListItemText>
                      </div>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid container className="flex-start">
                      <div className="containerMessage">
                        <span style={{ color: "grey" }}>
                          {message.user_created.first_name}
                        </span>
                        <ListItemText
                          key={message}
                          className="message"
                          style={{ backgroundColor: "white" }}
                          align="left"
                          primary={message.content_pm}
                        ></ListItemText>
                        <ListItemText
                          align="right"
                          secondary={new Date(
                            message.date_created
                          ).toLocaleTimeString()}
                        ></ListItemText>
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
          <Grid container style={{ padding: "5px" }}>
            <Grid item xs={10}>
              <TextField
                id="outlined-basic-email"
                name="content_pm"
                value={formData.content_pm}
                label="Type Something"
                fullWidth
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid xs={2} align="right">
              <Fab type="submit" color="primary" aria-label="add">
                <AiOutlineSend />
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};
export default Conversation;
