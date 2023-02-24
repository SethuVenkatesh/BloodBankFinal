export const stafflogin=(staff)=>{
    return {
        type:"STAFF_LOG_IN",
        payload:staff
    }
}
export const stafflogout=()=>{
    return {
        type:"STAFF_LOG_OUT",
    }
}