import express from "express";
import { loadRoutes } from "./services/index.js";
import { v1Routes } from "./v1RoutesPath/index.js";
import firebase from "./services/Firebase.js";
import { setHeaders } from "./middlewares.js";

const app = express();
const PORT = process.env.PORT || 5000;
// load firebase database
const db = firebase?.db;
// for parsing application/json

app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(setHeaders);
app.use(express.static("public"));

//Load all routes
loadRoutes(v1Routes, (path, route) => app.use("/candleLight_api" + path, route));

//Wrong Route
app.use("/", async (req, res) => {
  res.send("<p> 404 not found !</p>" + PORT);
});

app.listen(PORT, () => {
  console.log(process.env.PORT);
  console.log(`Server is running on port ${PORT}`);
});
