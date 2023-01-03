import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {PostCard} from '../../components/molecules/PostCard'
import {getUserAuth} from "../../slices/user";
import {getPost} from "../../slices/post";
import {useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const fakeData = ({

  1: {
    user: {
      name_user: 'John Doe',
    },
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae tenetur pariatur asperiores officia! Error minima eaque vero voluptates optio non vitae architecto accusantium iste temporibus asperiores voluptatum fugit tenetur sed repellat assumenda, consequatur in alias aliquid! Doloribus, consectetur dolor omnis fuga odit excepturi amet consequatur illo eius, neque repellat maxime."
  },
  2: {
    user: {
      name_user: 'Lionel Marcel',
    },
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae tenetur pariatur asperiores officia! Error minima eaque vero voluptates optio non vitae architecto accusantium iste temporibus asperiores voluptatum fugit tenetur sed repellat assumenda, consequatur in alias aliquid! Doloribus, consectetur dolor omnis fuga odit excepturi amet consequatur illo eius, neque repellat maxime."
  },
  3: {
    user: {
      name_user: 'John Doe',
    },
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae tenetur pariatur asperiores officia! Error minima eaque vero voluptates optio non vitae architecto accusantium iste temporibus asperiores voluptatum fugit tenetur sed repellat assumenda, consequatur in alias aliquid! Doloribus, consectetur dolor omnis fuga odit excepturi amet consequatur illo eius, neque repellat maxime."
  },
  4: {
    user: {
      name_user: 'John Doe',
    },
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae tenetur pariatur asperiores officia! Error minima eaque vero voluptates optio non vitae architecto accusantium iste temporibus asperiores voluptatum fugit tenetur sed repellat assumenda, consequatur in alias aliquid! Doloribus, consectetur dolor omnis fuga odit excepturi amet consequatur illo eius, neque repellat maxime."
  },
  5: {
    user: {
      name_user: 'John Doe',
    },
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae tenetur pariatur asperiores officia! Error minima eaque vero voluptates optio non vitae architecto accusantium iste temporibus asperiores voluptatum fugit tenetur sed repellat assumenda, consequatur in alias aliquid! Doloribus, consectetur dolor omnis fuga odit excepturi amet consequatur illo eius, neque repellat maxime."
  },
})


export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.me);
  const token = useSelector((state) => state.auth.token);
  const posts = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getUserAuth({ token:token}));
    dispatch(getPost({ token:token}));
  }, []);

  const navigate = useNavigate();
  
  const redirectCreatePost = () => {
    navigate('/createPost');
  }

  const card = () => {
    if(posts){
      return (
        <div>
        {Object.keys(posts.data).map((key, index) =>  {
          return (
            <PostCard key={index} id={posts.data[key].id} user={posts.data[key].user_created} title={posts.data[key].title_post} desc={posts.data[key].content_post}/>
          )
        })}
      </div>
      )
    }
    return 'null'
  }



  return (
    <div>
      <div> Fil d'actualité</div>
      <Button variant="contained" onClick={redirectCreatePost} >Créer un Post</Button>

      {card()}

    </div>
  )
}
