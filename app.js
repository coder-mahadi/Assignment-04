// Library Import
let express = require("express")
let app = express()
let multer = require("multer")
let bodyParser = require("body-parser")
require("dotenv").config()

// Middleware
app.use(bodyParser.json())

// Local Variable
let PORT = process.env.PORT

// A)Post API with URL Query
app.post("/", (req, res) => {
  let firstName = req.query.firstName
  let lastName = req.query.lastName
  let fullName = firstName + " " + lastName
  res.send(fullName)
})

//A) Post request with body parser
app.post("/body", (req, res) => {
  let jsonData = req.body
  let singleData = jsonData["name"]
  let jsonString = JSON.stringify(jsonData)
  // res.send(singleData)
  res.send(jsonString)
})

//A) Work with header properties
app.post("/header", (req, res) => {
  console.log(res)
  res.append("name", "Mahadi")
  res.append("city", "Gazipur")
  res.status(200).end("Done")
})

//Upload API supported only png and jpg file
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(new Error("Only png and jpg file supported"))
    }
  }
}).single("image")
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send("File upload failed")
    } else {
      res.send("File upload success")
    }
  })
})

// Server Listen
app.listen(PORT, () => {
  console.log(`Server is running by http://localhost:${PORT}`)
})