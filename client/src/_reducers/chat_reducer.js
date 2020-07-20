import { GET_CHATS } from '../_actions/types';

export default function(state = {}, action) {
    switch(action.type){
        case GET_CHATS:
            return { ...state, chat_messages: action.payload }
        default:
            return state;
    }
}