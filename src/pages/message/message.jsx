import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Config from '../../config';
import API from '../../config/api';
import usersService from '../../services/user.service';
import { useState, useEffect } from 'react';

const API_URL = Config.API_URL + "users/";

export default function Chat () {

    const [allUser, setAllUser] = useState([]); 
    
    // {1} : Requête récupérant les données
    const ChargementPage = async () => {
        // Initialisation des variables
        let table = []; // Creation d'un tableau vide qui contiendra les données de la requête

        await usersService.getUsers()    
        .then((res) => {
            //Si ça marche
            // console.log("resultat users : ", res);
            table = res.data
            return table
        })
        .finally((f) => {
            //Ce lance quoi qu'il arrive
            setAllUser(table)
        })
        .catch((e) => {
            //Si on a une erreur
            console.log("ECHEC")
            return "ERROR";
        });
      
    };
    //
    useEffect(() => {
        ChargementPage()
    }, [])

    // {2} : Function utilisant {1} à chaque écriture dans la Search Bar

    
    

    return (
        <div>

            {/* Title  */}
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            {/* Title  -- END --*/}

            {/* Body */}
            <Grid container component={Paper} className={{
                width: '100%',
                height: '80vh'
            }}>
                <Grid item xs={12} className={{
                    borderRight: '1px solid #e0e0e0'
                }}>

                    {/* Connected User  */}
            

                    {/* Connected User -- END -- */}

                    {/* Search Bar */}
                    <Divider />
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                    {/* Search Bar -- END -- */}
                    
                    {/* User Find -- END -- */}
                    { allUser.map((user, id) => {
                    console.log(user)
                    return  (   
                        <>
                            <List>
                                <ListItem button key="User">
                                    <ListItemIcon>
                                        <Avatar alt={user.first_name} src={"http://squirel.kilian-marmilliot.com:8055/assets/" + user.avatar} />
                                    </ListItemIcon>
                                    <ListItemText primary={user.first_name + " " + (user.last_name?user.last_name:" ")}></ListItemText>
                                </ListItem>
                            </List>
                        </>);
                    })}             
                        {/* User Find -- END -- */}

                    </List>
                </Grid>
            </Grid>
            {/* Body --END --*/}

        </div>
    );
}

