const express = require("express");
const bodyParser = require("body-parser")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const socket = require("socket.io");
require("dotenv").config();
const connectDB = require("./config/db");
const hiringRoutes = require('./routes/hiringRoutes');
// dotenv
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require ("jsonwebtoken")

// routes
// routes
app.use("/ap1/v1/auth", require("./routes/userRoutes"));
app.use("/ap1/v1/post", require("./routes/postRoutes"));
app.use("/ap1/v1/information", require("./routes/informationRoutes"));
app.use("/ap1/v1/report", require("./routes/reportRoutes"));
app.use("/ap1/v1/chats", require("./routes/chatRoutes"));
// Corrected line below
app.use("/ap1/v1/message", require("./routes/messageRoutes"));
app.use("/api/v1/hiring", hiringRoutes);


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
