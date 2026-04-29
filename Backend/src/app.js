const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/* serve static frontend files in production */
const distPath = path.join(__dirname, "../../../Frontend/dist")
app.use(express.static(distPath))

/* fallback to index.html for react router */
app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"))
})


/* global error handler - catches any unhandled errors from async routes */
app.use((err, req, res, next) => {
    console.error("Global error handler:", err)
    res.status(err.status || 500).json({
        message: err.message || "Internal server error"
    })
})


module.exports = app
