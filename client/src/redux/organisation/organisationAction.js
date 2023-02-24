export const organisationlogin=(organisation)=>{
    return {
        type:"ORGANISATION_LOG_IN",
        payload:organisation
    }
}
export const organisationlogout=()=>{
    return {
        type:"ORGANISATION_LOG_OUT",
    }
}