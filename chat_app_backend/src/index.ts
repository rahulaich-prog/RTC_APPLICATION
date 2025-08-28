import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}

let allSocket: User[] = [];

wss.on("connection", (socket) => {
    
    allSocket.push({ socket, room: "" });

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message as unknown as string);

        if (parsedMessage.type === "join") { 
            console.log("user joined"+parsedMessage.payload.roomId);
            
            for (let user of allSocket) {
                if (user.socket === socket) {
                    user.room = parsedMessage.payload.roomId;
                }
            }
        }

        if (parsedMessage.type == "chat") {
            console.log("user wants to chat");
            
            let currentUserRoom: string | null = null;
            for (let user of allSocket) {
                if (user.socket === socket) {
                    currentUserRoom = user.room;
                }
            }
            if (currentUserRoom) {
                for (let user of allSocket) {
                    if (user.room === currentUserRoom && user.socket !== socket) {
                        user.socket.send(parsedMessage.payload.message);
                    }
                }
            }
        }
    });

    // Use "close" event, and filter by user.socket
    socket.on("close", () => {
        allSocket = allSocket.filter(user => user.socket !== socket);
    });
});
