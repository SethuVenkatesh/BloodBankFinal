export const userlogin=(user)=>{
    return {
        type:"USER_LOG_IN",
        payload:user
    }
}
export const userlogout=()=>{
    return {
        type:"USER_LOG_OUT",
    }
}