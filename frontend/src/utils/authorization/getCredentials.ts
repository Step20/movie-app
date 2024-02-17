const getCredentials = ()=>{
    if(window===undefined){
        return null
    }
    const credentialsString = window?.localStorage?.getItem("site_stitch_credentials")||""
    if(credentialsString===""){
        return null
    }
    const credentials = JSON.parse(credentialsString)
    return credentials
}

export default getCredentials