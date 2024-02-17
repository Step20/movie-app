import { useEffect, useState } from "react"




export default (cb:Function,values:any[])=>{
    
    const [initialized,setInitialized] = useState(false)
    
    useEffect(()=>{
        if(!initialized){
            setInitialized(true)
            return
        }
        cb()
        }    ,values)
}