import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import io from 'socket.io-client';
import { connect } from 'react-redux';
//https://stackoverflow.com/questions/52511869/typeerror-object-is-not-a-function-with-react-table-and-moment-js
import  moment  from 'moment';

import { getChats } from '../../../_actions/chat_actions';

class ChatPage extends Component {
    state = {
        chatMessage: ""
    }

    componentDidMount(){
        const server = "http://localhost:5000";

        this.props.dispatch(getChats());

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackend => {
            console.log("data about sender from backend", messageFromBackend);
        })
    }

    // handle the change in the user input for handling the chat messages
    handleInputChange = (e) => {
        this.setState({
            chatMessage: e.target.value 
        });
    }

    // method to send the user message
    sendMessage = (e) => {
        e.preventDefault();

        let dataToSend = {
             message: this.state.chatMessage,
             userId: this.props.user.userData._id,
             userName: this.props.user.userData.name,
             userImage: this.props.user.userData.image,
             nowTime: moment(),
             type: "Image",
        }

        this.socket.emit("Send new message", {
            dataToSend,
        });

        this.setState({ chatMessage: "" });
    }

    render(){
        return(
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center' }}>Real Time Chat</p>
                </div>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="infinite-container">
                        <div 
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: 'left', clear: 'both' }}
                        />
                    </div>
                    <Row>
                        <Form layout="vertical" onSubmit={ this.sendMessage }>
                            <Col span={18}>
                                <Input 
                                    id="message"
                                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,0.25)' }}/>}
                                    placeholder="Let's start talking..."
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                            <Col span={2}>

                            </Col>
                            <Col span={4}>
                                <Button type="primary" style={{ width: '100%' }} htmlType="submit" onClick={ this.sendMessage }>
                                    <Icon type="enter" />
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ChatPage);