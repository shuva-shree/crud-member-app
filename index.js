const exp = require("constants");
const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const { engine } = require('express-handlebars');
const { title } = require("process");
const members = require("./Members");

// import { engine } from 'express-handlebars';


const PORT = process.env.PORT || 5000;

const app = express()

//Init middleware
// app.use(logger);

//Express handlebars middleware
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set("views", "./views");


//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended :false}));

//Home page Route
app.get('/',(req,res) => res.render(
    'index', {
        title:'Members App',
        members
    }));

//API Routes
app.use('/api/members', require("./routes/api/members"));


// app.get("/", (req,res) => {
//     res.send("<h1>Hello World</h1>");
// })

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));