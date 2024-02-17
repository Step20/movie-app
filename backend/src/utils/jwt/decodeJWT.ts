import jwt from 'jsonwebtoken';


type Args = {
    token:string
}

const decodeJWT = ({token}: Args) => {
    const res = jwt.decode(token)
    return res
}

export default decodeJWT