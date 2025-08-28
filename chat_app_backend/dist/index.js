import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let allSocket = [];
wss.on("connection", (socket) => {
    // Add user with empty room on connect
    allSocket.push({ socket, room: "" });
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            console.log("user joined" + parsedMessage.payload.roomId);
            for (let user of allSocket) {
                if (user.socket === socket) {
                    user.room = parsedMessage.payload.roomId;
                }
            }
        }
        if (parsedMessage.type == "chat") {
            console.log("user wants to chat");
            let currentUserRoom = null;
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
//# sourceMappingURL=index.js.map