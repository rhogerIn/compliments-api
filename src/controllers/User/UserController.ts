import { Request, Response } from "express";
import { UserService } from "../../services/User/UserService";

class UserController {
    
    async createUser(request: Request, response: Response) {
        const { name, email, password, admin } = request.body
        const userService = new UserService()

        const user = await userService.createUser({
            name,
            email,
            password,
            admin
        })

        return response.json(user)
    }

    async listUsers(req: Request, res: Response) {
        const userService = new UserService()

        const users = await userService.listUsers()

        return res.json(users)
    }

    async updateUserCredentials(req: Request, res: Response) {
        const { user_id } = req.params
        const { new_email, new_password, old_password } = req.body
        const listUser = new UserService()
        
        const userUpdated = await listUser.updateUserCredentials({
            user_id,
            new_email,
            old_password,
            new_password        
        })

        return res.json(userUpdated)
    }
}

export { UserController }