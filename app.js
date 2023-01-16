import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./.config/connection.js";
import userRoute from "./routes/userRoute.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import csvtojson from 'csvtojson';





var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'data/upload')
  },
  filename: function(req,file,cb){
    cb(null,file.fieldname +'-'+Date.now()+ path.extname(file.originalname))
  }
})
var upload = multer({storage:storage}) 

const data = JSON.parse(fs.readFileSync('./data/upload/data.json', 'utf-8'))

// import cors from 'cors'
const app = express();
// import engines from 'consolidate'
import bodyParser from "body-parser";
import ejs from "ejs";

app.set("view engine", "ejs");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());
// app.set('views', './views');
// app.engine('html', engines.mustache);

const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
// database connection
connectDB(DATABASE_URL);
// cors policy
// app.use(cors())

// json connection
app.use(express.json());

// load routes
app.use("/",upload.single("file1"), userRoute);
// session
app.use(express.static(__dirname + 'public'))
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
