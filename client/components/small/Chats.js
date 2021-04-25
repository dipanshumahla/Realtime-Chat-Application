import React from 'react';
import styles from '@/styles/ChatBox.module.css';

export default function Chats({name, messages}) {
    const messagesEndRef = React.useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    React.useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className={styles.chats}>
            {
                messages.map((message, i)=>(
                    <div key={i} className={`mt-10 ${styles.chat} ${message.user == name ? styles.s_chat : styles.r_chat}`}>
                        {message.text}
                    </div>
                ))
            }
            <div ref={messagesEndRef} />
        </div>
    )
}
