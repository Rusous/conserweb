import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const server = express();

//configuraciones para que acepte conexiones el backend
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
import jwt from 'jsonwebtoken'

//importando las rutas
import userRouter from "./routes/userRoutes.js";
import cronRouter from "./routes/cronRoute.js";
import arrendatarioRouter from "./routes/arrendatarioRoutes.js";
import notaRouter from "./routes/notaRoutes.js";

//usando las rutas
server.use("/api/users", userRouter);
server.use("/api/cron", cronRouter);
server.use('/api/arrendatario',arrendatarioRouter)
server.use('/api/notas', notaRouter)

// const toki ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGU3YjZmMmM1YWViYTI3Y2ZkZGU0NiIsImlhdCI6MTY5OTY0ODEwNSwiZXhwIjoxNzA4Mjg4MTA1fQ.sHdMUFfQTmK1QDZuHsfxrUSTqonJrLJu0nS7yiEmnzw"
// const guardar = jwt.verify(toki,'CLAVESECRETA')
// console.log(guardar)

//conectando a la base de datos
mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Data Base Connected"))
	.catch((err) => console.log(err));

//corriendo el server
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
	console.log("server running");
});
