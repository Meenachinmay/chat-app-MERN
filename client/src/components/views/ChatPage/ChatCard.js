import React from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';


class ChatCard extends React.Component {
    
    state = { 
        messages: []
    }
    
    componentDidMount() {
        
    }

    show = () => {
        // this.props.chats.map(chat => (
        //     this.state.messages.push(chat.message)
        // ))
        this.props.chats.map(chat => (
            <div>{chat.sender.name}</div>
        ))
    }

    render(){
    return (
        <div>
            <button onClick={this.show}>click</button>
            <div>
                <ul>{this.state.messages.map(name => <li key={name}> {name} </li>)}</ul>
            </div>
        </div>
        // <div style={{ width: '100%' }}>           
        //     <Comment 
        //         author={props.sender.name}
        //         avatar={
        //             <Avatar 
        //                 src={props.sender.image} alt={props.sender.name}
        //             />
        //         }
        //         content={
        //             <p>
        //                 {props.message}
        //             </p>
        //         }
        //         dateTime={
        //             <Tooltip title={moment.format('YYYY-MM-DD HH:mm:ss')}>
        //                 <span>{moment().fromNow()}</span>
        //             </Tooltip>
        //         }
        //     />

        // </div>
    );}
}

export default ChatCard;
