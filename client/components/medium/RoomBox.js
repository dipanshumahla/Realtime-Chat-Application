import React from 'react';
import styles from '@/styles/RoomBox.module.css';

export default function RoomBox({data}) {

    const {name, room, roomInfo} = data;

    return (
        <div className={`mr-20 ${styles.room_box}`}>
            <div className={styles.box_head}>
                <strong>Room: {room}</strong>
                <p>{roomInfo.users.length} online</p>
            </div>

            <div className={`mt-10 ${styles.box_content}`}>
                {!roomInfo.users.length && <p>No user online</p>}
                {roomInfo.users.map(user=>(
                    <p>{user.name}</p>
                ))}
            </div>
        </div>
    )
}
