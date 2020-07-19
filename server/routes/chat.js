const express = require('express');
const router = express.Router();
const { Chat } = require("../models/Chat");

const { auth } = require("../middleware/auth");

router.get("/getChats", (req, res) => {
    // get all the chat messages (because its group chat application)
    Chat.find()
        .populate("sender")
        .exec((err, chats) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(chats);
        })
});

module.exports = router;