import express from "express"
import {signup } from "../controllers/user.controller"

const user = express.Router();

user.post("/signup",signup);

export default user
