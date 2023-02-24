const initialState={
    user:localStorage.getItem("user") || null
}
export const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case "USER_LOG_IN":
            return { 
                ...state,
                user:action.payload
            }
        case  "USER_LOG_OUT":
            localStorage.removeItem("user")
            return {
                ...state,
                user:null
            }
        default:return state
    }
}