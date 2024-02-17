import { DynamicAnyObject } from "@/types/object"
import getJWT from "./getJWT"

type Args = DynamicAnyObject


const j = (object: Args) => {
    
    const token = getJWT()
    return {...object,token}
}

export default j