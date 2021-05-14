// socket logic is in one file so it's easier to understand
// refs are used for video content
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

export const SocketContext = createContext();

// once we deploy application we can pass full url of deployed server

// useState will be used to run everything needed for video chat to work
export const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef();
  const otherVideo = useRef();
  const connectionRef = useRef();

  // as soon as page loads we want to get permission to use video & audio from user's camera
  useEffect(() => {
    const socket = io(window.location.origin);
    const getMedia = async () => {
      try {
        let currentStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;

        // want id so we can set id in state
        socket.on('me', (id) => {
          console.log('called from Socket Context', id);
          setMe(id);
        });

        socket.on('callUser', ({ from, name: callerName, signal }) => {
          setCall({ isReceivedCall: true, from, name: callerName, signal });
        });
      } catch (err) {
        console.error(err);
      }
    };
    getMedia();
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    // initiator is false bc we are not initiating a call when we simply answer it
    const peer = new Peer({ initiator: false, trickle: false, stream });

    // peer behaves similarly to sockets and will have handlers once we call somebody or answer a call
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      otherVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        callee: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      otherVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        stream,
        me,
        call,
        callAccepted,
        myVideo,
        otherVideo,
        name,
        setName,
        callEnded,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
