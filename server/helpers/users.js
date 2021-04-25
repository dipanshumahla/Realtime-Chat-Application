const users = {};

const addUser = async (id, name, room)=>{
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    
    if(!users[room]){
        users[room] = {};
    }

    let userExists = await Object.entries(users[room]).find(person => person.name == name );
    
    if(userExists){
        return {
            status:false,
            message: "User already added."
        }
    }

    users[room][id] = {id,name,room};
    
    return {
        status:true,
        message:"User added"
    }
}

const removeUser = (id) =>{
    let userRoom;
    
    Object.values(users).forEach(room => {
        if(room[id].id == id){
           userRoom = room;
        }
    });

    if(!userRoom){
        return {
            status:false,
            message:"User does not exists"
        }
    }

    const user = userRoom[id];
    delete users[userRoom[id].room][id];
    
    return {
        status:true,
        user:user,
        message:"User deleted successfully."
    }
}

const getUser = (id, room) =>{
    const user = users[room][id];
    return user;
}

const getUsersInRoom = (room) =>{
    return users[room];
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom};