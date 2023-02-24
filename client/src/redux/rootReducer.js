import {combineReducers} from "redux"
import  {userReducer}  from './user/userReducer';
import { staffReducer } from './staff/staffReducer';
import { organisationReducer } from "./organisation/organisationReducer";

const rootReducer=combineReducers({
    user:userReducer,
    staff:staffReducer,
    organisation:organisationReducer
})

export default rootReducer;