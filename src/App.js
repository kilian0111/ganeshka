import React from 'react';
import './App.css';
// import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import  CreatePost  from './pages/CreatePost/CreatePost';
import { Provider } from 'react-redux';
import store from './store/store'
import  Login  from './pages/Login/Login';
import  Register  from './pages/Register/Register';
import Chat from './pages/message/message';
import Conversation from './pages/conversation/conversation';
import { Navbar } from './components/molecules/Navbar/Navbar';
import { ThemeProvider } from "@mui/material/styles";
import createTheme from './themes/default.js'
import refreshTokenInterceptor from "./config/refreshTokenInterceptor";
import UserProfile from "./pages/parametre/paramtre";

function App() {

    refreshTokenInterceptor(store);
  return (
      <Provider store={store} >
        <ThemeProvider theme={createTheme}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/messages" element={<Chat />} />
            <Route path="/conversation" element={<Conversation />} />
            <Route path="/parametre" element={<UserProfile />} />
          </Routes>
        </div>
        </ThemeProvider>
      </Provider>

  );
}
// primary secondary loading

export default App;
