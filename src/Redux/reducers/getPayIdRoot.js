import { getPayId } from "../actions/actionTypes";

const initialState = {};

export const getPayIdfromUser = (state = initialState, action) => {
    switch(action.type){
        case getPayId.GET_PAY_ID :
            return action.payload
        case getPayId.REMOVE_PAY_ID:
            return action.payload
        default :
            return state
    }
        
};