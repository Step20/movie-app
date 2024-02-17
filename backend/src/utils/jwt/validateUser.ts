import decodeJWT from "./decodeJWT"

type Args = {
    userId:string
    token:string
}

const validateUser = ({userId,token}: Args) => {
    
    const decodedJWT = decodeJWT({token})
    const tokenUserId = decodedJWT?.user?._id
    if(!tokenUserId){
        throw new Error("Bad Token")
    }

    const validated =  tokenUserId === userId.toString()
    if(!validated){
        throw new Error("not valid token")
    }

    return validated
}

export default validateUser