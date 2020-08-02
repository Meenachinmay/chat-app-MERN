import axios from 'axios';
import {
    GET_CHATS
} from './types';
import { CHAT_SERVER } from '../components/Config.js';

export const getChats = () => dispatch => {
    axios.get(`${CHAT_SERVER}/getChats`)
        .then(response => {
            dispatch({
                type: GET_CHATS,
                payload: response.data
            })
           
        });
}

