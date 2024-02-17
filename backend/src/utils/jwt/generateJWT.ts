import jwt from 'jsonwebtoken';
import { DynamicAnyObject } from '../../types/objects';

const generateJWT = ({payload}:{payload:DynamicAnyObject})=>{
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(payload,secret,{
        expiresIn:"24h"
    })
    return token
}

export default generateJWT