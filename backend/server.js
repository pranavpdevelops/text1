import express from "express"
import { connect } from "./config/db"

const app = express()

app.get()


connect()
const port = 3000
app.listen(port,()=>{
    console.log("running on localhost 3000")
})