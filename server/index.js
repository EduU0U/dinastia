import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Novo usuário conectado:", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Servidor de chat rodando...");
});

server.listen(4000, () => console.log("✅ Servidor no http://localhost:4000"));
