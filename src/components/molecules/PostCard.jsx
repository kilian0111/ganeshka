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

export function PostCard({ user, id, title, desc , ...props}) {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.users.me);
  const token = useSelector((state) => state.auth.token);

  const colorLike = me?.like?.find(mee => mee['post_id'] === id) ? 'error' : 'default';

  const likeAction = async () => {
    console.log('likeAction');

    if(colorLike === 'error') {
      await postService.unlikePost( me?.like?.find(mee => mee['post_id'] === id)?.id );
    } else {
      await postService.likePost( id,  me.id );
    } 

    dispatch(getUserAuth({ token:token}));

  }

  console.log(colorLike);
  console.log(me);
  console.log(id);
  
  return (
    <Card sx={{ minWidth: 275, textAlign: 'start', margin: '10px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {title}
        </Typography>
        <Typography variant="body2">
            {desc}
        </Typography>
      </CardContent>
      <CardActions onClick={likeAction} disableSpacing sx={{ justifyContent : 'end' }}>
        <IconButton color={colorLike}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
