import './App.css';

import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import {
  Comment,
  CreateEvent,
  CreatedEvents,
  Event,
  Gallery,
  Landing
} from './pages';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { useEthers } from '@usedapp/core';
import { APP_THEME, DEFAULT_HOME_PAGE } from './constants';

const App = () => {
  const { activateBrowserWallet, account, error } = useEthers();
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const userRoute = pathname.startsWith('/user');

  useEffect(() => {
    if (!account && userRoute && error) {
      navigate('/')
    } else if (account && pathname === '/') {
      navigate(DEFAULT_HOME_PAGE)
    }
  }, [account, userRoute])

  useEffect(() => {
    activateBrowserWallet();
  }, [])

  return (
    <ThemeProvider theme={APP_THEME}>
      <CssBaseline />
      <div className='App'>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          {/* <Route path="mypage" element={<MyPage account={account} />} /> */}
          <Route path="gallery" element={<Gallery account={account} />} />
          {/* <Route path="timeline" element={<Timeline account={account} />} /> */}
          <Route path="createEvent" element={<CreateEvent account={account} />} />
          <Route path="createdEvents" element={<CreatedEvents account={account} />} />
          {/* <Route path="feedback" element={<Feedback account={account} />} /> */}
          <Route path="event/:eventId" element={<Event account={account} />} />
          <Route path="event/:eventId/comment" element={<Comment account={account} />} />
          {/* <Route path="event/:eventId/completed" element={<EventCompleted account={account} />} /> */}
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App;
