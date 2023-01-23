import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Config from "../../config";
import API from "../../config/api";
import usersService from "../../services/user.service";
import privateCallService from "../../services/privateCall.service";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import { getAllPrivateCall } from "../../slices/privatecall";
import { getUserAuth } from "../../slices/user";

const API_URL = Config.API_URL + "users/";

export default function Chat() {
  const [allUser, setAllUser] = useState([]);
  const [research, setResearch] = useState();

  const user = useSelector((state) => state.users.me);
  const { privateCalls } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAuth());
    dispatch(getAllPrivateCall());
  }, []);

  const token = useSelector((state) => {
    return state.auth.token;
  });

  // {1} : Requête récupérant les données
  const ChargementPage = async () => {
    // Initialisation des variables
    let table = []; // Creation d'un tableau vide qui contiendra les données de la requête
    let currentId = {};

    // On récupère l'id de l'utilisateur connecter afin de ne pas l'avoir dans les données retournée par l'API
    await usersService
      .getUserAuth(token)
      .then((res) => {
        currentId = res.data.id;
        return currentId;
      })
      .catch((e) => {
        console.log("Error : No Current User find");
      });

    await usersService
      .getUsers(currentId, formData.search)
      .then((res) => {
        table = res.data;
        return table;
      })
      .finally((f) => {
        setAllUser(table);
      })
      .catch((e) => {
        console.log("ECHEC");
        return "ERROR";
      });

    await privateCallService.getConversation(currentId);
  };

  useEffect(() => {
    // Ne se lance qu'au démarrage
    ChargementPage();
  }, []);

  // {2} : Function utilisant {1} à chaque écriture dans la Search Bar
  const [formData, setFormData] = useState({
    search: "",
  });

  useEffect(() => {
    // Se lance lorsque formData est modifié
    ChargementPage();
  }, [formData]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div>
      {/* Title  */}
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      {/* Title  -- END --*/}

      {/* Body */}
      <Grid
        container
        component={Paper}
        className={{
          width: "100%",
          height: "80vh",
        }}
      >
        <Grid
          item
          xs={12}
          className={{
            borderRight: "1px solid #e0e0e0",
          }}
        >
          {/* Connected User  */}

          {/* Connected User -- END -- */}

          {/* Search Bar */}
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="SearchBar_Users"
              label="Search"
              variant="outlined"
              name="search"
              fullWidth
              value={formData.search}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Divider />
          {/* Search Bar -- END -- */}
          <p>Conversations</p>
          <List>
            {privateCalls.conversation?.map((privateCall) => {
              return (
                <div key={privateCall.id}>
                  <List>
                    <a
                      href={"conversation/" + privateCall.id + ""}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItem key="User">
                        <ListItemIcon>
                          <Avatar
                            alt={privateCall.nom_PrivateCall}
                            src={
                              "http://squirel.kilian-marmilliot.com:8055/assets/" +
                              privateCall.Image
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={privateCall.nom_PrivateCall || "No Name"}
                        ></ListItemText>
                      </ListItem>
                    </a>
                  </List>
                </div>
              );
            })}
            {/* User Find -- END -- */}
          </List>
          <Divider></Divider>
          <p>All users</p>
          <List>
            {allUser.map((user) => {
              return (
                <div key={user.id}>
                  <List>
                    <ListItem key="User">
                      <ListItemIcon>
                        <Avatar
                          alt={user.first_name}
                          src={
                            "http://squirel.kilian-marmilliot.com:8055/assets/" +
                            user.avatar
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          user.first_name +
                          " " +
                          (user.last_name ? user.last_name : " ")
                        }
                      ></ListItemText>
                    </ListItem>
                  </List>
                </div>
              );
            })}
            {/* User Find -- END -- */}
          </List>
        </Grid>
      </Grid>
      {/* Body --END --*/}
    </div>
  );
}
