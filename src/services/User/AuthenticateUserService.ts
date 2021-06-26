import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../../repositories/UserRepositories"


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password} : IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)        
        //Check email
        const user = await usersRepositories.findOne({
            email
        })

        if (!user) {
            throw new Error("Email/Password incorrect")
        }
        //Check password
        const passwordMatched = await compare(password, user.password)
        if (!passwordMatched) {
            throw new Error("Email/Password incorrect")
        }

        //Token generate
        const token = await sign({
            email: user.email
        }, "170e46bf5e0cafab00cac3a650910837", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }