const initialState={
    staff:JSON.parse(localStorage.getItem("staff")) ||null,
}
export const staffReducer=(state=initialState,action)=>{
    switch(action.type){
        case "STAFF_LOG_IN":
            return {
                ...state,
                staff:action.payload
            }
        case  "STAFF_LOG_OUT":
            localStorage.removeItem("staff")
            return {
                ...state,
                staff:null
            }
        default :return state
    }
}