const express = require("express")
const cookieParser = require("cookie-parser")

const fs = require("fs")
const server = express()
server.use(cookieParser())
server.use(express.static("client"))
server.use(express.json())

server.get("/highscore", (req, res) => {
    res.send(req.cookies.name)
})

server.post("/highscore", (req, res) => {
    console.log(req.body, 'från client')
    const file = JSON.parse(fs.readFileSync('highscore.json', { encoding: 'utf-8' }))
    console.log(file, 'från fil')
    if (req.body.score < file.score) {
        fs.writeFileSync('highscore.json', JSON.stringify(req.body))
        res.json({ msg: "highscore saved" })
    } else {
        res.json({ msg: "highscore not saved" })
    }
})

server.listen(3000)