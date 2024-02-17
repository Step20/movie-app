import { Arg, Mutation, Resolver } from 'type-graphql';
import { UserModel } from '../../../models/User';
import { LoginResponse } from './response';
import { LoginInput } from './input';
import generateJWT from '../../../utils/jwt/generateJWT';
import comparePasswords from '../../../utils/password/comparePasswords';



@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(@Arg('data') data: LoginInput):Promise<LoginResponse> {
    try{
        const {
            email,
            password
        } = data
        
        const user = await UserModel.findOne({email})
        if(!user){
            throw {
                field:"email",
                statement:"wrong email"
            }
        }
        const correctPassword = await comparePasswords({submittedPassword:password,user})
        if(!correctPassword){
            throw {
                field:"password",
                statement:"incorrect password"
            }
        }
        const jwt = generateJWT({payload:{user:{
            _id:user._id,
            name:user.name,
            email:user.email
        }}})
        return {success:true,user,jwt};
    }catch(err){
        return {success:false,formError:err}
    }
  }
}