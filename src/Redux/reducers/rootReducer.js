import { combineReducers } from 'redux';

import { getSellerIdFromAuthentication} from './getSellerIdFromAuthReducer';
import { getPayIdfromUser } from './getPayIdRoot';

const rootReducer = combineReducers({
    
    get_seller_profile_id: getSellerIdFromAuthentication,
    get_pay_id:getPayIdfromUser

});
export default rootReducer;