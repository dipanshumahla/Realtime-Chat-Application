import io from 'socket.io-client';

const ENDPOINT = 'http://192.168.43.160:4001';

class Socket{
    constructor({name, room}, receiveMessageCallback, sendMessageCallback, errorHandler, setRoomInfo){
        this.user = {name, room};

        this.socket = io(ENDPOINT);

        this.socket.on('message',(message)=>{
            receiveMessageCallback(message);
        });

        this.socket.on('roomInfo',(roomInfo)=>{
            setRoomInfo(roomInfo);
        });

        this.socket.emit('join', this.user.name, this.user.room, (response)=>{
            if(!response.status){
                this.disconnect = () =>{
                    console.log('sorry! never joined.')
                }
                errorHandler(response.message);
            }
        });

        this.sendMessageCallback = sendMessageCallback;
    }

    sendMessage = (room, message) =>{
        this.socket.emit('sendMessage',{room, message},this.sendMessageCallback);
    }

    disconnect = ()=>{
        console.log(this.user)
        this.socket.emit('disconnect', (response)=>{
            if(response.status){
                console.log('User disconnected');
            }else{
                console.log(response.message);
            }
        });
        this.socket.off();
    }
}
export default Socket;