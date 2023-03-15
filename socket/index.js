const io = require('socket.io')(8900, {
    cors:{
        origin: "http://localhost:5173"
    }
});
let users = [];
const addUniqueUser = ({userid, socketid})=>{
   (!users.some((user)=>user.userid === userid)) && users.push({userid, socketid});
}
// io.on('connection', socket => {
//     console.log("connected a user")
//     // io.emit('client-to-server-message', "hello world from server") // send to all
//     // io.to(si).emit('client-to-server-message', "hello world from server") 
//     // send to one user here si is socket id 
//     socket.on('adduser', (userid) => {
//         addUniqueUser({userid, socketid: socket.id})
//        io.emit('getusers', users)//users which are online or connected to socket server
// })
// })

// // send and get message 
// io.on('sendMessage', ({senderid, receiverid, message}) => {
//     console.log("message sent")
//     const receiver = users.find(user => user.userid === receiverid)
//     io.to(receiver.socketid).emit('getMessage', {
//         senderid,
//         message
//     })
// })



// const removeUser = (socketid)=>{
//     users = users.filter(user => user.socketid !== socketid);
// }
// io.on('disconnect', (socket) => {
//     console.log("disconnected a user")
//     removeUser(socket.id)
//     io.emit('getusers', users)
// })
 
  
  const addUser = (userId, socketId) => {
    (!users.some((user) => user.userId === userId)) &&
      users.push({ userId : userId, socketId : socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
    console.log(socket.id)
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        console.log(users)
        console.log("message sent")
      const user = getUser(receiverId);
      console.log(user)
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });