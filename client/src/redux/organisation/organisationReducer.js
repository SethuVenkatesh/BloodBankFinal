
const initialState={
    organisation:localStorage.getItem("organisation") || null
}
export const organisationReducer=(state=initialState,action)=>{
    switch(action.type){
        case "ORGANISATION_LOG_IN":
            return { 
                ...state,
                organisation:action.payload
            }
        case  "ORGANISATION_LOG_OUT":
            localStorage.removeItem("organisation");
            return {
                ...state,
                organisation:null
            }
        default:return state
    }
}