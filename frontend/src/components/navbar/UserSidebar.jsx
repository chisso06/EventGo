import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CollectionsIcon from '@mui/icons-material/Collections';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem, ListItemButton, ListItemIcon, ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';

import logo from '../../assets/logo.png';

import { useEthers } from '@usedapp/core';
import { DEFAULT_HOME_PAGE } from '../../constants';
import * as actionType from '../../constants/actionTypes';

const UserSidebar = ({ pageTitle, open, setOpen }) => {
  const {deactivate} = useEthers()
  const drawerWidth = 248;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    dispatch({ type: actionType.LOGOUT });
    deactivate()
    setTimeout(() => navigate('/'), 100);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div">
                {pageTitle}
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
            PaperProps={{
              sx: {
                backgroundColor: "#0d66b4",
                color: "#ffffff",
              }
            }}
        >
            <DrawerHeader>
            <Box sx={{ mr: 0.5 }}>
              <a href={DEFAULT_HOME_PAGE}>
                <img src={logo} alt="logo" width={180} height={45} />
              </a>
            </Box>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem disablePadding onClick={() => {navigate("/mypage");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon style={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="マイページ" />
                    </ListItemButton>
                </ListItem>
                {/* <ListItem disablePadding onClick={() => {navigate("/timeline");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <FeedIcon style={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="イベント一覧" />
                    </ListItemButton>
                </ListItem> */}
                <ListItem disablePadding onClick={() => {navigate("/gallery");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <CollectionsIcon style={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="ギャラリー" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => {navigate("/createEvent");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <AddBoxIcon style={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="新規イベント作成" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => {navigate("/createdEvents");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <LibraryAddCheckIcon style={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="作成したイベント" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={logout}>
                    <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="ログアウト" />
                    </ListItemButton>
                </ListItem>
             
            </List>
        </Drawer>
    </div>
  )
};

export default UserSidebar;