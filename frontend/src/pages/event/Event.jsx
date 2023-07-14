import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CollectingComments, EventDetail } from '../../components';
import UserSidebar from '../../components/navbar/UserSidebar';

const Event = ({account}) => {
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

  const {eventId} = useParams();
	const [event, setEvent] = useState([]);
	const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const getEvent = async () => {
      await axios.get("/event?eventId=" + eventId)
        .then((res) => {
          console.log("getEvent");
          setEvent(res.data);
        })
        .catch((err) => { console.log(err); });
    }
    const getCommentList = async () => {
      await axios.get("/commentList?eventId=" + eventId)
        .then((res) => {
          console.log("getCommentList");
          setCommentList(res.data);
        })
        .catch((err) => { console.log(err); });
    }
    getEvent();
    getCommentList();
	}, []);

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="Event Detail" />
        <Main open={open}>
          <DrawerHeader />
          {(() => {
            if (event.status == "generated_image") {
              return (<EventDetail event={event} commentList={commentList} />);
            } else if (event.status == "collecting_comments") {
              return (<CollectingComments eventId={eventId} />);
            } else {
              console.error("error");
              console.log(event);
            }
          })()}
        </Main>
      </Box>
    </div>
  );
}

export default Event;
