const socket = require('socket.io');
const users = require('./users');

class Socket{
    constructor(server){
        this.io = socket(server, {
            cors: {
              origin: "http://192.168.43.160:3000",
              methods: ["GET", "POST"]
            }
          });

        this.io.on('connection',(socket)=>{
            socket.on('join', async (name, room, callback)=>{
                
                const response = await users.addUser(socket.id, name, room);
                if(response.status){
                    console.log(`Welcome ${name} to ${room} chat.`);
        
                    socket.emit('message',{user:'admin', text:`Welcome ${name} to ${room} chat.`})
                    socket.broadcast.to(room).emit('message',{user:'admin', text:`${name} joined this chat`})
                    socket.join(room);
                    this.sendRoomInfo(room);
                }
            
                callback(response);
            });

            socket.on('sendMessage', async ({ room, message}, callback)=>{
        
                const user = await users.getUser(socket.id, room);
                socket.broadcast.to(room).emit('message',{user:user.name, text:message});
        
                callback();
            });

            socket.on('disconnect', async (callback)=>{
                const response = await users.removeUser( socket.id );
                
                if(response.status){
                    
                    let user = response.user;

                    console.log(`${user.name} left this chat ${user.room}`);

                    this.io.to(user.room).emit('message',{user:'admin', text:`${user.name} left this chat`});
                    this.sendRoomInfo(user.room);
                }
        
                //callback(response);
            });
        });
    }  

    sendRoomInfo = async (room) =>{
        const usersInRoom = await users.getUsersInRoom(room);
        this.io.to(room).emit('roomInfo',{name:room, users:Object.values(usersInRoom)});
    }
}

module.exports = Socket;