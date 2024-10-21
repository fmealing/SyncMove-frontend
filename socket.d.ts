import { Socket } from "socket.io-client";
import { SocketEvents } from "./types";

// Extending Socket.io with custom events
declare module "socket.io-client" {
  export interface Socket extends SocketEvents {}
}
