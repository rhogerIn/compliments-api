import { Request, Response } from "express"
import { AuthenticateUserService } from "../../services/User/AuthenticateUserService"

class AuthenticateUserController {
    async handle(req: Request,  res: Response) {
        const authenticateUserService = new AuthenticateUserService()
        const { email, password } = req.body

        const token = await authenticateUserService.execute({
            email,
            password
        })

        return res.json(token)
    }
}

export { AuthenticateUserController }