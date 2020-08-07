import React from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';


const ChatCard = ({message}) => {
    return (
        <div>{message.message}</div>
    )
}

export default ChatCard;
