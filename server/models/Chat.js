const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    message: {
        type: String
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String
    },
}, { timestamps: true });


const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat }