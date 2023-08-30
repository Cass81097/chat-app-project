const { Server } = require("socket.io");

// Specify the desired port number
const port = 3000;

const io = new Server({
    cors: "http://localhost:3001",
});

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("addNewUser", (userId) => {
        if (userId !== null) {
            !onlineUsers.some(user => user.userId === userId) &&
                onlineUsers.push({
                    userId,
                    socketId: socket.id
                });
            // console.log("onlineUsers", onlineUsers);
        
            io.emit("getOnlineUsers", onlineUsers);
        }
    });

    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientId)

        if(user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
        io.emit("getOnlineUsers", onlineUsers )
    })
});

// Start the server on the specified port
io.listen(port, () => {
    console.log(`Socket.IO server is running on port ${port}`);
});