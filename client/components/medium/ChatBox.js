import React,{useEffect, useState} from 'react';

import styles from '@/styles/ChatBox.module.css';
import Chats from '@/components/small/Chats';


export default function ChatBox({data}) {
    
    const {name, messages, sendMessage} = data;
    
    const [newMessage, setNewMessage] = useState('');
    const messageChangeHandler = (e) => setNewMessage(e.target.value);   

    const sendTheMessage = () =>{
        sendMessage(newMessage);
        setNewMessage('');
    }

    const messageKeyHandler = (e)=>{
        if(e.key == 'Enter'){
            sendTheMessage();
        }
    }

    return (
        <div className={styles.chat_box}>
            <Chats name={name} messages={messages} />
            <div className={`mt-10 ${styles.chat_controls}`}>
                <input className="text-input" type="text" value={newMessage} onChange={messageChangeHandler} onKeyPress={messageKeyHandler} />
                <input className={styles.chat_control_button} type="button" value="send" onClick={sendTheMessage} />
            </div>
        </div>
    )
}
