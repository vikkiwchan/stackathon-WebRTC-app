import React from 'react';
import { Typography, AppBar, makeStyles } from '@material-ui/core';

import Notifications from '../Components/Notifications.jsx';
import Options from '../Components/Options.jsx';
import VideoPlayer from '../Components/VideoPlayer.jsx';

const useStyles = makeStyles((theme) => ({
  header: {
    margin: '0rem 10rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant='h2' align='center' className={classes.header}>
        Virtual Coffee Chat
      </Typography>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default Main;
