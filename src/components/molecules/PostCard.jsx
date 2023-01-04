import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getUserAuth} from "../../slices/user";
import { useDispatch } from 'react-redux';
import postService from "../../services/post.service";
import config from '../../config/index';
import Grid from '@mui/material/Grid';
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';

export function PostCard({ user, id, title, desc , file, ...props}) {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.users.me);
  const token = useSelector((state) => state.auth.token);

  const colorLike = me?.like?.find(mee => mee['post_id'] === id) ? 'error' : 'default';

  const likeAction = async () => {

    if(colorLike === 'error') {
      await postService.unlikePost( me?.like?.find(mee => mee['post_id'] === id)?.id );
    } else {
      await postService.likePost( id,  me.id );
    } 

    dispatch(getUserAuth({ token:token}));

  }

  return (
    <Card sx={{ minWidth: 275, textAlign: 'start', margin: '10px' }}>
      <CardContent>
        <Grid sx={{ display: 'flex', alignItems: 'center'}}>
          {user.avatar && (
            <Avatar  src={config.API_URL + "assets/" + user.avatar} ></Avatar>
          )}
          <Typography sx={{ fontSize: 14, margin: '10px' }} color="text.secondary" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
        </Grid>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {title}
        </Typography>
        <Typography variant="body2">
            {desc}
        </Typography>
        {file && (
          <Grid container align="center" justify="center" item xs={3} md={12}  style={{flexDirection:"column-reverse"}} >
              <div>
                  <Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    src={config.API_URL + "assets/" + file}
                  />
              </div>
          </Grid>
          )}
      </CardContent>
      <CardActions onClick={likeAction} disableSpacing sx={{ justifyContent : 'end' }}>
        <IconButton color={colorLike}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
