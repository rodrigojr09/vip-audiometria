import { io } from "socket.io-client";

const port = 48732;

const socket = io("http://localhost:" + port, {
	transports: ["websocket"],
});

export default socket;
