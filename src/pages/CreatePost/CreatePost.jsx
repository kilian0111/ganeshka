import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Logo } from '../../components/atoms/Logo/Logo';
import postService from "../../services/post.service";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {getUserAuth} from "../../slices/user";
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import { useRef } from 'react';
import uploadFileService from '../../services/uploadFile.service';


export default function CreatePost() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.users.me);
    const fileInput = useRef();


    useEffect(() => {
        dispatch(getUserAuth({ token:token}));
    }, []);
    const [formData, setFormData] = useState({
        title_post: '',
        content_post: '',
        status: 'published',
        user_created: user?.id || null,
        file: null,
        
    });
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!user) {
            navigate("/login");
        }
        let formDataCopy = {...formData};
        const file = fileInput.current.files[0];
        if (file) {
            const fileData = new FormData();
            fileData.append('title', 'image' + Date.now);
            fileData.append('image_' + user?.id + "_" + Date.now(), file);
            const res = await uploadFileService.uploadFile(fileData);
            formDataCopy.file = res.data;
        }  
        
        const response = await postService.postPost(formDataCopy);

        if (response.status === 200) {
            navigate("/");
        }
    }

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
            <Logo width={50}/>
            <Typography component="h1" variant="h5">
            Creér un post
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="title_post"
                label="Titre"
                name="title_post"
                autoComplete="title_post"
                autoFocus
                onChange={(e) => onChange(e)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                multiline
                rows={7}
                name="content_post"
                label="Description"
                type="content_post"
                id="content_post"
                autoComplete="current-password"
                onChange={(e) => onChange(e)}
            />
            <Grid item xs={9} md={12} justify="center">
                <InputLabel htmlFor="file-input">Ajouter une Photo</InputLabel>
                <input
                    type="file"
                    id="file-input"
                    ref={fileInput}
                />
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Créer
            </Button>
            </Box>
        </Box>
    </Container>
  )
}
