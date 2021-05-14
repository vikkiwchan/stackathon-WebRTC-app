import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from './SocketContext';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'baseline',
          }}
        >
          <h2>{call.name} is calling:</h2>
          <Button
            variant='contained'
            color='primary'
            onClick={answerCall}
            style={{
              height: '40px',
              width: '100px',
            }}
          >
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
