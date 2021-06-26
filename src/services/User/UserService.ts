import { getCustomRepository } from "typeorm"
import { hash, compare,compareSync, hashSync } from "bcryptjs";
import { classToPlain } from "class-transformer"

import { UsersRepositories } from "../../repositories/UserRepositories"
import { User } from "../../entities/User";

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin: boolean;
}
class UserService {
    async createUser({ name, email, admin = false, password} : IUserRequest ) {
        const usersRepositories = getCustomRepository(UsersRepositories)
        const passwordHash = await hash(password, 8)
        
        if (!email) {
            throw new Error("Email incorrect")
        }

        const userExists = await usersRepositories.findOne({
            email
        })

        if (userExists) {
            throw new Error("User already exists")
        }

        const user = usersRepositories.create({
            name,
            email,
            password: passwordHash,
            admin
        })

        await usersRepositories.save(user)

        return user
    } 

    async listUsers() {
        const userRepositories = getCustomRepository(UsersRepositories)

        const usersList = await userRepositories.find();

        return classToPlain(usersList)
    }

    async updateUserCredentials({user_id, new_password, old_password, new_email}) {
        const userRepositories = getCustomRepository(UsersRepositories);

        const user = await userRepositories.findOne(user_id);
        if (!user) {
            throw new Error("User not found")
        }
        //Validate if user entered their old password correctly
        if (new_password && old_password) {
            if (old_password && compareSync(old_password, user.password)) {
                new_password = await hash(new_password, 8)
            } else {
                throw new Error("Wrong credentials")
            }
        }

        const newUserData: User = {
            ...user,
            email: new_email || user.email,
            password: new_password || user.password
        }
        
        await userRepositories.save({
            ...newUserData
        })
 
        return newUserData
    }
}

export { UserService }