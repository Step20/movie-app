import * as yup from "yup";

const validateLogin = async (formValues:{email:string,password:string})=>{
    try{

        const schema = yup.object().shape({
            email:yup.string().email(),
            password:yup.string().min(8)
        })
        const validation = await schema.validate(formValues)
        return {isError:false}
    }catch(err:  any){
        return {isError:true,errors:err.errors}
    }
    
}

export default validateLogin