import express from "express"
import {signup ,login} from "../controllers/user.controller"

const user = express.Router();

user.post("/signup",signup);
user.post("/login",login); // TODO: implement login

export default user
