import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Logo } from '../../components/atoms/Logo/Logo';
import { useState } from 'react';

import authService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Squirrel
        {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Register() {
    const [value, setValue] = React.useState(null);
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        //Récupère les infos de mon formulaire
        const lastName = event.target.lastName.value;
        const firstName = event.target.firstName.value;
        const pseudo = event.target.pseudo.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const password_comfirm = event.target.password_comfirm.value;

        const dateNaissance = new Date(value); //Besoin de gérer ça différement
        const birthDate = dateNaissance.getFullYear() + '-' + (dateNaissance.getMonth() + 1) + '-' + dateNaissance.getDate();

        //Verif MdP
        if (password !== password_comfirm) {
            alert("Les MdP sont différents !");
            return;
        }else{
            authService.register(lastName, firstName, pseudo, birthDate, email, password).then(() => {
                //Si ça marche
            }).catch((error) => {
                //Si j'ai une erreur
                //Directus me retourne une erreur si j'ai déjà utilisé mon adressse mail
                alert("L'adresse mail déjà utilisé !");
            });

        }

    };

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Logo width="50px"/>
            <Typography component="h1" variant="h5">
            Inscription
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Nom"
                    name="lastName"
                    autoComplete="family-name"
                />
                </Grid>
                <Grid item xs={6} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Prénom"
                    autoFocus
                />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="pseudo"
                        label="Pseudo"
                        name="pseudo"
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date de Naissance"
                            value={value}
                            name="birthday"
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password_comfirm"
                    label="Confirmation Mot de passe"
                    type="password"
                    id="password_comfirm"
                    autoComplete="new-password"
                />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Inscription
            </Button>
            <Grid container justifyContent="center">
                <Grid item>
                <Link href="/login" variant="body2">
                    Vous avez déjà un compte ? Connectez-vous
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        <Copyright sx={{ mt: 1 }} />
    </Container>
  );
}
