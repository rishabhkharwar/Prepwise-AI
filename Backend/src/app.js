const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://prepwise-ai-frontend.onrender.com",
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


/* global error handler - catches any unhandled errors from async routes */
app.use((err, req, res, next) => {
    console.error("Global error handler:", err)
    res.status(err.status || 500).json({
        message: err.message || "Internal server error"
    })
})


module.exports = app
