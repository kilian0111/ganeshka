import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { useRef } from 'react';
import config from '../../config/index';
import uploadFileService from '../../services/uploadFile.service';


import {
    Grid,
    Typography,
    TextField,
    IconButton,
    Button,
    Paper, Input, InputLabel,
} from '@mui/material';
import { FaPen, FaTrash } from 'react-icons/fa';
import {getUserAuth} from "../../slices/user";

import Avatar from "@mui/material/Avatar";
import usersService from '../../services/user.service';
import {navigate} from "@storybook/addon-links";



const UserProfile = () => {
    const dispatch = useDispatch();
    const userMe = useSelector((state) =>   state.users.me);
    const token = useSelector((state) => state.auth.token);
    const fileInput = useRef();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        title: "",
        description: "",
        avatar: "",
    });
    useEffect(() => {
        dispatch(getUserAuth());
    },[])

    useEffect(() => {
        if(userMe != null ){
            setFormData({
                first_name: userMe.first_name,
                last_name: userMe.last_name,
                email: userMe.email,
                title: userMe.title,
                description: userMe.description,
                avatar: userMe.avatar,
            });
        }
    }, [userMe]);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        let dataAMaj = {}
        for (var property in formData) {
            if (formData.hasOwnProperty(property)) {
                if (formData[property] != null && formData[property] != "") {
                    dataAMaj[property] = formData[property]
                }
            }
        }
        const file = fileInput.current.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('title', 'avatar' + Date.now);
            formData.append('avatar_' + userMe?.id + "_" + Date.now(), file);
            const res = await uploadFileService.uploadFile(formData);
            dataAMaj.avatar = res.data;
        }
        await usersService.updateUser(dataAMaj);
        dispatch(getUserAuth());
    };

    const onDelete = async () => {
        if(userMe != null && userMe.id != null) {
            await usersService.deleteUser(userMe.id);
        }
        navigate('/register');
    };

    return (
        <Paper>
            <Typography variant="h4">User Profile</Typography>
            <form onSubmit={(e) => onSubmit(e)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="first_name"
                            label="First Name"
                            fullWidth
                            value={formData.first_name}
                            onChange={(e) => onChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="last_name"
                            label="Last Name"
                            fullWidth
                            value={formData.last_name}
                            onChange={(e) => onChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={(e) => onChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            label="Title"
                            fullWidth
                            value={formData.title}
                            onChange={(e) => onChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="description"
                            label="Description"
                            multiline
                            rows={4}
                            fullWidth
                            value={formData.description}
                            onChange={(e) => onChange(e)}
                        />
                    </Grid>
                    {formData.avatar && (
                    <Grid container align="center" justify="center" item xs={3} md={12}  style={{flexDirection:"column-reverse"}} >
                        <div>
                            <Avatar src={config.API_URL + "assets/" + formData.avatar} ></Avatar>
                        </div>
                    </Grid>
                    )}
                    <Grid item xs={9} md={12} justify="center">
                        <InputLabel htmlFor="file-input">Upload un Avatar</InputLabel>
                        <input
                            type="file"
                            id="file-input"
                            ref={fileInput}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<FaPen />}
                        >
                            Update
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <IconButton aria-label="delete" onClick={onDelete}>
                            <FaTrash />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Last Access: {userMe?.last_access != null ? userMe?.last_access : null }</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Followers: {userMe?.idFollow != null ? userMe?.idFollow.length : ""}
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default UserProfile;

