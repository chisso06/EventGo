import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import { EventForm } from '../../components';
import UserSidebar from '../../components/navbar/UserSidebar';

const CreateEvent = ({account}) => {
  const drawerWidth = 240;
  const [open, setOpen] = useState(false);
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="イベント作成" />
        <Main open={open}>
          <DrawerHeader />
          <EventForm />
        </Main>
      </Box>
    </div>
  )
}

export default CreateEvent;
