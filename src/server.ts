import express from "express";
import { ContactRoutes } from "./application/endpoints/contact.endpoints";

const app = express();
app.use(express.json());
app.use(ContactRoutes);
const host = "localhost";
const port = 3000;

app.listen(port);

console.log(`app listen on: http://${host}:${port}`);
