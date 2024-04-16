// server.js (hoặc app.js)
const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const mysql = require("mysql");
const cors = require('cors');
const configViewEngine = require("./config/viewEngine");
const initWebRoutes = require("./src/routers/web");
const session = require("express-session");
const connectFlash = require("connect-flash");
const passport = require("passport");

const taikhoanRoutes = require('./src/routers/taikhoan.routers');
const suKienRoutes = require('./src/routers/sukien.routers'); // Import the new router
const taiLieuRoutes = require('./src/routers/tailieu.routers');
const hoiThaoRoutes = require('./src/routers/hoithao.routers');
const nguoidungRoutes = require('./src/routers/nguoidung.routers');
const nhanvienRoutes = require('./src/routers/nhanvien.routers');





// create express app
const app = express();

// Setup server port
const port = 3307;


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Cho phép gửi credentials
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Cross-Origin-Resource-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(cookieParser("secret"));
//config session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
     maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.set('view engine', 'html');


// config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);

// Define routes for taikhoan, auth, and suKien
app.use('/api/taikhoan', taikhoanRoutes);
app.use('/api/sukien', suKienRoutes); // Add the new router
app.use('/api/tailieu', taiLieuRoutes);
app.use('/api/hoithao', hoiThaoRoutes);
app.use('/api/nguoidung',nguoidungRoutes);
app.use('/api/nhanvien',nhanvienRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
