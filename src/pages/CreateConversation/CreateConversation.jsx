import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Logo } from "../../components/atoms/Logo/Logo";
import postService from "../../services/post.service";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllUsers, getUserAuth } from "../../slices/user";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { useRef } from "react";
import uploadFileService from "../../services/uploadFile.service";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CreateConversation() {
  const [personName, setPersonName] = React.useState([]);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.users.me);
  const allUsers = useSelector((state) => state.users.users);
  const fileInput = useRef();

  useEffect(() => {
    dispatch(getUserAuth({ token: token }));
    dispatch(getAllUsers(user?.id));
  }, []);

  const [formData, setFormData] = useState({
    title_conversation: "",
    multiple_users: [user?.id, ""],
    status: "",
    file: null,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!user) {
    //   navigate("/login");
    // }
    let formDataCopy = { ...formData };
    const file = fileInput.current.files[0];
    if (file) {
      const fileData = new FormData();
      fileData.append("title", "image" + Date.now);
      fileData.append("image_" + user?.id + "_" + Date.now(), file);
      const res = await uploadFileService.uploadFile(fileData);
      formDataCopy.file = res.data;
    }
    console.log(formDataCopy);
    // const response = await postService.postPost(formDataCopy);

    // if (response.status === 200) {
    //   navigate("/");
    // }
  };

  // MULTIPLE SELECT
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo width={50} />
        <Typography component="h1" variant="h5">
          Creér une conversation
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title_conversation"
            label="Titre"
            name="title_conversation"
            autoComplete="title_conversation"
            autoFocus
            onChange={(e) => onChange(e)}
          />

          <InputLabel id="demo-multiple-name-label">
            Sélectionner les utilisateurs
          </InputLabel>
          <FormControl sx={{ m: 1, width: 300 }}>
            <Select
              labelId="demo-multiple-name-label"
              id="multiple_users"
              name="multiple_users"
              multiple
              value={personName}
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {allUsers?.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.first_name + "" + user.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid item xs={9} md={12} justify="center">
            <InputLabel htmlFor="file-input">Ajouter une Image</InputLabel>
            <input type="file" id="file-input" ref={fileInput} />
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
  );
}
