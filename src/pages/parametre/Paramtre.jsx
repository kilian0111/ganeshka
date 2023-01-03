import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Grid,
    Typography,
    TextField,
    IconButton,
    Button,
    Paper,
} from '@mui/material';
import { FaPen, FaTrash } from 'react-icons/fa';
import {getUserAuth} from "../../slices/user";



const UserProfile = () => {
    const dispatch = useDispatch();
    const userMe = useSelector((state) =>   state.users.me);
    const token = useSelector((state) => state.auth.token);


    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        title: "",
        description: "",
    });
    useEffect(() => {
        dispatch(getUserAuth({ token:token}));
    },[])

    useEffect(() => {
        if(userMe != null ){
            setFormData({
                first_name: userMe.first_name,
                last_name: userMe.last_name,
                email: userMe.email,
                title: userMe.title,
                description: userMe.description,
            });
        }
    }, [userMe]);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        //dispatch(updateUser({ ...formData, id }));
    };

    const onDelete = () => {
        //dispatch(deleteUser(id));
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
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<FaPen />}
                        >
                            Update
                        </Button>
                        <input
                            accept="image/*"
                            id="avatar-input"
                            type="file"
                            onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
                        />
                        <label htmlFor="avatar-input">
                            <Button component="span">
                                Upload Avatar
                            </Button>
                        </label>
                        {formData.avatar && (
                            <Typography component="p">{formData.avatar.name}</Typography>
                        )}
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

