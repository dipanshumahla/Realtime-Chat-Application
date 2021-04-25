import React,{useEffect, useState} from 'react';
import Socket from '@/utils/socket';
import Router from 'next/router';

import ChatBox from '@/components/medium/ChatBox';
import RoomBox from '@/components/medium/RoomBox';

let socket;

function Chat({name, room}) {
    
    
    const [messages, setMessages] = useState([]);
    const [roomInfo, setRoomInfo] = useState({name:null, users:[]});

    const messageReceiveHandler = (message) =>{
        setMessages(messages => [...messages,message]);
    }

    const roomInfoHandler = (roomInfo) =>{
        setRoomInfo(roomInfo);
    }

    const messageSendHandler = ()=>{};

    const errorHandler = (error)=> {
        Router.push(`/?error=${error}`);
    }

    useEffect(() => {
        socket = new Socket({ name, room }, messageReceiveHandler, messageSendHandler, errorHandler, roomInfoHandler);

        return () => socket.disconnect();
    },[]);

    const sendMessage = (text)=>{
        socket.sendMessage(room, text);

        const message = {user:name, text};
        setMessages(messages => [...messages,message]);
    }

    return (
        <main>
            <RoomBox data = {{name, room, roomInfo}} />
            <ChatBox data = {{name, messages, sendMessage}} />
        </main>
    )
}

Chat.getInitialProps = (context)=>{
    return {
        name:context.query.name,
        room: context.query.room
    }
}

export default Chat;