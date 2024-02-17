import getCredentials from "./getCredentials"

const getJWT = ()=>{
    const credentials = getCredentials()
    if(credentials===null){
        return
    }
    return credentials.jwt
}

export default getJWT