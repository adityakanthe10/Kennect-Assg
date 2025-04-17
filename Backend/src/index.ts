import express from "express";
import user from "./routes/user.route";

const app = express();
app.use(express.json());

app.use("/api/v1/user",user);

app.listen(3000,()=>{
    console.log("server started on port 3000")
})