const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const config = require("./config/key");

const { Chat } = require('./models/Chat');

const mongoose = require("mongoose");
const connect = mongoose.connect('mongodb://localhost:27017/chatapp',
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

// setting the route prefix
app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));

io.on("connection", socket => {
  socket.on("Send new message", message => {
    connect.then(db => {
      try {
        const chat = new Chat({ message: message.dataToSend.message, sender: message.dataToSend.userId, type: message.dataToSend.type });
        chat.save((err, doc) => {
        if (err) return res.status(500).json({success: false, err});

        Chat.find({"_id": doc._id})
          .populate("sender")
          .exec((err, doc) => {
            return io.emit("Output Chat Message", doc);
          })
        }) 
      } catch (error) {
        console.error(error);
      }
    })
  })
});


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});