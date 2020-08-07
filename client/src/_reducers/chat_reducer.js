import { GET_CHATS } from '../_actions/types';

const initialState = {
    chatMessages: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_CHATS:
            return { ...state, chatMessages: action.payload }
        default:
            return state;
    }
}