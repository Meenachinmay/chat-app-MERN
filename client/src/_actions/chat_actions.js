import axios from 'axios';
import {
    GET_CHATS
} from './types';
import { CHAT_SERVER } from '../components/Config.js';

export function getChats(){
    const request = axios.get(`${CHAT_SERVER}/getChats`)
        .then(response => response.data);
    
    return {
        type: GET_CHATS,
        payload: request
    }
}

