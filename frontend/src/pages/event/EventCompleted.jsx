import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from "../../config/firebase";
import GenerateImage from "../../scripts/GenerateImage";


import UserSidebar from '../../components/navbar/UserSidebar';

const EventCompleted = ({account, randomNum}) => {

  const navigate = useNavigate();

  const drawerWidth = 240;

  const [open, setOpen] = React.useState(true);

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


  const {event_id} = useParams();
  const [commentList, setCommentList] = useState([]);
  const [event, setEvent] = useState([]);

  const getEvent = async() => {
    const eventRef = doc(db, "events", event_id);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists) {
      console.log(eventDoc.data());
      setEvent(eventDoc.data());
    } else {
      console.log("No such document!");
    }
  }

  const getCommentList = async () => {
    const commentsRef = query(collection(db, "comments"), where("eventId", "==", event_id));
      try {
          const data = await getDocs(commentsRef);
          const filteredData = data.docs.map((doc) => ({
              ...doc.data(),
          }));
          setCommentList(filteredData);
      } catch (err) {
          console.error(err)
      }
  };

  useEffect(() => {
    getEvent();
    getCommentList();
  }, []);

  function createImage() {
    GenerateImage(commentList, event);
    // console.log("createImage");
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="イベント作成" />
        <Main open={open}>
          <DrawerHeader />
          <Typography>感想収集用QRコード{randomNum}</Typography>
          <div>
            <Button
              sx={{top: 20}}
              variant="contained"
              onClick={() => {navigate("/createEvent/eventCompleted");}}
            >保存</Button>
        </div>
        <div>
            <Button
              sx={{top: 20}}
              variant="text"
              onClick={createImage}
            >感想の収集を中断して画像を生成する</Button>
        </div>
        </Main>
      </Box>
    </div>
  )
}

export default EventCompleted;