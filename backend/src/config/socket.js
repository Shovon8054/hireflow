import { Server } from "socket.io";

let io;

// Initialize Socket.io
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        
        socket.on("join", (userId) => {
            socket.join(userId.toString());
            console.log(`User ${userId} joined room ${userId}`);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};

// Access io instance from anywhere
export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io has not been initialized.");
    }

    return io;
};